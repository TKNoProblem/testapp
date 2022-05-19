import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MessagesService } from '../../core/services/messages.service';
import { MatDialog } from '@angular/material/dialog';
import { AddEditMessageComponent } from './components/add-edit-message/add-edit-message.component';
import { Message } from '../../core/inerfaces/message';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MessagesComponent implements OnInit {
  messages: Message[] = [];
  loading = false;
  perPage = 3;
  pageIndex = 0;

  constructor(private messagesService: MessagesService, private dialog: MatDialog, private cdr: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.getMessages()
  }

  getMessages(): void {
    this.loading = true;
    this.cdr.markForCheck();
    this.messagesService.getMessages()
      .subscribe(messages => {
        this.loading = false;
        this.messages = messages;
        this.cdr.markForCheck();
      })
  }

  openAddMessageModal(): void {
    const dialogRef = this.dialog.open(AddEditMessageComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(result)
      result && this.getMessages()
    })
  }

  openEditMessageModal(message: Message): void {
    const dialogRef = this.dialog.open(AddEditMessageComponent, {data: message})
    dialogRef.afterClosed().subscribe(result => {
      result && this.getMessages()
    })
  }

  deleteMessage(id: number): void {
    this.messagesService.deleteMessage(id)
  }

  changePage(event: PageEvent){
    this.pageIndex = event.pageIndex;
  }

  trackByFn(_: number, message: Message): number {
    return message.id!;
  }
}
