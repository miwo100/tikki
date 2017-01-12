import { Component, Input, OnInit } from '@angular/core';
import { Awt } from "../../../store/models";

@Component({
  inputs:[],
  selector: 'app-awt-list',
  templateUrl: "./awt-list.component.html",
  styleUrls: [ "./awt-list.component.scss" ]
})
export class AwtListComponent implements OnInit {
  
  //private _awts: Awt[];
  awtlist: Awt[];

  // get awts(): Awt[] {
  //   return this._awts;
  // }

  @Input("awtlist")
  set awts(awts: Awt[]) {
    if(!!awts){
      this.awtlist = awts.sort((awt1: Awt, awt2: Awt) => {
        return  awt2.id - awt1.id;
        }
      );
    }
  }

  
  constructor() { }

  ngOnInit() {
    
  }

}
