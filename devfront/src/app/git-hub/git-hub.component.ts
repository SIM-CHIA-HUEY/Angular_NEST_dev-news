import { Component, Inject, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import axios from 'axios';

@Component({
  selector: 'app-git-hub',
  templateUrl: './git-hub.component.html',
  styleUrls: ['./git-hub.component.css']
})
export class GitHubComponent implements OnInit {

  constructor(@Inject(DOCUMENT) private document: Document) { }

  ngOnInit(): void {

  }
  async loginWithRedirect() {
    this.document.location.href = 'https://github.com/login/oauth/authorize?client_id=624a3db3f8e295bed404';   
  }



}
