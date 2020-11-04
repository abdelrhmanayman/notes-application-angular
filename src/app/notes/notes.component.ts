import { Component, OnInit } from '@angular/core';
import { NotesServiceService } from './notes-service.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {

  constructor(private notesService: NotesServiceService) { }

  toggleAddNoteModal(){
    this.notesService.toggleAddNoteModal.next()
  }

  
  searchForANote(event){
     this.notesService.getUserNotes({search: event.target.value})
  }

  ngOnInit() {
  }

}
