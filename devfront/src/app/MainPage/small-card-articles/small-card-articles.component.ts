import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';

@Component({
  selector: 'app-small-card-articles',
  templateUrl: './small-card-articles.component.html',
  styleUrls: ['./small-card-articles.component.css']

})
export class SmallCardArticlesComponent implements OnInit {

  @Input()
  $id = '';
  $userId = '';
  $avatar: string = '';
  $username: string = '';
  $date: string = '';
  $articleTitle: string = '';
  $articleSynopsis: string = '';
  $tagId: string = '';
  $tagTitle: string = '';
  $location: string = '';
  $comments: number = 0;

  $likes: number = 0;
  $dislikes: number = 0;
  $chooseclassl: boolean = true;
  $chooseclassd: boolean = true;
  $likesCounter: boolean = true;
  $dislikeCounter: boolean = true;
  $articleId: string = '';
  $listTagArticles: string = '';

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.getFullPostData();
    this.getNbComments();
    this.getNbLikes();
    this.getNbDislikes();
  }

  // Obtention des données pour la prévisualisation de l'article
  getFullPostData() {

    //Récupérer dans la table Articles par ID de l'article
    fetch('http://localhost:3000/articles/' + this.$id)
      .then(res => res.json())
      .then(data => {
        this.$userId = data.data.userId;
        this.$articleTitle = data.data.articleTitle;
        this.$articleSynopsis = data.data.articleSynopsis;
        this.$location = data.data.location;
        this.$date = data.data.date;

        // Récupérer dans la table Users par le UserId
        fetch('http://localhost:3000/users/' + this.$userId)
          .then(res => res.json())
          .then(data => {
            this.$username = data.data.username;
            this.$avatar = data.data.avatar;
          })
      })

    fetch('http://localhost:3000/articlestags/article/' + this.$id)
      .then(res => res.json())
      .then(data => {
        this.$tagTitle = data.txt;
      })
  }


  async getNbComments (){
    const res = await axios.get('http://localhost:3000/comments/count/'+ this.$id)
    this.$comments = res.data.data[0].count;
  }

  async getNbLikes (){
    const res = await axios.get('http://localhost:3000/articleLikes/count/'+ this.$id)
    this.$likes = res.data.data[0].count;
  }

  async getNbDislikes (){
    const res = await axios.get('http://localhost:3000/articleDislikes/count/'+ this.$id)
    this.$dislikes = res.data.data[0].count;
  }

  openPostView() {
    this.router.navigate(['/article', this.$id])
  }
};