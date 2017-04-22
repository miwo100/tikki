import * as config from 'config';

const ACCESS_TOKEN: string = config.get<string>('GITHUB_ACCESS_TOKEN');

import { default as ApolloClient, createNetworkInterface } from "apollo-client";
import { default as gql } from "graphql-tag";
// fetch is needed in the global node namespace to be able to execute graphql queries
var fetch = require('node-fetch');
(<any>global).fetch = fetch;

export enum IssueState{
    OPEN,
    CLOSED
}

export class GithubConnector {

    //private accessToken: string =  "Bearer 6f6eb7daebc748a7fd7152f5a86eb0ce693b3955";   
    private githubClient: ApolloClient;

    private allRepositoriesQuery: any = gql`
      query repositories($fieldEnum: RepositoryOrderField!, $directionEnum: OrderDirection!) {
        repositoryOwner(login: "miwo100") {
          repositories(first: 30, orderBy: {field: $fieldEnum, direction: $directionEnum}) {
            edges {
              node {
                ...allRepositoriesQueryRepositoryFragment
              }
            }
          }
        }
      }
      
      fragment allRepositoriesQueryRepositoryFragment on Repository {
        id
        description
        isPrivate
        name
      }
    `
    private repositoryByIdQuery: any = gql`
      query repositoryById($id: ID!){
        node(id: $id){
           ...repositoryFragment
        }
      }
      
      fragment repositoryFragment on Repository {
        id
        description
        isPrivate
        name
      }
    `
    private lastIssuesByRepositoryIdQuery: any = gql`
      query issuesByRepositoryIdForward($id: ID!, 
        $last: Int,
        $issueStates: [IssueState!]) 
      {
        node(id: $id) {
          ...issuesFragment
        }
      } 

      fragment issuesFragment on Repository {
        issues(last: $last, states: $issueStates){
          edges{
            node{
      				...issueFragment
            }
          }
        }
      }          
      
      fragment issueFragment on Issue {
              id
              body
      				state
              createdAt
              title
              number
      }
    `
    private issuesByRepositoryIdBackwardQuery: any = gql`
      query issuesByRepositoryIdBackward($id: ID!, 
        $last: Int,
        $issueStates: [IssueState!]) 
      {
        node(id: $id) {
          ...issuesBackwardFragment
        }
      }

      fragment issuesBackwardFragment on Repository {
        issues(last: $last, states: $issueStates){
          edges{
            node{
      				...issueFragment
            }
          }
        }
      } 
    `

    constructor(){

        let githubNetworkInterface  = createNetworkInterface({uri: "https://api.github.com/graphql"});
        let middleWare = {
            applyMiddleware(req, next) {
                if (!req.options.headers) {
                  req.options.headers = {};  
                }
                req.options.headers.authorization = ACCESS_TOKEN;               
                next();
            }
        }
        githubNetworkInterface.use([middleWare])
        
        this.githubClient = new ApolloClient({
            networkInterface: githubNetworkInterface
        });
    }

    public getAllRepositories(): Promise<any> {
        enum fieldEnum{
          NAME
        }
        enum  orderDirection{
          ASC,
          DESC
        }
        return new Promise<any>(
          (resolve, reject) => {
            this.githubClient.query({
                  query: this.allRepositoriesQuery,
                  variables:{
                    fieldEnum: "NAME",
                    directionEnum: "ASC" 
                  }
              }).then(
              ({loading, data}) => {
              if(!loading){
                let repos: any = (<any>data).repositoryOwner.repositories.edges.map((val) => val.node);
                console.log((<any>data).repositoryOwner.repositories.edges.map((val) => val.node.name)); 
                resolve(repos);
              }
            },(reason) => {
              console.log("hello from rejected"+  reason);               
              reject(reason);
            });
          }
        )
    }

    public getById(id: String): Promise<any> {
    
      return new Promise<any>(
        (resolve, reject) => {
          this.githubClient.query({
                query: this.repositoryByIdQuery,
                variables:{
                  id: id
                }
            }).then(
            ({loading, data}) => {
            if(!loading){
              //let repos: any = data.repositoryOwner.repositories.edges.map((val) => val.node);
              console.log(data); 
              resolve( (<any>data).node );
            }
          },(reason) => {
            console.log("hello from rejected"+  reason);               
            reject(reason);
          });
        }
      )
    }

    public getLastIssuesByRepositoryId(repositoryId: String, 
      count: Number, states: IssueState[]): Promise<[any]>{

      return new Promise(
        (resolve, reject) => {
          this.githubClient.query({
                  query: this.lastIssuesByRepositoryIdQuery,
                  variables:{
                    id: repositoryId,
                    last: count,
                    issueStates: states//states.map(val => IssueState[val])
                  }
              }).then(
              ({loading, data}) => {
              if(!loading){
                let issues: any = (<any>data).node.issues.edges.map((val) => val.node);
                resolve(issues);
              }
            },(reason) => {
              console.log("hello from rejected"+  reason);               
              reject(reason);
            });
          }
      );
    }
}
