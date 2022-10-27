// Import Schema and Object Type from graphql
const { GraphQLSchema, GraphQLObjectType } = require('graphql');
const queries = require('./queries');
const mutations = require('./mutations');

// Create a QueryType that sets the fields to be all the queries
const QueryType = new GraphQLObjectType(
    {
        name: 'QueryType',
        description: 'Queries',
        fields: queries
    }
)

// Create a MutationType that sets the fields to be all the mutations
const MutationType = new GraphQLObjectType(
    {
        name: 'MutationType',
        description: 'Mutations',
        fields: mutations
    }
)

// Create a Schema with query being QueryTypes and mutation being MutationTypes
module.exports = new GraphQLSchema({
    query: QueryType,
    mutation: MutationType
})
