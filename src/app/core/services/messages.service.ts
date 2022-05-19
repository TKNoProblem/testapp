import { Injectable } from '@angular/core';
import { BehaviorSubject, delay, Observable } from 'rxjs';
import { Message } from '../inerfaces/message';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  private readonly messages$!: BehaviorSubject<Message[]>;

  constructor() {
    const stringMessages = localStorage.getItem('messages');
    let messages = []
    if (stringMessages) {
      messages = JSON.parse(stringMessages)
    }
    this.messages$ = new BehaviorSubject<Message[]>(messages);
  }

  addMessage(message: Message): void {
    message.date = new Date();
    message.id = message.date.getTime();
    const messages = [...this.messages$.getValue(), message];
    this.messages$.next([...messages]);
    this.updateStorage(messages);
  }

  editMessage(message: Message): void {
    message.date = new Date();
    const messages = this.messages$.getValue()
    Object.assign(messages.find(({id})=>message.id === id), message)
    this.messages$.next(messages);
    this.updateStorage(messages);
  }

  deleteMessage(deleteId: number): void {
    const messages = this.messages$.getValue().filter(({id}) => id !== deleteId);
    this.messages$.next(messages);
    this.updateStorage(messages);
  }

  getMessages() {
    return this.messages$.pipe(delay(500));
  }

  updateStorage(messages: Message[]): void {
    localStorage.setItem('messages', JSON.stringify(messages))
  }
}
