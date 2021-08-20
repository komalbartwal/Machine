import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserDetails } from './user-details';


@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css']
})
export class UserRegistrationComponent implements OnInit {
  title: string;
  imageSrc = 'https://media2.fdncms.com/charlotte/imager/u/zoom/13089785/blank-profile-picture-973460_960_720.png';
  userDetails?: UserDetails;
  registrationForm: FormGroup;




  constructor(private fb: FormBuilder,
    public dialogRef: MatDialogRef<UserRegistrationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.title = data.title;
    let file = '';
    this.userDetails = data.userData;
    if (data.userData) {
      this.imageSrc = data.userData.file;
      file  = data.userData.file.replace(/^.*[\\\/]/, '');
    }
// fetching data from registerpage to userdetails

    this.registrationForm = new FormGroup({
      file: new FormControl(file, Validators.required),
      fname: new FormControl(this.userDetails?.fname, Validators.required),
      lname: new FormControl(this.userDetails?.lname, Validators.required),
      email: new FormControl(this.userDetails?.email, Validators.required),
      phone: new FormControl(this.userDetails?.phone, Validators.required),
      age: new FormControl(this.userDetails?.age, Validators.required),
      city: new FormControl(this.userDetails?.city, Validators.required),
      state: new FormControl(this.userDetails?.state, Validators.required),
      address: new FormControl(this.userDetails?.address, Validators.required),
      address1: new FormControl(this.userDetails?.address1, Validators.required),
      address2: new FormControl(this.userDetails?.address2, Validators.required),
      tags: new FormControl(this.userDetails?.tags, Validators.required),
      che: new FormControl(this.userDetails?.che)
    });
  }


  ngOnInit(): void {
  }

  onCancelClick(): void {
    
    this.dialogRef.close(this.setUserDetails());
  }
  onSubmit(): void {
    if (this.registrationForm.invalid) {
      alert('Detail is missing');
    } else {
      const userData: UserDetails = this.setUserDetails();
      console.log(userData);
      this.dialogRef.close(userData);
    }
  }
// Eddit profile
  private setUserDetails(): UserDetails {
    this.userDetails = new UserDetails();
    this.userDetails.file = this.imageSrc;
    this.userDetails.fname = this.registrationForm.controls['fname'].value;
    this.userDetails.lname = this.registrationForm.controls['lname'].value;
    this.userDetails.email = this.registrationForm.controls['email'].value;
    this.userDetails.phone = this.registrationForm.controls['phone'].value;
    this.userDetails.age = this.registrationForm.controls['age'].value;
    this.userDetails.city = this.registrationForm.controls['city'].value;
    this.userDetails.state = this.registrationForm.controls['state'].value;
    this.userDetails.address = this.registrationForm.controls['address'].value;
    this.userDetails.address1 = this.registrationForm.controls['address1'].value;
    this.userDetails.address2 = this.registrationForm.controls['address2'].value;
    this.userDetails.tags = this.registrationForm.controls['tags'].value;
    this.userDetails.che = this.registrationForm.controls['che'].value;

    return this.userDetails;
  }

  onFileChange(event: any) {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {

        this.imageSrc = reader.result as string;

        this.registrationForm.patchValue({
          fileSource: reader.result
        });

      };

    }
  }
}
