import { Component, Inject, OnInit } from '@angular/core';
import axios from 'axios';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-connection-git-hub',
  templateUrl: './connection-git-hub.component.html',
  styleUrls: ['./connection-git-hub.component.css']
})
export class ConnectionGitHubComponent implements OnInit {
  gituser:any='';

  constructor(@Inject(DOCUMENT) private document: Document) { }

  async ngOnInit() {
    const redirect_uri = this.document.location.href;
    console.log(redirect_uri)
    const code = redirect_uri.split("=");
    console.log(code[1]);

    if (code[1] != undefined) {
      // access token avec ton code (axios)
      const client_id = 'xxx'
      const client_secret = 'xxx'
      const codeclient = code[1]
      const ACCESS_TOKEN_URL = 'https://github.com/login/oauth/access_token';
      const GITHUB_URL = `${ACCESS_TOKEN_URL}?client_id=${client_id}&client_secret=${client_secret}&code=${codeclient}`;

      const accessToken = await axios.post(
        GITHUB_URL, {
        headers: {
          'Content-Type': 'application/json'
        }
      }
      );
      console.log('hh')
      console.log(accessToken)
      const newtoken = accessToken.data.split('&');
      console.log(newtoken[0])
      const newaccessToken = newtoken[0]
      const newtry = newaccessToken.split('=');
      console.log(newtry[1])
      localStorage.setItem('githubId', newtry[1]);
      // get user info
      const config = {
        headers: { Authorization: `Bearer ${newtry[1]}` }
      };
      const info = await axios.get('https://api.github.com/user', config)

      console.log(info.data.login)
      this.gituser = info.data
      localStorage.setItem('email', this.gituser.login);
      
      
      setTimeout(function () {
        window.location.href = "http://localhost:4200/home"
        }, 500);
    }
  }
  

}
