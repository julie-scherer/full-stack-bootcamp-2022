const { GraphQLString } = require('graphql');
const { User } = require('../models');
const { createJwtToken } = require('../util/auth')


const register = {
    type: GraphQLString,
    description: "Register a new user",
    args: {
        username: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
    },
    async resolve(parent, args){
        const checkUser = await User.findOne({ email: args.email });
        if (checkUser){
            throw new Error("User with this email address already exists")
        };

        const { username, email, password } = args;

        const user = new User({ username, email, password });

        await user.save();

        const token = createJwtToken(user)

        return token
    }
}


const login = {
    type: GraphQLString,
    description: "Log a user in with email and password",
    args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString }
    },
    async resolve(parent, args){
        const user = await User.findOne({ email: args.email });
        if (!user || user.password !== args.password){
            throw new Error('Invalid Credentials');
        };

        const token = createJwtToken(user);
        return token
    }
}


module.exports = { register, login };
