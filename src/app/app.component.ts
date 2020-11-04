import { Component } from '@angular/core';
import { NotesServiceService } from './notes/notes-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isCollapsed = false;

  constructor(private noteService: NotesServiceService){}

  logout(){
  this.noteService.logout()
  }

  logoutShouldAppear(){
    const token = localStorage.getItem('token') ? true : false
    return token ? true : false
  }
}
