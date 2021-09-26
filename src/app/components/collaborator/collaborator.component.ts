import { Component,Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatList } from '@angular/material/list';
import { NotesServiceService } from 'src/app/Services/NotesService/notes-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';



@Component({
  selector: 'app-collaborator',
  templateUrl: './collaborator.component.html',
  styleUrls: ['./collaborator.component.scss']
})
export class CollaboratorComponent implements OnInit {

  searchField:any;

  FirstName = JSON.parse((localStorage.getItem('FundooNotes'))!).FirstName;
  LastName = JSON.parse((localStorage.getItem('FundooNotes'))!).LastName;
  Email = JSON.parse((localStorage.getItem('FundooNotes'))!).Email;
  token: any;
  result : any;
  noteCollaborator: any = [];

  constructor(    
    private noteService: NotesServiceService,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<CollaboratorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }
  emails: string[]=[];
  ngOnInit(): void {
    console.log("Recived Data");
    console.log(this.data.noteId);
    this.GetAllCollaborator();
    
  }

  GetAllCollaborator() {
    this.noteService.GetAllCollaborator(this.token,this.data.noteId).subscribe((response: any) => {
      console.log(response);
      this.noteCollaborator= response.data;   
      console.log(this.noteCollaborator);
    })
  
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  clearSearchField() {
  console.log(this.emails);
  this.emails.push(this.searchField);
  console.log(this.emails);
  this.searchField = '';
  }
  RemoveCollab(email:any)
  {
    this.emails.splice(this.emails.indexOf(email),1);
  }

  save(){
    for(var email of this.emails)
    {
      let updateObject = {
        NoteId: this.data.noteId,
        SenderEmail : this.Email,
        ReceiverEmail : email
      };
      
      this.noteService.AddCollaborator(this.token,updateObject).subscribe((response: any) => {
        console.log(response);
        if(response.Status == true)
        {
          this.result=response.Message;
        }
        
      },(error: HttpErrorResponse) => {
        console.log(error.error.Message);
        this.result=error.error.Message;
      })     
    }
    this.snackBar.open(`${this.result}`, '', {
      duration: 4000,
      verticalPosition: 'bottom',
      horizontalPosition: 'left'
    });

    this.dialogRef.close();
 }

 RemoveCollaborator(collaborator : any)
 {
  this.noteService.RemoveCollaborator(this.token,collaborator.collaboratorId).subscribe((response: any) => {
    console.log(response);
        if(response.Status == true)
        {
          this.GetAllCollaborator();
          this.snackBar.open(`${response.Message}`, '', {
            duration: 4000,
            verticalPosition: 'bottom',
            horizontalPosition: 'left'
          });

        }
        
      },(error: HttpErrorResponse) => {
        console.log(error.error.Message);
        this.snackBar.open(`${error.error.Message}`, '', {
          duration: 4000,
          verticalPosition: 'bottom',
          horizontalPosition: 'left'
        });
      })
  }

 close(){
   this.dialogRef.close();
 }

}