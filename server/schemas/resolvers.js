// import User model
const { User } = require('../models');
// import Authentication Error from apollow-server-express
const { AuthenticationError } = require('apollo-server-express');
// import middleward
const { signToken } = require('../utils/auth')

const resolvers = {
    // retrieve data from database
    Query: {
        // find logged in user by _id
        me: async (parent, args, context) => {
            if (context.user) {
                return User.findOne({ _id: context.user._id}).populate('savedBooks')
            }
            // no context.user, throw error
            throw new AuthenticationError('Please log in!')
        },
    },

    // update database
    Mutation: {
        addUser: async (parent, { username, email, password }) => {
            const user = await User.create({ username, email, password });
            const token = signToken(user);
            
            return { token, user };
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });
            if (!user) {
                throw new AuthenticationError('Invalid login credentials. Please try again');
            }
            const correctPassword = await user.isCorrectPassword(password);
            if (!correctPassword) {
                throw new AuthenticationError('Invalid login credentials. Please try again');
            }
            const token = signToken(user);
            return { token, user };
        },
        
        saveBook: async (parent, args, context) => {
            if (context.user) {
                const updatedBookList = await User.findOneAndUpdate(
                    {_id: context.user._id},
                    {$addToSet: {savedBooks: args}},
                    {
                        new: true,
                        runValidators: true,
                    }
                );
                return updatedBookList;
            }
            throw new AuthenticationError('You need to be logged in!');
        },

        removeBook: async (parent, { bookId }, context) => {
            if (context.user) {
                return await User.findOneAndUpdate(
                    { _id: context.user._id },
                    {
                        $pull: {
                            savedBooks: {
                                bookId
                            }
                        }
                    },
                    { new: true }
                );
            }
            throw new AuthenticationError('You need to be logged in!');
        },
    },
};

module.exports = resolvers;
