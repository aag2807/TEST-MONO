import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Contact } from 'src/app/common/types/contact.type';
import { ContactService } from 'src/app/services/contact.service';
import { uuid } from 'src/app/utils/functions/uuid';
import InstanceHelper from 'src/app/utils/helpers/localStorage.helper';
import { cellphoneRegex } from 'src/app/utils/regex/cellphone.regex';
import { emailRegex } from 'src/app/utils/regex/email.regex';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
})
export class AddComponent implements OnInit, OnDestroy {
  public contactForm!: FormGroup;
  public storageHelper = InstanceHelper;

  constructor(private contactService: ContactService) {
    this.contactForm = this._setFormGroup();
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this._handleLeaveWithTouchedForm();
  }

  public get phoneNumbers(): FormArray {
    return this.contactForm.get('phone') as FormArray;
  }

  public get firstname() {
    return this.contactForm.get('firstName');
  }

  public get firstnameErrors() {
    return this.contactForm.get('firstName')?.errors;
  }

  public get lastname() {
    return this.contactForm.get('lastName');
  }

  public get lastnameErrors() {
    return this.contactForm.get('lastName')?.errors;
  }

  public get email() {
    return this.contactForm.get('email');
  }

  public get emailErrors() {
    return this.contactForm.get('email')?.errors;
  }

  public get phoneControls() {
    return this.phoneNumbers.controls;
  }

  public handleSubmit(): void {
    const contact = { id: uuid(), ...this.contactForm.value };
    Swal.fire({
      text:'Seguro que desea agregar este contacto?',
      icon: 'question',
      showCancelButton: true,
    }).then(({ isConfirmed }) => {
      if(isConfirmed) {
        this._handleCreateContact(contact);
      }
    })
  }

  public addNewPhoneNumberInput(): void {
    this.phoneNumbers.push(
      new FormControl('', [
        Validators.required,
        Validators.pattern(cellphoneRegex),
      ])
    );
  }

  private _handleLeaveWithTouchedForm():void {
    if(!this.contactForm.dirty) return;

    Swal.fire({
      text:'Desea Guardar el contacto en Borrador?',
      icon: 'question',
      showCancelButton: true,
    }).then(({isConfirmed}) => {
      if(isConfirmed) {
        this._storeContactInStorage();
      }
    })
  }

  private _storeContactInStorage(){
    const contact = { id: uuid(), ...this.contactForm.value };
    this.storageHelper.saveContact(contact);
  }


  private _handleCreateContact(contact: Contact) {
    this.contactService.createContact(contact).subscribe(console.log);
    this.contactForm.reset();
  }

  private _setFormGroup(): FormGroup {
    return new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(emailRegex),
      ]),
      phone: new FormArray(
        [
          new FormControl('', [
            Validators.required,
            Validators.pattern(cellphoneRegex),
          ]),
        ],
        [Validators.required]
      ),
    });
  }
}
