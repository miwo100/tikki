import  { Awt }  from './awt';
import  { GithubRepository }  from './githubRepository';
import  { GithubIssue }  from './githubIssue';

export const models = {
  awt: new Awt(),
  githubRepository: new GithubRepository(),
  githubIssue: new GithubIssue()
  // add other models here
};