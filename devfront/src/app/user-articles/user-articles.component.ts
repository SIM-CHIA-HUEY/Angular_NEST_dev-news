import { Component, OnInit } from '@angular/core';
import axios from 'axios';

@Component({
  selector: 'app-user-articles',
  templateUrl: './user-articles.component.html',
  styleUrls: ['./user-articles.component.scss']
})
export class UserArticlesComponent implements OnInit {
  arrayArticles: [] | undefined
  arrayFavorites: [] | undefined
  userId: any

  constructor() { }

  async ngOnInit(): Promise<void> {
    this.userId = JSON.parse(localStorage.getItem('userId') || '{}');
    let fetch = await axios.get('http://localhost:3000/articles/user/' + this.userId)
    this.arrayArticles = fetch.data.res

    let fetch2 = await axios.get('http://localhost:3000/favorites/user/' + this.userId)
    this.arrayFavorites = fetch2.data.res

  }

  deleteArticle() {
    if (window.confirm('Are sure you want to remove this article from your favorites ?')) {
      console.log("favorites removed")
    }
  }

  removeFavorite() {
    if (window.confirm('Are sure you want to remove this article from your favorites ?')) {
      console.log("favorites removed")
    }
  }

}
