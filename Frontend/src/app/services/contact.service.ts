import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Contact } from '../common/types/contact.type';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private _baseUrl = environment.api;

  constructor(private httpclient: HttpClient) {}

  public createContact(contact: Contact): Observable<any> {
    return this.httpclient.post(`${this._baseUrl}/add`, contact);
  }

  public deleteContact(id: string): Observable<any> {
    return this.httpclient.delete(`${this._baseUrl}/contacts/delete-by-id?id=${id}`);
  }

  public getAllContacts(): Observable<Array<Contact>> {
    return this.httpclient.get<Array<Contact>>(`${this._baseUrl}/all`);
  }
}
