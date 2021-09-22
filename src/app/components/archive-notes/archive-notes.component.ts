import { Component, OnInit } from '@angular/core';
import { NotesServiceService } from 'src/app/Services/NotesService/notes-service.service';

@Component({
  selector: 'app-archive-notes',
  templateUrl: './archive-notes.component.html',
  styleUrls: ['./archive-notes.component.scss']
})
export class ArchiveNotesComponent implements OnInit {
  token: any;
  archiveNotes: any = [];

  constructor(
    private noteService: NotesServiceService
  ) { }

  ngOnInit(): void {
    this.GetAllNotes();

  }

  GetAllNotes() {
    this.noteService.GetAllArchiveNotes(this.token, "data").subscribe((response: any) => {
      console.log(response);
      let notesArr = response.data;
      console.log(notesArr);
      this.archiveNotes= notesArr;      
      console.log(this.archiveNotes);
    })
  
  }

}
