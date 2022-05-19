import { Injectable } from '@angular/core';
import { BehaviorSubject, delay } from 'rxjs';
import { Contact } from '../inerfaces/contact';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {
  private readonly contacts$!: BehaviorSubject<Contact[]>;

  constructor() {
    const stringContacts = localStorage.getItem('contacts');
    let contacts = []
    if (stringContacts) {
      contacts = JSON.parse(stringContacts)
    }
    this.contacts$ = new BehaviorSubject<Contact[]>(contacts);
  }

  addContact(contact: Contact): void {
    contact.id = new Date().getTime();
    const contacts = [...this.contacts$.getValue(), contact];
    this.contacts$.next([...contacts]);
    this.updateStorage(contacts);
  }

  editContact(contact: Contact): void {
    const contacts = this.contacts$.getValue()
    Object.assign(contacts.find(({id})=>contact.id === id), contact)
    this.contacts$.next(contacts);
    this.updateStorage(contacts);
  }

  deleteContact(deleteId: number): void {
    const contacts = this.contacts$.getValue().filter(({id}) => id !== deleteId);
    this.contacts$.next(contacts);
    this.updateStorage(contacts);
  }

  getContacts() {
    return this.contacts$.pipe(delay(500));
  }

  updateStorage(contacts: Contact[]): void {
    localStorage.setItem('contacts', JSON.stringify(contacts))
  }
}
