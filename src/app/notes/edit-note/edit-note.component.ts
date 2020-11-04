import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotesServiceService } from '../notes-service.service';

@Component({
  selector: 'app-edit-note',
  templateUrl: './edit-note.component.html',
  styleUrls: ['./edit-note.component.css']
})
export class EditNoteComponent implements OnInit {

  constructor(private noteService: NotesServiceService, private fb: FormBuilder) { }

  validateForm: FormGroup;
  isModalVisible = false
  currentNote = null
  
  handleCancel(){
    this.isModalVisible = false
  }

  handleOk(){
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    this.noteService.editNote({noteID: this.currentNote._id, updates: this.validateForm.value})

    this.isModalVisible = false
  }

  ngOnInit() {
    this.noteService.toggleEditNoteModal.subscribe((note: { title: string, text: string })=> {
      this.isModalVisible = !this.isModalVisible

      this.validateForm = this.fb.group({
        title: [note.title, [Validators.required]],
        text: [note.text, [Validators.required]]
      })

      this.currentNote = note
    })
    
    this.validateForm = this.fb.group({
      title: ['', [Validators.required]],
      text: ['', [Validators.required]]
    })
  }
  

}
