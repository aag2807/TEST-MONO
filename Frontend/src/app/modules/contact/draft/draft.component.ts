import { Component, OnInit } from '@angular/core';
import { Contact } from 'src/app/common/types/contact.type';
import InstanceHelper from 'src/app/utils/helpers/localStorage.helper';
import Swal from 'sweetalert2';

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

  public deleteFromStorage(name: string): void {
    Swal.fire({
      title: 'Are you sure want to delete?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
    }).then(({isConfirmed}) => {
      if(isConfirmed) {
          this.storageHelper.removeContact(name);
          this.contacts = this.storageHelper.getContacts();
      }
    })
  }
}
