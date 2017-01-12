const githubSchema: any = `
enum IssueState{
    OPEN
    CLOSED
}
type Issue {
    id: ID
    author: String
    body: String
    createdAt: String
    number: Int
    state: IssueState
    title: String
}

type Repository {
    id: ID
    description: String
    isPrivate: Boolean
    issues(first: Int, after: String, last: Int, before: String,issueStates: [IssueState]!): [Issue]
    name: String
}
`

export const resolvers = {
    // non root github resolvers
}

export { githubSchema };