import { ILocalStorageHelper } from '../../common/interfaces/localstorage.helper.interface';
import { Contact } from '../../common/types/contact.type';
import { Arguments, State } from './argument.helper';

/**
 * @public
 * @class
 * @description
 * Class implementing the ILocalStorageHelper interface meant to handle and abstact the localStorage interactions
 */
class StorageHelper implements ILocalStorageHelper {
  private readonly localStorageKey = 'contacts';

  constructor() {}

  /**
   * @public
   * @description
   * Returns the number of contacts stored in local storage
   * @returns {number}
   */
  public getContactCount(): number {
    const storedContacts = this.getContacts();
    return storedContacts.length;
  }

  /**
   * @public
   * @param contact {Contact}
   * @description
   * Saves the contact to local storage
   * @returns {void}
   * @throws {ArgumentNullError}
   */
  public saveContact(contact: Contact): void {
    Arguments.isNotNull(contact, 'Contact is null');

    const storedContacts = this.getContacts();
    const newContacts = [...storedContacts, contact];

    localStorage.setItem(this.localStorageKey, JSON.stringify(newContacts));
  }

  /**
   * @public
   * @description
   * Returns all contacts stored in local storage
   * @returns {Array<Contact>}
   * @throws {InvalidArgumentError}
   */
  public getContacts(): Array<Contact> {
    const storedContactJson: string = localStorage.getItem(
      this.localStorageKey
    )!;
    const invalidStoredJson =
      storedContactJson === null || storedContactJson === undefined;

    if (invalidStoredJson) {
      return [];
    }
    const storedContacts: Array<Contact> = JSON.parse(storedContactJson);

    return storedContacts;
  }

  /**
   * @public
   * @description
   * Returns the contact with the given id
   * @param contact
   */
  public removeContact(name: string): void {
    Arguments.isEmptyOrWhiteSpace(name, 'Contact id is empty');

    const storedContacts = this.getContacts();
    const newContacts = storedContacts.filter(
      (contact) => {
        console.log(contact.firstName === name);
        return contact.firstName !== name
      }
    );

    localStorage.setItem(this.localStorageKey, JSON.stringify(newContacts));
  }

  /**
   * @public
   * @description
   * Clears the local storage
   * @returns {void}
   */
  public clear(): void {
    localStorage.clear();
  }
}

const InstanceHelper = new StorageHelper();

export default InstanceHelper as StorageHelper;
