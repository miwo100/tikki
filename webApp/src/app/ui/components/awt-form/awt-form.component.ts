import { Component, EventEmitter, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import * as moment from "moment";

import { Awt } from "../../../store/models";

@Component({
  selector: 'app-awt-form',
  templateUrl: "./awt-form.component.html",
  styleUrls: [ "./awt-form.component.scss" ],
  outputs: ["addAwtRequested"]
})
export class AwtFormComponent implements OnInit {

  private addAwtRequested: EventEmitter<Awt>;
  formGroup: FormGroup;
  collaborator: AbstractControl;
  issue: AbstractControl;
  workdate: AbstractControl

  constructor(fb: FormBuilder) { 
    //default values for formControls
    this.formGroup = fb.group({
      collaborator: ["", Validators.required],
      issue: ["", Validators.compose([Validators.pattern("^#[1-9][0-9]*$"), Validators.required])], 
      description: ["First issue"],
      workdate: ["", Validators.compose([Validators.pattern("^[0-9]{2}.[0-9]{2}.[0-9]{4}$"), Validators.required])],
      duration: ["3.5"],
      start:["10:30"],
      end:["14:00"]
    })
    
    this.collaborator = this.formGroup.controls["collaborator"];
    this.issue = this.formGroup.controls["issue"];
    this.workdate = this.formGroup.controls["workdate"];
    this.addAwtRequested = new EventEmitter<Awt>();
  }

  ngOnInit() {
  }

  onSubmit(form: any){

    var currentAwt: Awt;
    currentAwt = Object.assign({}, form, {
      workdate: moment(form.workdate,"DD.MM.YYYY").toDate(),
      start: moment(form.start,"HH:mm").toDate(),
      end: moment(form.end,"HH:mm").toDate(),
      paid: 0,
      consolidated: 0
    });
    this.addAwtRequested.emit(currentAwt);
  }

  formValidationMessage(): string{
    if (this.formGroup.valid) return null;
    if (!this.collaborator.valid && this.collaborator.hasError("required")) {
      return "collaborator has to be specified";
    }
    if (!this.issue.valid && this.issue.hasError("required")) {
      return "issue has to be specified";
    }
    if (!this.issue.valid && this.issue.hasError("pattern")) {
      return "Issue has to have format # + Number";
    }
    if (!this.workdate.valid && this.workdate.hasError("required")) {
      return "workdate has to be specified";
    }
    if (!this.workdate.valid && this.workdate.hasError("pattern")) {
      return "Workdate has to have format DD.MM.YYYY";
    }    
  }

  // custom Validators
/*  issueValidator(control: FormControl):{[key: string]: boolean} {
    return !(<string>control.value).match(/^#[1-9][0-9]*$/) ? {invalidIssue: true} : null;
  }
  workdateValidator(control: FormControl):{[key: string]: boolean} {
    return !(<string>control.value).match(/[0-9]{2}.[0-9]{2}.[0-9]{4}/) ? {invalidWorkdate: true} : null;
  }*/


}
