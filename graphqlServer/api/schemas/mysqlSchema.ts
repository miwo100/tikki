const mysqlSchema: any = `
type Awt {
  id: Int
  collaborator: String
  issue: String
  description: String
  duration: Float
  workdate: Date
  start: Date
  end: Date
  paid: Boolean
  consolidated: Boolean
  created_at: Date
  updated_at: Date
}

input AwtInput {
  collaborator: String
  issue: ID
  description: String
  duration: Float
  workdate: Date
  start: Date
  end: Date
  paid: Boolean
  consolidated: Boolean
}
`

export const resolvers = {
  // non root mysql resolvers  
}

export { mysqlSchema };
