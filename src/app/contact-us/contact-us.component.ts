import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent {
  contactForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.contactForm= fb.group({
      fullName: ['', [Validators.required, Validators.maxLength(20)]],
      emailAddress: ['', [Validators.required, Validators.email]],
      contactNumber: ['', [Validators.required]],
      subject: ['', [Validators.required, Validators.maxLength(30)]],
      comment: ['', [Validators.required, Validators.maxLength(200)]]
    })
  }

  onSubmit() {
    console.log(this.contactForm.value); // Can send this data to backend
  }

}
