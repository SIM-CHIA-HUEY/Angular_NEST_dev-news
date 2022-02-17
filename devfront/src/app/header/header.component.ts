import { SocialAuthService } from 'angularx-social-login';
import { Component, NgModule, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  userId:any;
  userLoggedIn = false ;
  modLoggedIn = false ;
  adminLoggedIn = false ;
  loggedOut = true;
  allemail: any;
  emails: any = [];


  displayEmail = '';
  useremail = new Array();
  // modLoggedIn: boolean;


  constructor(private router: Router,
    public socialAuthServive: SocialAuthService,
  ) {
  }
  // logOutGoogle(): void {
  //   localStorage.clear();
  //   this.socialAuthServive.signOut().then(() => this.router.navigate(['login']));
  // }


  // LOGOUT button for all normal authentication
  logOut() {
    this.loggedOut = true
    localStorage.clear();
    location.reload();
  }
  async ngOnInit() {
    const isAuth = localStorage.getItem('access_token');
    const isAdmin = localStorage.getItem('isAdmin');
    const isModo = localStorage.getItem('isModo');
    const email = localStorage.getItem('email');
    const isGoogle = localStorage.getItem('googleId');
    const isGithub = localStorage.getItem('githubId');
    let i;



    // When user is logged in
    if (isAuth) {
      this.displayEmail = email + "";
      this.userLoggedIn = true
      // this.modLoggedIn = false ;
      this.adminLoggedIn = false ;
      this.loggedOut = false 

      // MODO : (changes) MODO also use admin dropdown menu
      if (isModo === "true") {
        this.userLoggedIn = false
        this.modLoggedIn = true;
        this.adminLoggedIn = false;
        this.loggedOut = false
      }
      // ADMIN
      if (isAdmin === "true") {
        this.userLoggedIn = false
        // this.modLoggedIn = false ;
        this.adminLoggedIn = true ;
        this.loggedOut = false 
      }
      // Google

      console.log(isGoogle)
      if (isGoogle) {
        //get all user emails
        const useremails= await axios.get('http://localhost:3000/users')
        console.log("APRES REQUETE")
        this.allemail = useremails.data

        for (i = 0; i < this.allemail.length; i++) {
          this.emails.push(this.allemail[i].email)
            };
         
        // if email exist   
        if (this.emails.includes(email)) {
          console.log("welcome back!")
        }
        else {
          console.log("new google user!")
          var data = JSON.stringify({
            "username": email+"",
            "email": email+"",
            "idGoogle": isGoogle+""
          });
          
          
          axios({
            method: 'post',
            url: 'http://localhost:3000/users',
            headers: { 
              'Content-Type': 'application/json'
            },
            data : data
          })
          .then(function (response: { data: any; }) {
            console.log(JSON.stringify(response.data));
          })
         
          console.log('registed!!!')
        }
      }


      if (isGithub) {
        //get all user emails
        const useremails= await axios.get('http://localhost:3000/users')
        this.allemail = useremails.data

        for (i = 0; i < this.allemail.length; i++) {
          this.emails.push(this.allemail[i].email)
            };
         
        // if email exist   
        if (this.emails.includes(email)) {
          console.log("welcome back!")
        }
        else {
          console.log("new github user!")
          var data = JSON.stringify({
            "username": email+"",
            "email": email+"",
            "idGithub": isGithub+""
          });
          
          
          axios({
            method: 'post',
            url: 'http://localhost:3000/users',
            headers: { 
              'Content-Type': 'application/json'
            },
            data : data
          })
          .then(function (response: { data: any; }) {
            console.log(JSON.stringify(response.data));
          })
         
          console.log('registed!!!')
        }
      }

    }

    this.userId = JSON.parse(localStorage.getItem('userId') || '{}');
  }
  logout(): void {
    this.socialAuthServive.signOut().then(() => this.router.navigate(['login']));
  }


}
