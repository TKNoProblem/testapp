import { NgModule } from '@angular/core';

import { MessagesRoutingModule } from './messages-routing.module';
import { MessagesComponent } from './messages.component';
import { SharedModule } from '../../shared/shared.module';
import { AddEditMessageComponent } from './components/add-edit-message/add-edit-message.component';


@NgModule({
  declarations: [
    MessagesComponent,
    AddEditMessageComponent
  ],
  imports: [
    SharedModule,
    MessagesRoutingModule
  ]
})
export class MessagesModule {
}
