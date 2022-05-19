import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Contact } from '../../core/inerfaces/contact';
import { AddEditContactComponent } from '../contacts/components/add-edit-contact/add-edit-contact.component';
import { ContactsService } from '../../core/services/contacts.service';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactsComponent implements OnInit {
  contacts: Contact[] = [];
  loading = false;
  perPage = 5;
  pageIndex = 0;

  constructor(private contactsService: ContactsService, private cdr: ChangeDetectorRef, private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.getContacts();
  }

  getContacts(): void {
    this.loading = true;
    this.cdr.markForCheck();
    this.contactsService.getContacts()
      .subscribe(contacts => {
        this.loading = false;
        this.contacts = contacts;
        this.cdr.markForCheck();
      })
  }

  openAddContactModal(): void {
    const dialogRef = this.dialog.open(AddEditContactComponent);
    dialogRef.afterClosed().subscribe(result => {
      result && this.getContacts()
    })
  }

  openEditContactModal(contact: Contact): void {
    const dialogRef = this.dialog.open(AddEditContactComponent, {data: contact})
    dialogRef.afterClosed().subscribe(result => {
      result && this.getContacts()
    })
  }

  deleteContact(id: number): void {
    this.contactsService.deleteContact(id)
  }

  changePage(event: PageEvent){
    this.pageIndex = event.pageIndex;
  }

  trackByFn(_: number, contact: Contact): number {
    return contact.id!;
  }

}
