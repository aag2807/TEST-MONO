import { Component, OnInit } from '@angular/core';
import { Contact } from 'src/app/common/types/contact.type';
import { ContactService } from 'src/app/services/contact.service';
import Swal from 'sweetalert2';

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

  public handleDelete(id: string): void {
    Swal.fire({
      title: 'Are you sure want to delete?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
    }).then(({isConfirmed}) => {
      if(isConfirmed) {
        this._contactService.deleteContact(id).subscribe(data => {
          this._bootstrap();
        })
      }
    })

  }

  private  _bootstrap(): void {
    this._contactService.getAllContacts().subscribe(data => {
      this.contacts = data;
    })
  }

}
