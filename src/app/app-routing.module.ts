import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'contacts',
    loadChildren: () => import('./modules/contacts/contacts.module').then(m => m.ContactsModule)
  },
  {
    path: 'mail',
    loadChildren: () => import('./modules/mail/mail.module').then(m => m.MailModule)
  },
  {
    path: 'calendar',
    loadChildren: () => import('./modules/calendar/calendar.module').then(m => m.CalendarModule)
  },
  {
    path: 'messages',
    loadChildren: () => import('./modules/messages/messages.module').then(m => m.MessagesModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
