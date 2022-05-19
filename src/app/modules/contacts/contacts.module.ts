import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactsRoutingModule } from './contacts-routing.module';
import { ContactsComponent } from './contacts.component';
import { SharedModule } from '../../shared/shared.module';
import { AddEditContactComponent } from './components/add-edit-contact/add-edit-contact.component';


@NgModule({
  declarations: [
    ContactsComponent,
    AddEditContactComponent
  ],
  imports: [
    SharedModule,
    CommonModule,
    ContactsRoutingModule
  ]
})
export class ContactsModule { }
