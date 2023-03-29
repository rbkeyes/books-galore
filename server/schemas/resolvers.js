// import User model
const { User } = require('../models');
// import Authentication Error from apollow-server-express
const { AuthenticationError } = require('apollo-server-express');
// import middleward
const { signToken } = require('../utils/auth')

const resolvers = {
    // retrieve data from database
    Query: {
        // find all users
        user: async () => {
            return User.find();
        },
        // find one user by _id
        user: async (parent, { userId }) => {
            return User.findOne({ _id: userId });
        },
        // find logged in user by _id
        me: async (parent, args, context) => {
            if (context.user) {
                return User.findOne({ _id: context.user._id})
            }
            // no context.user, throw error
            throw new AuthenticationError('Please log in!')
        }
    },

    // update database
    Mutation: {
        addUser: async (parent, { username, email, password }) => {
            const user = await User.create({ username, email, password });
            return { token, user };
        },
        login: async (parent, { email, password }) => {
            const user = User.findOne({ email });
            if (!user) {
                throw new AuthenticationError('Invalid login credentials. Please try again');
            }
            const correctPassword = await profile.isCorrectPassword(password);
            if (!correctPassword) {
                throw new AuthenticationError('Invalid login credentials. Please try again')
            }
            const token = signToken(profile);
            return { token, user }
        }
    }
}

module.exports = resolvers;
