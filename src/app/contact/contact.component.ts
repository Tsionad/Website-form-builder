import { Component, OnInit } from '@angular/core';

// form-specific functions
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

//email service
import { MessageService } from '../message.service';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  contactForm: FormGroup;
  submitted = false;
  success = false;
  fail = false;

  constructor(private formBuilder: FormBuilder, private MessageService: MessageService ) { }

  ngOnInit() {
    this.contactForm = this.formBuilder.group({
      'email': [null, Validators.compose([
        Validators.required,
        Validators.email,
      ])],
      'subject': [null, Validators.required],
      'message': [null, Validators.required]
    });
  }

  onSubmit() {
    this.submitted = true;

    if (this.contactForm.valid) {
      this.success = true;
      this.fail = false;

      this.MessageService.sendMessage(this.contactForm)
      .subscribe(
        (response) =>{
          alert("Thank you! Your message was sent");
        },
        (err) =>{
          alert("Sorry, there was an error submitting your message, please try again");
        }
      );
    }

  }
}
  
  
