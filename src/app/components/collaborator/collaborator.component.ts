import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-collaborator',
  templateUrl: './collaborator.component.html',
  styleUrls: ['./collaborator.component.scss']
})
export class CollaboratorComponent implements OnInit {

  AddCollaboratorForm!: FormGroup;
  UserFirstName = JSON.parse((localStorage.getItem('FundooNotes'))!).FirstName;
  UserLastName = JSON.parse((localStorage.getItem('FundooNotes'))!).LastName;
  UserEmail = JSON.parse((localStorage.getItem('FundooNotes'))!).Email;

  constructor(
    private dialogRef: MatDialogRef<CollaboratorComponent>
  ) { }

  ngOnInit(): void {
    this.AddCollaboratorForm = new FormGroup({
      email: new FormControl()
    });
  }

  close() {
    this.dialogRef.close();
  }


}
