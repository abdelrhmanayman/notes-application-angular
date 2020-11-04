import { Component, OnInit } from '@angular/core';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { NotesServiceService } from '../notes-service.service';

interface ItemData {
  _id: string;
  title: string;
  image: string;
  text: string;
}

@Component({
  selector: 'app-notes-list',
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.css']
})
export class NotesListComponent implements OnInit {

  data: ItemData[] = [];

  constructor(private modalService: NzModalService, private noteService: NotesServiceService, private msg: NzMessageService){
    this.noteService.fetchUserNotes.subscribe((notes: ItemData[]) => {
      this.data = notes
    })

    this.noteService.createNewNote.subscribe((note: ItemData)=> {
      this.data = [...this.data, {text: note.text, image: note.image || null, title: note.title, _id: note._id}]
      this.msg.success("New note added sucessfully!")
    })

    this.noteService.noteEdited.subscribe(({ updates, noteID })=> {
        this.data = this.data.map((note):ItemData => {

          if(note._id === noteID)
          note = {...note, ...updates}

          return note
        })
    })

    this.noteService.noteDeleted.subscribe(({noteID}) => {
      this.data = this.data.filter((note)=> note._id !== noteID)
    })
   }

  ngOnInit(): void {
    this.noteService.getUserNotes({search: null})
  }

  editNote(item){
    this.noteService.toggleEditNoteModal.next(item)
  }

  showDeleteConfirm(item): void {
    this.modalService.confirm({
      nzTitle: 'Are you sure delete this note?',
      nzContent: '<b style="color: red;">Some descriptions</b>',
      nzOkText: 'Yes',
      nzOkType: 'danger',
      nzOnOk: () => { 
        this.noteService.deleteNote({noteID: item._id})
       },
      nzCancelText: 'No',
      nzOnCancel: () => console.log('Cancel')
    });
  }

}
