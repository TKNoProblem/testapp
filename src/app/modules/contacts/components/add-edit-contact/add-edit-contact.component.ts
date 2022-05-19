import { Component, OnInit, ChangeDetectionStrategy, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessagesService } from '../../../../core/services/messages.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Message } from '../../../../core/inerfaces/message';
import { ContactsService } from '../../../../core/services/contacts.service';

@Component({
  selector: 'app-add-edit-contact',
  templateUrl: './add-edit-contact.component.html',
  styleUrls: ['./add-edit-contact.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddEditContactComponent implements OnInit {
  form!: FormGroup;
  context: 'add' | 'edit' = 'add';

  constructor(private fb: FormBuilder,
              private contactsService: ContactsService,
              @Inject(MAT_DIALOG_DATA) public data?: Message) {
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', Validators.required],
    })
    if(this.data){
      this.context = 'edit'
      this.form.addControl('id', this.fb.control(''))
      this.form.patchValue(this.data)
    }
  }

  save(): void {
    this.form.markAllAsTouched();
    if(this.form.valid) {
      this.contactsService[`${this.context}Contact`](this.form.getRawValue())
    }
  }

}
