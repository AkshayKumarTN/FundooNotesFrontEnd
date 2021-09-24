import { Component, OnInit } from '@angular/core';
import { NotesServiceService } from 'src/app/Services/NotesService/notes-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-trash-notes',
  templateUrl: './trash-notes.component.html',
  styleUrls: ['./trash-notes.component.scss']
})
export class TrashNotesComponent implements OnInit {
  
  token: any;
  trashNotes: any = [];

  constructor(
    private noteService: NotesServiceService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.GetAllNotes();
  }

  GetAllNotes() {
    this.noteService.GetAllTrashNotes(this.token, "data").subscribe((response: any) => {
      console.log(response);
      let notesArr = response.data;
      console.log(notesArr);
      this.trashNotes= notesArr;      
      console.log(this.trashNotes);
    })
  
  }

  DeleteNoteForever(note : any){
    let updateObject = {
      noteId: note.noteId
    };
    let result: any = '';
      this.noteService.DeleteNoteForever(this.token,updateObject).subscribe((response: any) => {
        console.log(response);
        if(response.success == true)
        {
          this.GetAllNotes();
          this.snackBar.open(`${response.message}`, '', {
            duration: 4000,
            verticalPosition: 'bottom',
            horizontalPosition: 'left'
          });

        }
        
      },(error: HttpErrorResponse) => {
        console.log(error.error.message);
        this.snackBar.open(`${error.error.message}`, '', {
          duration: 4000,
          verticalPosition: 'bottom',
          horizontalPosition: 'left'
        });
      })
    // window.location.reload();
  }

  RestoreNote(note : any){
    let updateObject = {
      noteId: note.noteId
    };
    let result: any = '';
      this.noteService.RestoreNote(this.token,updateObject).subscribe((response: any) => {
        console.log(response);
        if(response.success == true)
        {
          this.GetAllNotes();
          this.snackBar.open(`${response.message}`, '', {
            duration: 4000,
            verticalPosition: 'bottom',
            horizontalPosition: 'left'
          });

        }
        
      },(error: HttpErrorResponse) => {
        console.log(error.error.message);
        this.snackBar.open(`${error.error.message}`, '', {
          duration: 4000,
          verticalPosition: 'bottom',
          horizontalPosition: 'left'
        });
      })
    // window.location.reload();
  }

}
