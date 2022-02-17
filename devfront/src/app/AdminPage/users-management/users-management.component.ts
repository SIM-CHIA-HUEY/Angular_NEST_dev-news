import { Component, OnInit, Input } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { Router } from '@angular/router';
import axios from 'axios';

@Component({
  selector: 'app-users-management',
  templateUrl: './users-management.component.html',
  styleUrls: ['./users-management.component.css']
})
export class UsersManagementComponent implements OnInit {

  @Input()
  $id: string = '';
  $username: string = '';
  $isModo: boolean = false;
  $isAdmin: boolean = false;
  // $isModo: any;
  // $isAdmin: any;
  $arrayUsers: any;

  $password: string = "";
  $email: string = '';
  $isSubscribdedNewsletter: boolean = false;
  $avatar: any;
  $user: any;



  constructor(private router: Router) { }

  ngOnInit(): void {

    this.getFullPostData();
    // console.log("id2 ")
    this.getAllUsers();
    // this.removeUser();



  }




  getFullPostData() {

    fetch('http://localhost:3000/users/')
      .then(res => res.json())
      .then(data => {
        this.$id = data.data.id;
        this.$username = data.data.username;
        this.$isModo = data.data.isModo;
        this.$isAdmin = data.data.isAdmin;
        this.getFullPostData();

        //     ('input[checked="false"]').prop('checked',false);
        // ('input[checked="true"]').prop('checked',true)



      })
  }


  async getAllUsers() {
    // fetch all the users from the database
    this.$arrayUsers = await axios.get('http://localhost:3000/users/')
    this.$arrayUsers = this.$arrayUsers.data
    console.log("AVANT");
    console.log(this.$arrayUsers);
    console.log("APRES");
    console.log(this.$id);
    console.log(this.$isModo);

    // console.log("avant");
    // console.log(this.$id);
    // console.log("après");
    // console.log(this.$arrayUsers)
    // console.log("avant");
    // console.log(this.$arrayUsers);
    // console.log(this.$id);
    // console.log("après");
  }


  async removeUser(_id: String) {

    axios.delete('http://localhost:3000/users/' + _id)
    this.refresh();

    // if (window.confirm('Are sure you want to delete this account? This action is irreversible')) {
    //   console.log("Account deleted")
    // }
  }

  async changeModoStatus(item: any) {
    const body = {
      "id": item['id'],
      "username": item['username'],
      "password": item['password'],
      "email": item['email'],
      "isAdmin": false,
      "isModo": !item['isModo'],
      "isSubscribdedNewsletter": item['isSubscribdedNewsletter'],
      "avatar": item['avatar'],
    }
    axios.patch('http://localhost:3000/users/' + item['id'], body).then(response => console.log(response))
    this.refresh();
  }


  async changeAdminStatus(item: any) {
    const body = {
      "id": item['id'],
      "username": item['username'],
      "password": item['password'],
      "email": item['email'],
      "isAdmin": !item['isAdmin'],
      "isModo": true,
      "isSubscribdedNewsletter": item['isSubscribdedNewsletter'],
      "avatar": item['avatar'],
    }
    
    await axios.patch('http://localhost:3000/users/' + item['id'], body).then(response => console.log(response))
    this.refresh();
  }


  refresh(): void {
    window.location.reload();
  }

}

