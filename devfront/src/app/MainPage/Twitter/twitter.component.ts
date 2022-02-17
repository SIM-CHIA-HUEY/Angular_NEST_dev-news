import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Console } from 'console';

@Component({
  selector: 'app-twitter',
  templateUrl: './twitter.component.html',
  styleUrls: ['./twitter.component.scss']
})

export class TwitterComponent implements OnInit {

  constructor() { }
  text:any = [];
  image:any = [];
  ngOnInit(): void {
    let alltwittes;
    let url = 'http://localhost:3000/twitter'
    let twitte = [];
    let i = 0;

      axios({
        method: 'get',
        url: url,
      })
        .then(data => {
          alltwittes = data.data.data;
          for (i = 0; i < alltwittes.length; i++){
            twitte.push(alltwittes[i])
          }
          for (i = 0; i < alltwittes.length; i++) {
            if (alltwittes[i].entities.urls)
              if (alltwittes[i].entities.urls[0].images)
              this.image.push(alltwittes[i].entities.urls[0].images[0].url)
            this.text.push(alltwittes[i].text)
          }
          console.log(alltwittes)
          console.log(this.text)
        })
  }

}