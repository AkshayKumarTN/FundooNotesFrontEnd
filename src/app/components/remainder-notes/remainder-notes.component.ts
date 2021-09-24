import { Component, OnInit } from '@angular/core';
import { NotesServiceService } from 'src/app/Services/NotesService/notes-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-remainder-notes',
  templateUrl: './remainder-notes.component.html',
  styleUrls: ['./remainder-notes.component.scss']
})
export class RemainderNotesComponent implements OnInit {

  token: any;
  remainderNotes: any = [];
  userColor: string = "white";
  colors: any[] = [
    {
      "color": "#fff",
      "toolTip": "default",
      "icon": true
    },
    {
      "color": "#F28B82",
      "toolTip": "Red",
      "icon": false
    },
    {
      "color": "#FBBC04",
      "toolTip": "Orange"
    },
    {
      "color": "#FFF475",
      "toolTip": "Yellow",
      "icon": false
    },
    {
      "color": "#CCFF90",
      "toolTip": "Green",
      "icon": false
    },
    {
      "color": "#A7FFEB",
      "toolTip": "Teal",
      "icon": false
    },
    {
      "color": "#CBF0F8",
      "toolTip": "Blue",
      "icon": false
    },
    {
      "color": "#AECBFA",
      "toolTip": "Dark Blue",
      "icon": false
    },
    {
      "color": "#D7AEFB",
      "toolTip": "Purple",
      "icon": false
    },
    {
      "color": "#FDCFE8",
      "toolTip": "Pink",
      "icon": false
    },
    {
      "color": "#E6C9A8",
      "toolTip": "Brown",
      "icon": false
    },
    {
      "color": "#E8EAED",
      "toolTip": "Gray",
      "icon": false
    }
  ];

  constructor(
    private noteService: NotesServiceService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.GetAllNotes();
  }

  GetAllNotes() {
    this.noteService.GetAllRemainderNotes(this.token, "data").subscribe((response: any) => {
      console.log(response);
      let notesArr = response.data;
      console.log(notesArr);
      this.remainderNotes= notesArr;      
      console.log(this.remainderNotes);
    })
  
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

  

  ToggleAarchive(note : any){
    let updateObject = {
      noteId: note.noteId
    };
    let result: any = '';
      this.noteService.UnAarchiveNote(this.token,updateObject).subscribe((response: any) => {
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

  ChangeColor(color: string, note : any) {
    this.userColor = color;
    let updateObject = {
      noteId: note.noteId,
      colorName: this.userColor
    };
    console.log(updateObject);
    let result: any = '';
      this.noteService.ChangeColor(this.token,updateObject.noteId,color).subscribe((response: any) => {
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

  DeleteNote(note : any){
    let updateObject = {
      noteId: note.noteId
    };
    let result: any = '';
      this.noteService.DeleteNote(this.token,updateObject).subscribe((response: any) => {
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
  RemoveReminder(note:any)
  {
    let updateObject = {
      noteId: note.noteId
    };
    let result: any = '';
      this.noteService.RemoveReminder(this.token,updateObject).subscribe((response: any) => {
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
