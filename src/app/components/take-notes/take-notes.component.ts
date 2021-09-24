import { Component, OnInit } from '@angular/core';
import { NotesServiceService } from 'src/app/Services/NotesService/notes-service.service';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';
import { flatten } from '@angular/compiler';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CollaboratorComponent } from '../collaborator/collaborator.component';

@Component({
  selector: 'app-take-notes',
  templateUrl: './take-notes.component.html',
  styleUrls: ['./take-notes.component.scss']
})
export class TakeNotesComponent implements OnInit {

  fullEdit: boolean = false;
  pin: boolean = false;
  archive: boolean = false;
  title='';
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


  click() {
    this.isOpen = true;
   }

  constructor(
    private note: NotesServiceService,
     private activeRoute: ActivatedRoute,
     private snackBar: MatSnackBar,
     public dialog: MatDialog
     ) { }

  ngOnInit(): void {
  }

  addNote(){
    let data = {
      Title: this.title,
      Description: this.description,
      pin : this.pin,
      archive : this.archive,
      color : this.userColor,
      reminder : this.noteReminder
    }
    console.log(data)
    console.log(" add note data ", data);
    if (this.title && this.description)
    {
      this.note.createNote(this.token, data).subscribe((response:any) => {
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
      });
      this.title = "";
      this.description = "";
      this.userColor = "white";
      this.fullEdit = false;
      window.location.reload();
    } else {
      this.userColor = "white";
        this.fullEdit = false;
      }
  }



  togglePin() {
    this.pin = !this.pin;
  }

  displayFull() {
    this.fullEdit = true;
  }

  toggleAarchive(){
    this.archive = !this.archive;
  }

  ChangeColor(color: any) {
    this.userColor = color;
    for (var val of this.colors)
      val.icon = val.color == color ? true : false;
  }
  AddReminder(remider : any) {
    this.noteReminder = remider.Text +", "+remider.Time;
    
  }

  openDialog() {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    this.dialog.open(CollaboratorComponent, dialogConfig);
  }


}

