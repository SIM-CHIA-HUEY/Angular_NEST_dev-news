import { Component, OnInit } from '@angular/core';
import axios from 'axios';

@Component({
  selector: 'app-admin-newsletter',
  templateUrl: './admin-newsletter.component.html',
  styleUrls: ['./admin-newsletter.component.scss']
})
export class AdminNewsletterComponent implements OnInit {

  newsletterText:String = ""

  constructor() { }

  ngOnInit(): void {
  }

  async send(){
    console.log(this.newsletterText)
    if (window.confirm('Are you sure you want to send this newsletter ?')){
      await axios.post('http://localhost:3000/mail', {
      content: this.newsletterText,
    })
      this.newsletterText = ''
    }
    
  }

}
