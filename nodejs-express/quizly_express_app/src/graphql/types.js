// Import built-in graphql type
const { GraphQLObjectType, GraphQLID, GraphQLString } = require('graphql');

//  Create a GraphQL type for the User 
const UserType = new GraphQLObjectType(
    {
        name: 'User',
        description: 'User type',
        fields: () => ({
            id: { type: GraphQLID },
            username: { type: GraphQLString },
            email: { type: GraphQLString }
        })
    }
)

module.exports = {
    UserType
}
