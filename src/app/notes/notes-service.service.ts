import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, tap, take, exhaustMap } from 'rxjs/operators';
import { notesAPIBaseURL } from "../utils/constants";
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { NzMessageService } from 'ng-zorro-antd';

@Injectable({
  providedIn: 'root'
})
export class NotesServiceService {

  constructor(private http: HttpClient, private msg: NzMessageService, private router: Router) { }

  getUserNotes({search}){
    const token = localStorage.getItem('token')
    const options: {headers: any, parmas?: any} = { headers:{ Authorization: `Bearer ${token}` } }

    if(search)
      options["params"] = { search }

    this.http.get(`${notesAPIBaseURL}/`, options).subscribe(({notes}: {notes: any})=>{
      this.fetchUserNotes.next(notes)
    })
  }

  createNote({ note }){
    const token = localStorage.getItem('token')

    this.http.post(`${notesAPIBaseURL}/create`, note, { headers:{ Authorization: `Bearer ${token}` } }).subscribe(({ note }: { note: any })=> {
      this.createNewNote.next(note)
    })
  }

  editNote({noteID, updates}){
    const token = localStorage.getItem('token')
    
    this.http.patch(`${notesAPIBaseURL}/update`, { noteID, updates }, { headers:{ Authorization: `Bearer ${token}` } }).subscribe(_=> {
      this.msg.success("Note updated successfully!")
      
      this.noteEdited.next({ noteID, updates })
    })
  }

  deleteNote({noteID}){
    const token = localStorage.getItem('token')

    this.http.delete(`${notesAPIBaseURL}/delete/${noteID}`, { headers:{ Authorization: `Bearer ${token}` } }).subscribe(_=>{
      this.msg.success("Note deleted successfully!")
        this.noteDeleted.next({noteID})        
    })
  }

  logout(){
    localStorage.removeItem('token')
    localStorage.removeItem('user')

    this.router.navigateByUrl('login')

  }

  toggleAddNoteModal = new Subject()
  toggleEditNoteModal = new Subject()
  fetchUserNotes = new Subject()
  createNewNote = new Subject()
  noteEdited = new Subject()
  noteDeleted = new Subject()

}
