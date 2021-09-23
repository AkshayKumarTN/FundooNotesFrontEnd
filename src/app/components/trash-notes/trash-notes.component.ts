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

}
