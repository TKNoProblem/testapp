import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MailRoutingModule } from './mail-routing.module';
import { MailComponent } from './mail.component';


@NgModule({
  declarations: [
    MailComponent
  ],
  imports: [
    CommonModule,
    MailRoutingModule,
  ]
})
export class MailModule { }
