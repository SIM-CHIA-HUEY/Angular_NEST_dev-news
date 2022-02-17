import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import axios from 'axios';
import* as bcrypt from 'bcryptjs';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent implements OnInit {
  // hero = {name:''};

  // READING ARTICLES
  randomTitle = '';
  randomArticle = '';

  // REGISTER FORM
  form: any = {
    username:'', 
    email: '',
    password:'',
    passwordControl:'',

  };

  // VALIDATORS 1/3
  userProfile:any;
  userId!: number;
  dbUsername:any;
  dbEmail:any;
  usersArray = new Array();
  emailsArray = new Array();
  isValidForm = true;

  
  constructor() { }


  ngOnInit(): void {

    // Fetch an article randomly from database to display
    fetch('http://localhost:3000/articles',{
      method: 'GET',
      headers: {
        'Content-Type':'application/json'
      },
    })
    .then(res =>res.json())
    .then(data => {
      var item = data[Math.floor(Math.random()*data.length)];
      this.randomTitle = item.articleTitle
      this.randomArticle = item.articleSynopsis
    })


    // VALIDATORS 2/3 - Unique Username
    fetch('http://localhost:3000/users',{
      method: 'GET',
      headers: {
        'Content-Type':'application/json'
      },
    })
    .then(res =>res.json())
    .then(data => {
      // console.log(data);
      for (const element of data) {
        this.usersArray.push(element.username)
      };
      // console.log(this.usersArray)

      
    })

    // VALIDATORS 2/3 - Unique Password
    fetch('http://localhost:3000/users',{
      method: 'GET',
      headers: {
        'Content-Type':'application/json'
      },
    })
    .then(res =>res.json())
    .then(data => {
      // console.log(data);
      for (const element of data) {
        // console.log(element.username);
        this.emailsArray.push(element.email)
      };
      // console.log(this.emailsArray)


    })
  }

  // onClick():void{
  //   console.log("Clicked");
  // }

  async getUser (){
    let fetchData = await axios.get('http://localhost:3000/users/' + this.userId)
    this.userProfile = fetchData.data.data
    this.dbUsername = this.userProfile.username
    this.dbEmail = this.userProfile.email
  }

  submit():void{
    // VALIDATOR 1 : Verify password and passwordControl are identical
    if(this.form.password !== this.form.passwordControl){
      this.isValidForm = false
      alert("Please confirm your password.")
    }

    // VALIDATOR 2 : verify if username is already in use
    if(this.usersArray.includes(this.form.username)){
      this.isValidForm = false
      // console.log(false) 
      alert("This username is already used. Please try another one")
    } else {
      // console.log(true) 
      this.isValidForm=true
    }

    // VALIDATOR 3 : verify if email is already in use
    if(this.emailsArray.includes(this.form.email)){
      this.isValidForm = false
      // console.log(false) 
      alert("This email is already used. Please try another one")
    } else {
      // console.log(true) 
      this.isValidForm=true
    }

    // When all validations are validated, send form and create user
    if(this.isValidForm) {
      // console.log(this.form);
      this.createNewUser();
    }
  }
  
  reset(): void {
    //console.log("cancel button clicked");
    this.form.username = ''; 
    this.form.email = '',
    this.form.password = '',
    this.form.passwordControl = '',
    this.form.reset();
  }

  createNewUser(){
    //console.log("Create new user called")
      fetch('http://localhost:3000/users',{
        method: 'POST',
        headers: {
          'Content-Type':'application/json'
        },
        mode: 'cors',
        body: JSON.stringify({
          username: this.form.username,
          password: this.passwordHash(this.form.password),
          email: this.form.email,
          isAdmin: false,
          isModo: false,
          isSubscribdedNewsletter: false,
          avatar: ""
        })
      })
        .then(res=> res.json())
        .then(data=> {
            alert("Congratulations, you created a new account!")
            location.reload();
        })
    }
    
    passwordHash(userPassword: string){
      const saltOrRounds =10;
      const hash = bcrypt.hashSync(userPassword,saltOrRounds)
      //console.log(hash)
      return hash
    }

}
