import { Component, OnInit } from '@angular/core';
import { NotesServiceService } from 'src/app/Services/NotesService/notes-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CollaboratorComponent } from '../collaborator/collaborator.component';
import { EditNoteComponent } from '../edit-note/edit-note.component';

@Component({
  selector: 'app-label',
  templateUrl: './label.component.html',
  styleUrls: ['./label.component.scss']
})
export class LabelComponent implements OnInit {

  
  UserLableName = JSON.parse(localStorage.getItem('GetLable')!);
  token: any;
  labelNotes: any = [];
  labelName = "";
  image:any;
  file:any;
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
      "Time": "Mon 8:00 AM"
    }
  ];


  constructor(
    private noteService: NotesServiceService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.GetAllNotes();
  }

  GetAllNotes() {
    this.noteService.GetAllLabelNotes(this.token, this.UserLableName).subscribe((response: any) => {
      console.log(response);
      console.log("RetriveNotesByLabelId");
      this.labelNotes= response.data;   
      console.log(this.labelNotes);
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

  AddReminder(note : any, remider : any) {
    let result: any = '';
    let noteReminder = remider.Text +", "+remider.Time;
    console.log(remider);
      this.noteService.AddReminder(this.token,note.noteId,noteReminder).subscribe((response: any) => {
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
  
  openDialog(note : any) {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = note;

    this.dialog.open(CollaboratorComponent, dialogConfig);
  }

  /// Add Image 
  onFileChanged(event: any,note:any)
  {
    this.noteService.AddImage(note.noteId,event.target.files[0]).subscribe((response: any) => 
    {
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
  }
  

    EditUserNote( note: any)
    {
      const dialogRef = this.dialog.open(EditNoteComponent, {
        //  width : "500px",
        //  height : "500px",
        data : note

        
      });
      //  dialogRef.afterclosed().s
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
    }

}
