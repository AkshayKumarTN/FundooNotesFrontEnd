import { Component,Inject,inject, OnInit } from '@angular/core';
import { NotesServiceService } from 'src/app/Services/NotesService/notes-service.service';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ArchiveNotesComponent } from '../../archive-notes/archive-notes.component';
import { NotesComponent } from '../notes/notes.component';
import { RemainderNotesComponent } from '../remainder-notes/remainder-notes.component';

@Component({
  selector: 'app-edit-note',
  templateUrl: './edit-note.component.html',
  styleUrls: ['./edit-note.component.scss']
})
export class EditNoteComponent implements OnInit {
  note;

  constructor( 
    private noteService: NotesServiceService,
     private activeRoute: ActivatedRoute,
     private snackBar: MatSnackBar,
    public dialogRef : MatDialogRef<EditNoteComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any )
  {
    this.note = data;

   }

  ngOnInit(): void {
  }
  fullEdit: boolean = false;
  pin: boolean = false;
  archive: boolean = false;
  title='';
  labelName = "";
  description='';
  isOpen = true;
  userColor: string = "white";
  noteReminder : string ="";
  token: any;
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
  reminders: any[] = [
    {
      "Text": "Later Today",
      "Time": "8:00 PM"
    },
    {
      "Text": "Tommorow",
      "Time": "8:00 AM"
    },
    {
      "Text": "Next Week",
      "Time": "8:00 AM"
    }
  ];


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
          this.note.pin=updateObject.pin;
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
          this.note.pin=updateObject.pin;
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

  AddReminder(note : any, remider : any) {
    let result: any = '';
    let noteReminder = remider.Text +", "+remider.Time;
    console.log(remider);
      this.noteService.AddReminder(this.token,note.noteId,noteReminder).subscribe((response: any) => {
        console.log(response);
        if(response.success == true)
        {
          this.note.reminder=noteReminder;
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
          this.note.color=color;
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

  UpdateNote(note:any){

    let result: any = '';
      this.noteService.UpdateNote(this.token,note).subscribe((response: any) => {
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

    this.dialogRef.close();
    
  }

  addLabelToNote(data:any){
    console.log("Note");
  console.log(data);
    let params = {

      NoteId: data.noteId,
      UserId : data.userId,
      LabelName : this.labelName
    };      
    this.noteService.AddLabelToNote(this.token,params).subscribe((response:any)=>{
      console.log(response);
    if(response.status == true)
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
  }


}
