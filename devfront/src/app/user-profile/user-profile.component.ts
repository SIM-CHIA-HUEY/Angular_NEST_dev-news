import { Component, OnInit, Input, SecurityContext, Inject } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import axios from 'axios';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import * as bcrypt from 'bcryptjs';
import { ToastrService } from 'ngx-toastr';
import { MatChip } from '@angular/material/chips';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatDialogModule } from '@angular/material/dialog';
import { validateVerticalPosition } from '@angular/cdk/overlay';
import { AnyPtrRecord } from 'dns';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  arrayArticles: [] | undefined
  arrayFavorites: [] | undefined
  arrayOfTags: Array<{ tagId: number, tagName: string, isSelected: boolean }> = [];
  arrayOfId: Array<{ id: number, tagId: number }> = [];
  blob: any;
  blobURL: any;
  isSuccessful = false;
  isValidForm = true;
  originalTagsId: Array<any> = [];
  password = "password"
  passwordConfirmed = '';
  selectedTagsId: Array<number> = [];
  usersArray: any;
  userId: any;
  username: any;
  userEmail: any;
  userProfile: any;
  idAuth: number = 0;
  isAdmin: boolean = false;
  isAuth: boolean = false;

  @Input()
  url = '';
  activeRoute: any;

  constructor(
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private toastr: ToastrService,
    public dialog: MatDialog
  ) { }

  async ngOnInit(): Promise<any> {

    this.idAuth = JSON.parse(localStorage.getItem('userId') || '{}');
    this.userId = Number(this.route.snapshot.paramMap.get('id'))
    if (this.idAuth === this.userId) {
      this.isAuth = true;
    }
    this.isAdmin = JSON.parse(localStorage.getItem('isAdmin') || '{}');
    if (this.isAdmin != true){
      this.isAdmin=false;
    }

    await this.getUser();
    const res = await axios.get('http://localhost:3000/users')
    this.usersArray = res.data

    this.getUserArticles()
    // let fetchUserArticles = await axios.get('http://localhost:3000/articles/user/'+ this.userId)
    // this.arrayArticles = fetchUserArticles.data.res

    let fetchUserFavorites = await axios.get('http://localhost:3000/favorites/user/' + this.userId)
    this.arrayFavorites = fetchUserFavorites.data.res

    fetch('http://localhost:3000/tagUsers')
      .then(res => res.json())
      .then(data => {
        data.map((item: { id: number; tagId: number; userId: number; }) => {
          if (item.userId === this.userId) {
            this.selectedTagsId.push(item.tagId)
            this.originalTagsId.push(item.tagId)
            this.arrayOfId.push({ "id": item.id, "tagId": item.tagId })
          }

        })
      });

    let fetchTagList = await axios.get('http://localhost:3000/tags')
    console.log(this.selectedTagsId)
    fetchTagList.data.map((item: { id: number; tagTitle: string; }) => {

      if (this.selectedTagsId.indexOf(item.id) > -1) {
        this.arrayOfTags.push({ "tagId": item.id, "tagName": item.tagTitle, "isSelected": true });
      } else {
        this.arrayOfTags.push({ "tagId": item.id, "tagName": item.tagTitle, "isSelected": false });
      }
    })

  }

  deleteArticle(articleId: number) {
    if(window.confirm('Are sure you want to remove this article from your favorites ?')){
      axios.delete('http://localhost:3000/articles/' + articleId)
      this.toastr.success('Article deleted', 'Well done!');
      this.getUserArticles()
     }
  }

  deleteUser(userId: number) {
    if(window.confirm('Are sure you want to delete your account ?')){
      axios.delete('http://localhost:3000/users/' + userId)
      this.toastr.success('User account deleted', 'Goodbye!');
     }
  } 
  
  async getArticleTags(articleId: number) {
    let tags = await axios.get('http://localhost:3000/articlesTags/article/' + articleId)
    let tagSelected = ""
    if(tags.data.txt === "") {
      tagSelected = "No tag Selected"
    } else {
      tagSelected = tags.data.txt
    }
    console.log(tagSelected)
    return tagSelected
  }

  getBase64(file: any) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }

  async getUser() {
    let fetchData = await axios.get('http://localhost:3000/users/' + this.userId)
    this.userProfile = fetchData.data.data
    this.username = this.userProfile.username
    this.userEmail = this.userProfile.email
    // this.userProfile.avatar = "./assets/profile.png"

  }

  async getUserArticles() {
    let fetchUserArticles = await axios.get('http://localhost:3000/articles/user/'+ this.userId)
    this.arrayArticles = fetchUserArticles.data.res
  }

  onSelectFile(e: any) {
    // var blob = new Blob([e.target.files[0]], {type: "image/png"})
    // this.blob = blob
    // this.userProfile.avatar = blob
    // var objectURL = URL.createObjectURL(blob);
    // this.blobURL = objectURL

  }

  async openDialog(articleTitle: string, articleSynopsis: string, articleId: number) {
    let fetchArticleTags = await this.getArticleTags(articleId)
    const articleTags = fetchArticleTags
    const dialogRef = this.dialog.open(DialogContentExampleDialog, {
      width: '50%',
      data: [articleTitle, articleSynopsis, articleTags]
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  async passwordHash(userPassword: string) {
    const saltOrRounds = 10;
    const hash = bcrypt.hashSync(userPassword, saltOrRounds)
    return hash
  }

  async patchUser() {
    if (this.password == this.passwordConfirmed) {
      this.usersArray.map((item: { username: any; email: any }) => {
        if (this.userProfile.username === item.username && this.username !== item.username) {
          this.isValidForm = false
          this.toastr.error('This username is already used. Please try another one', 'Invalid username')
        } else if (this.userProfile.email === item.email && this.userEmail !== item.email) {
          this.isValidForm = false
          this.toastr.error('This email is already used. Please try another one', 'Invalid email')
        }
      })
      if (this.isValidForm) {
        let hash = await this.passwordHash(this.password)
        await axios.patch('http://localhost:3000/users/' + this.userId, {
          "id": this.userId,
          "username": this.userProfile.username,
          "password": hash,
          "email": this.userProfile.email,
          "isSubscribdedNewsletter": this.userProfile.isSubscribdedNewsletter,
          "avatar": this.userProfile.avatar
        });
        console.log("blob before patch")
        console.log(this.blob)
        console.log(this.userProfile.avatar)
        this.toastr.success('Informations saved. Confirmation')

      }
    } else {
      this.toastr.error('Invalid password credentials. Please try again', 'Invalid password')
    }

  }

  removeFavorite() {
    if (window.confirm('Are sure you want to remove this article from your favorites ?')) {
      console.log("favorites removed")
    }
  }

  toggleSelection(chip: MatChip) {
    chip.toggleSelected();
    if (chip.selected) {
      this.selectedTagsId.push(chip.value)
    } else {
      this.selectedTagsId.splice(this.selectedTagsId.indexOf(chip.value), 1)
    }
  }


  updateFavoritesTags() {
    if (window.confirm('Are sure you want to modify your favorite Tags ?')) {

      if (this.selectedTagsId.length === 0) {
        this.toastr.warning('No tag selected', 'Please select at least one tag', { positionClass: "toast-center-full-width" });
      } else {

        if (JSON.stringify(this.originalTagsId) !== JSON.stringify(this.selectedTagsId)) {
          // Boucle sur le tableau original des tags
          for (var i = 0; i < this.originalTagsId.length; i++) {
            // On vérifie l'absence des tags originaux
            if (this.selectedTagsId.includes(this.originalTagsId[i])) {

            } else {
              this.arrayOfId.map((item: { id: number; tagId: number; }) => {
                if (this.originalTagsId[i] == item.tagId) {
                  axios.delete('http://localhost:3000/tagUsers/' + item.id)
                }
              })
            }
          }
          for (var i = 0; i < this.selectedTagsId.length; i++) {
            // On vérifie la présence des nouveaux tags
            if (this.originalTagsId.includes(this.selectedTagsId[i])) {

            } else {
              axios.post('http://localhost:3000/tagUsers', {
                "tagId": this.selectedTagsId[i],
                "userId": this.userId
              })
            }
          }
        }
        this.toastr.success('Favorite Tags updated', 'Well done!');
      }
    }
  }

  valueChange($event: { checked: any; }) {
    this.userProfile.isSubscribdedNewsletter = $event.checked;
  }

}

@Component({
  selector: 'dialog-content-example-dialog',
  templateUrl: 'dialog-content-example-dialog.html',
  styleUrls: ['./user-profile.component.scss']
})



export class DialogContentExampleDialog {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }
}


