// import User model
const { User } = require('../models');
// import Authentication Error from apollow-server-express
const { AuthenticationError } = require('apollo-server-express');
// import middleward
const { signToken } = require('../utils/auth');



const resolvers = {
    Query: {

    },

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
