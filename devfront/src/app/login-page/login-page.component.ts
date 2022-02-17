import { AuthService } from '@auth0/auth0-angular';
import { GoogleLoginProvider, SocialAuthService } from 'angularx-social-login';
import { DOCUMENT } from '@angular/common';

import { Component, Input, OnInit, Inject} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CookieService } from 'ngx-cookie-service';
import * as bcrypt from 'bcryptjs';


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})

export class LoginPageComponent implements OnInit {

  randomTitle = '';
  randomArticle = '';

  form: any = {
    email: '',
    password:''
  };

  constructor (
    private router: Router,
    private socialAuthService: SocialAuthService,
    //private toastr: ToastrService,
    private cookieService: CookieService,
    public auth: AuthService,
    @Inject(DOCUMENT) private document: Document
  ) {}


  ngOnInit(): void {

    fetch('http://localhost:3000/articles',{
      method: 'GET',
      headers: {
        'Content-Type':'application/json'
      },
    })
    .then(res =>res.json())
    .then(data => {
      //console.log(data);
      var item = data[Math.floor(Math.random()*data.length)];
      this.randomTitle = item.articleTitle
      this.randomArticle = item.articleSynopsis
    })
  }


  loginWithGoogle(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID)
      .then((res) => {
        localStorage.setItem('email', res.email);
        localStorage.setItem('googleId', res.id);
        localStorage.setItem('access_token', res.idToken);
        console.log(res)
      }).then(() => this.router.navigate(['home']));
  }

  async loginWithRedirect() {
    this.document.location.href = 'https://github.com/login/oauth/authorize?client_id=624a3db3f8e295bed404';
  }



  login(): void {

    fetch('http://localhost:3000/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type':'application/json'
      },
      mode: 'cors',
      body: JSON.stringify({
        username: this.form.username,
        password: this.form.password
      })
    })
    .then(res => res.json())
    .then(data => {
      //console.log(data);
      localStorage.setItem('access_token', data.access_token.access_token);

      fetch('http://localhost:3000/profile', {
        method: 'GET',
        headers: {
        'Authorization':'Bearer ' + data.access_token.access_token
        }
      })
      //console.log(data.access_token);
      
      .then(res =>res.json())
      .then(data2 => {
        console.log(data2);
        localStorage.setItem('email', data2.email);
        localStorage.setItem('userId', data2.id);
        localStorage.setItem('isAdmin', data2.isAdmin);
        localStorage.setItem('isModo', data2.isModo);
        //const isAuth = this.cookieService.get('access_token') 
        const isAuth = localStorage.getItem('access_token');
        
        console.log("variable isAuth: " + isAuth)
        if (isAuth) {
        window.location.href = '/'
        //this.toastr.success('Welcome !!', 'Login Success')
        } else {
        //this.toastr.warning('Try another email or password', 'Invalid Credentials')
        alert('Try another email or password')
        }
      })
    })
  }

passwordHash(userPassword: string) {
const saltOrRounds = 10;
const hash = bcrypt.hashSync(userPassword, saltOrRounds)
console.log(hash)
return hash
}



checkPassword(password: string, hashedPassword: string ) {
bcrypt.compare(password, hashedPassword).then((res: boolean) => {
if (res === true) {
// console.log("Password Match")
} else {
//this.toastr.error('Invalid Password. Please try another password', 'Password Failure')
alert('Invalid Password. Please try another password')
}
});
}


// }


  reset(): void {
    console.log("cancel button clicked");
    this.form.username = '';
    this.form.password = '',
    this.form.reset();

  }


}
