import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Message } from '../../../../core/inerfaces/message';
import { MessagesService } from '../../../../core/services/messages.service';
import { Contact } from '../../../../core/inerfaces/contact';
import { ContactsService } from '../../../../core/services/contacts.service';

@Component({
  selector: 'app-add-edit-message',
  templateUrl: './add-edit-message.component.html',
  styleUrls: ['./add-edit-message.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddEditMessageComponent implements OnInit {
  form!: FormGroup;
  context: 'add' | 'edit' = 'add';
  contacts: Contact[] = [];

  constructor(private fb: FormBuilder,
              private messagesService: MessagesService,
              private contactsService: ContactsService,
              private cdr: ChangeDetectorRef,
              @Inject(MAT_DIALOG_DATA) public data?: Message) {
  }

  ngOnInit(): void {
    this.contactsService.getContacts().subscribe(contacts => {
      this.contacts = contacts
      this.cdr.markForCheck();
    })
    this.form = this.fb.group({
      message: ['', Validators.required],
      to: ['', Validators.required],
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
      this.messagesService[`${this.context}Message`](this.form.getRawValue())
    }
  }
}
