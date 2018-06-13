import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { AuthService } from '../../providers/auth.service';
import { CustomService } from '../../providers/custom.service';


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
    private viewCtrl: ViewController,
    private authService:AuthService,
    private customService:CustomService
  ) {
    this.makeForm();
  }


  makeForm() {
    this.registerForm = this.fb.group({
      name: ['', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z ]*')])],
      contactNo: ['', Validators.compose([Validators.required, Validators.pattern('^[0-9]+$'),,Validators.minLength(10),Validators.maxLength(10)])],
      email: ['', Validators.compose([Validators.email])],
      password: ['', Validators.compose([Validators.required])],
      confirmPassword: ['', Validators.compose([Validators.required])],
      addresses: new FormArray([])
    });
  }

  addAddress() {
    (<FormArray>this.registerForm.controls.addresses).push(this.giveAddressInstance());
  }

  removeAddress(index: number) {
    (<FormArray>this.registerForm.controls.addresses).removeAt(index);
  }

  giveAddressInstance() {

    return new FormGroup({
      addressType: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      state: new FormControl('', Validators.required),
      country: new FormControl('', Validators.required),
      postalCode: new FormControl('', [Validators.required, Validators.pattern('^[0-9]+$')]),
      phone: new FormControl('')
    });
  }

  isAddressTypeAlreadySelected(type: string) {
    return this.registerForm.controls.addresses.value.findIndex((control: any) => control.addressType == type) > -1;
  }

  // getter properties for easy access of controls in html
  get name() { return this.registerForm.get('name'); }
  get contactNo() { return this.registerForm.get('contactNo'); }
  get email() { return this.registerForm.get('email'); }
  get password() { return this.registerForm.get('password'); }
  get confirmPassword() { return this.registerForm.get('confirmPassword'); }
  get addresses() { return this.registerForm.get('addresses') as FormArray; }

  // methods for easy access of controls of addresses formarray in html, getter property can't accept parameters.hence they havn't been used
  typeControl(index: number) { return (<FormArray>this.registerForm.get('addresses')).at(index).get('addressType'); }
  addressControl(index: number) { return (<FormArray>this.registerForm.get('addresses')).at(index).get('address'); }
  cityControl(index: number) { return (<FormArray>this.registerForm.get('addresses')).at(index).get('city'); }
  stateControl(index: number) { return (<FormArray>this.registerForm.get('addresses')).at(index).get('state'); }
  countryControl(index: number) { return (<FormArray>this.registerForm.get('addresses')).at(index).get('country'); }
  postalCodeControl(index: number) { return (<FormArray>this.registerForm.get('addresses')).at(index).get('postalCode'); }

  // for showing the password didn't match error
  isSameAsPassword() {
    if (this.password.value.trim() && this.confirmPassword.value.trim()) {
      return this.password.value === this.confirmPassword.value;
    }
    return true;
  }
     
  onSubmit() {
    
    this.submitAttempt = true;
    if (this.registerForm.invalid) { return; }

    delete this.registerForm.value['confirmPassword'];

    this.customService.showLoader('Registering ...');
    this.authService.register(this.registerForm.value)
    .subscribe((res:any)=>{
      this.customService.hideLoader();
      this.customService.showToast('Registration Successfull. Please Login Now','bottom',true);
      this.dismiss();
    },(err:any)=>{
      this.customService.hideLoader();
      this.customService.showToast(err.msg);
    });
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
