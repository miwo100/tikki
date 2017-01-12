import { Inject, Component } from '@angular/core';
import { Store } from "redux";
import gql from "graphql-tag";
import { Angular2Apollo } from "angular2-apollo";

import { Awt } from "../../../store/models";
import { AppStore } from "../../../store";
import { AppState } from "../../../store/reducers";
import { AwtActions } from "../../../store/actions";
import { getAllAwtsSelector } from "../../../store/reducers";

@Component({
  selector: 'app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ] 
})
export class AppComponent {
  awts: Awt[];
  allAwtsQuery: any = gql`
                  query{
                    awt {
                        id
                        collaborator
                        issue
                        description
                        duration
                        workdate
                        start
                        end
                        paid
                        consolidated
                        created_at
                        updated_at
                    }
                  }
                  `;
  addAwtMutation: any = gql`
                  mutation addAwt($awtInput: AwtInput) {
                    addAwt(awt: $awtInput) {
                      id
                      collaborator
                      issue
                      description
                      duration
                      workdate
                      start
                      end
                      paid
                      consolidated
                      created_at
                      updated_at
                    }
                  }
                  `;

  constructor(@Inject(AppStore) private store: Store<AppState>,
                                private apollo: Angular2Apollo) {
    store.subscribe(() => this.updateState());
    this.getAllAwts();
    //this.updateState();    
  }

  updateState() {
   this.awts = getAllAwtsSelector(this.store.getState());
  }

  getAllAwts(): void{
    //load by graphql
    this.apollo.query({query: this.allAwtsQuery}).subscribe(
      ({loading, data}) => {
          if(!loading){
            console.log(data);
            this.store.dispatch(AwtActions.loadAwts(data.awt));
          }
        }
        ,         (err) => {
          //take error action, e.g. display to info to user
        }
    );
  }

  addAwt(awt: Awt): void{
    this.apollo.mutate({
      mutation: this.addAwtMutation,
      variables:{
        awtInput: awt
      }
    })
    .subscribe((
      {loading, data}) => {
      console.log(data);
      if(!loading){
        this.store.dispatch(AwtActions.addAwt(data.addAwt));
      }
      },
      (err) => { /*take error action, e.g. display to info to user */ }
    );
  }
}
