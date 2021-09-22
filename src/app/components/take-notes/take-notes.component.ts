import { Component, OnInit } from '@angular/core';
import { NotesServiceService } from 'src/app/Services/NotesService/notes-service.service';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';
import { flatten } from '@angular/compiler';

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
  token: any;

  click() {
    this.isOpen = true;
   }

  constructor(
    private note: NotesServiceService,
     private activeRoute: ActivatedRoute,
     private snackBar: MatSnackBar
     ) { }

  ngOnInit(): void {
  }

  addNote(){
    let data = {
      Title: this.title,
      Description: this.description,
      pin : this.pin,
      archive : this.archive
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
      this.fullEdit = false;
    } else {
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

}
