import { GithubConnector } from "../connectors/github/githubConnector";

export class GithubRepository{

    public getAll(context): Promise<any>{
        return (<GithubConnector>context.connectors.github).getAllRepositories();
    }
    public getRepository(context, args: any): Promise<any>{
        if (args.id)
        {
            return (<GithubConnector>context.connectors.github).getById(args.id);
        }
    }

}