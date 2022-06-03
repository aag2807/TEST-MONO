import { Component, OnInit } from '@angular/core';
import { Contact } from 'src/app/common/types/contact.type';
import InstanceHelper from 'src/app/utils/helpers/localStorage.helper';

@Component({
  selector: 'app-draft',
  templateUrl: './draft.component.html',
  styleUrls: ['./draft.component.scss']
})
export class DraftComponent implements OnInit {
  public storageHelper = InstanceHelper;
  public contacts: Array<Contact> = [];

  constructor() { }

  ngOnInit(): void {
    this.contacts = this.storageHelper.getContacts();
  }

  public get contactsLength(){
    return this.contacts.length;
  }
}
