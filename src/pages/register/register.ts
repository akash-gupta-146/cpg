import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';

// const enum AddressType{
//   Home = 'Home', Office = 'Office', Permanent = 'Permanent'
// };


@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  
  registerForm: FormGroup;
  submitAttempt = false;
  readonly addressTypes: Array<any> = ['Home', 'Office', 'Permanent'];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private fb: FormBuilder,
    private viewCtrl: ViewController) {

    this.makeForm();
  }


  makeForm() {
    this.registerForm = this.fb.group({
      name: ['', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z ]*')])],
      contact: ['', Validators.compose([Validators.required, Validators.pattern('^[0-9]+$')])],
      email: ['', Validators.compose([Validators.email])],
      password: ['', Validators.compose([Validators.required])],
      confirmPassword: ['', Validators.compose([Validators.required])],
      addresses:new FormArray([])
    });
  }

  
  addAddress(){
    (<FormArray>this.registerForm.controls.addresses).push(this.giveAddressInstance());
  }

  removeAddress(index:number){
    (<FormArray>this.registerForm.controls.addresses).removeAt(index);
  }

  giveAddressInstance() {

    return new FormGroup({
      type: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      state: new FormControl('', Validators.required),
      country: new FormControl('', Validators.required),
      postalCode: new FormControl('', [Validators.required, Validators.pattern('^[0-9]+$')]),
      phone: new FormControl('')
    });
  }

  isAddressTypeAlreadySelected(type: string) {
    return this.registerForm.controls.addresses.value.findIndex((control: any) => control.type == type) > -1;
  }

  // getter properties for easy access of controls in html
  get name() { return this.registerForm.get('name'); }
  get contact() { return this.registerForm.get('contact'); }
  get email() { return this.registerForm.get('email'); }
  get password() { return this.registerForm.get('password'); }
  get confirmPassword() { return this.registerForm.get('confirmPassword'); }
  get addresses() { return this.registerForm.get('addresses') as FormArray; }


  isSameAsPassword() {
    if (this.password.value.trim() && this.confirmPassword.value.trim()) {
      return this.password.value === this.confirmPassword.value;
    }

    return true;
  }

  onSubmit() {
    this.submitAttempt = true;
    if (this.registerForm.invalid) { return; }
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
