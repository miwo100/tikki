import { GithubConnector, IssueState } from "../connectors/github/githubConnector";

export class GithubIssue{

    public getLastIssuesFromRepository(context: any, args: any): Promise<any>{
        if (args.id)
        {
            return (<GithubConnector>context.connectors.github).getLastIssuesByRepositoryId(
                args.id, 
                args.count, 
                args.issueStates
            );
        }
    }
}