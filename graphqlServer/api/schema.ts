import { merge } from 'lodash';

// import schemas
import { mysqlSchema, resolvers as mysqlResolvers } from './schemas/mysqlSchema';
import { githubSchema, resolvers as githubResolvers } from './schemas/githubSchema';
import { baseSchema, resolvers as baseResolvers } from './schemas/baseSchema';

// helper tools to create graphql classes
import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools';

//************** Schema defintions *****************************************

const rootQuery: String = `
type RootQuery {
  awt: [Awt]
  allRepositories: [Repository]
  repository(id: ID!): Repository
  lastIssuesFromRepository(
          id: ID!, count: Int, issueStates: [IssueState]!): [Issue]
}
`
const mutation: String = `
type Mutation {
  addAwt(awt: AwtInput): Awt
}
`
const schemaDefintion: String = `
schema {
  query: RootQuery
  mutation: Mutation
}
`
const typeDefs = [schemaDefintion, rootQuery, mutation, 
baseSchema, githubSchema, mysqlSchema ];

//************** Resolver defintions *****************************************

const rootResolvers: any = {
    RootQuery: {
        awt(obj, args, context) {
            return context.models.awt.getAll(context);
        },
        allRepositories(obj, args, context) {
            return context.models.githubRepository.getAll(context);
        },
        repository(obj, args, context) {
            return context.models.githubRepository.getRepository(context, args);
        },
        lastIssuesFromRepository(obj, args, context) {
            return context.models.githubIssue.getLastIssuesFromRepository(context, args);
        }
    }
}

const rootMutations: any = { 
    Mutation: {
        addAwt(obj, args, context){
            return context.models.awt.add(args.awt, context);
        }
    }
}


const resolvers: any = merge(rootResolvers, rootMutations,
                        mysqlResolvers, githubResolvers, baseResolvers );

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

