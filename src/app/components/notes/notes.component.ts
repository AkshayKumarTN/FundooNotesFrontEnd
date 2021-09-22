import { Component, OnInit } from '@angular/core';
import { NotesServiceService } from 'src/app/Services/NotesService/notes-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {

  token: any;
  pinnedNotes: any = [];
  unPinnedNotes: any = [];

  constructor(
    private noteService: NotesServiceService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.GetAllNotes();

  }

  GetAllNotes() {
    this.noteService.GetAllUnPinNotes(this.token, "data").subscribe((response: any) => {
      console.log(response);
      let notesArr = response.data;
        //notesArr.reverse();
        console.log(notesArr);
        this.unPinnedNotes= notesArr;
        // this.notesArray=notesArr.filter((noteData:any)=>{
        //   return noteData.trash != true && noteData.archieve != true;
        //  });
        //   this.notesArray=notesArr.filter((noteData:any)=>{
        //   return noteData.isArchived === false ;
        // }); 
             
      
    console.log(this.unPinnedNotes);
    
    })
    this.noteService.GetAllPinNotes(this.token, "data").subscribe((response: any) => {
      console.log(response);
      let notesArr = response.data;
      //notesArr.reverse();
      console.log(notesArr);
      this.pinnedNotes= notesArr;
      // this.notesArray=notesArr.filter((noteData:any)=>{
      //   return noteData.trash != true && noteData.archieve != true;
      //  });
      //   this.notesArray=notesArr.filter((noteData:any)=>{
      //   return noteData.isArchived === false ;
      // }); 
      
    console.log(this.pinnedNotes);
    
    })
  
  }
  UnPinIt(note : any) {
    note.pin = !note.pin;
    let updateObject = {
      noteId: note.noteId,
      pin: note.isPined
    };
    let result: any = '';
      this.noteService.UnPinNote(this.token,updateObject).subscribe((response: any) => {
        console.log(response);
        if(response.success == true)
        {
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
    
    window.location.reload();
    
  }


  PinIt(note : any) {
    note.pin = !note.pin;
    let updateObject = {
      noteId: note.noteId,
      pin: note.isPined
    };
    let result: any = '';
      this.noteService.PinNote(this.token,updateObject).subscribe((response: any) => {
        console.log(response);
        if(response.success == true)
        {
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
      window.location.reload();
    
  }

  ToggleAarchive(note : any){
    let updateObject = {
      noteId: note.noteId
    };
    let result: any = '';
      this.noteService.AarchiveNote(this.token,updateObject).subscribe((response: any) => {
        console.log(response);
        if(response.success == true)
        {
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
    window.location.reload();
  }

}
