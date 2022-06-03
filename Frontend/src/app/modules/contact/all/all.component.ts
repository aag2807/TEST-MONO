import { Component, OnInit } from '@angular/core';
import { Contact } from 'src/app/common/types/contact.type';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-all',
  templateUrl: './all.component.html',
  styleUrls: ['./all.component.scss']
})
export class AllComponent implements OnInit {
  public contacts: Array<Contact> = [];

  constructor(private _contactService: ContactService) { }

  ngOnInit(): void {
    this._bootstrap();
  }

  public get contactsLength(){
    return this.contacts.length;
  }

  private  _bootstrap(): void {
    this._contactService.getAllContacts().subscribe(data => {
      this.contacts = data;
    })
  }
}
