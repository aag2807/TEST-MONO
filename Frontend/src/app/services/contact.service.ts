import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Contact } from '../common/types/contact.type';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class ContactService {
  constructor(private httpclient: HttpClient) {}

  public createContact(contact: Contact): Observable<any> {
    return this.httpclient.post('/api/contacts', contact);
  }

  public getAllContacts(): Observable<Array<Contact>> {
    return this.httpclient.get<Array<Contact>>('/api/contacts');
  }
}
