import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'; 
import { FormGroup } from '@angular/forms';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private apiUrl = "//interview-contact-submit-api-lb-1009699934.us-east-1.elb.amazonaws.com/contact-us/send";

  constructor(private http: HttpClient) { }


  sendMessage(contact: FormGroup): Observable<any> {
    return this.http.post(this.apiUrl, {
      "email" : contact.get('email').value,
      "subject" : contact.get('subject').value,
      "body" : contact.get('message').value
    }, httpOptions)
    .pipe(
      catchError(e => throwError(e))
    );
  }
}

   