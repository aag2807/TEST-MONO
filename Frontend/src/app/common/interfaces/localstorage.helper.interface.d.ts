import { Contact } from "../types/contact.type";

/**
 * @interface
 * @description
 * Interface implemented by the LocalStorageHelper class
 */
export interface ILocalStorageHelper {
  saveContact(contact: Contact): void;
  getContacts(): Array<Contact>;
  removeContact(contactId: string): void;
  clear(): void;
  getContactCount(): number;
}
