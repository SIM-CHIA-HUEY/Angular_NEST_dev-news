import { Component, OnInit } from '@angular/core';
import axios from 'axios';

@Component({
  selector: 'app-admin-articles',
  templateUrl: './admin-articles.component.html',
  styleUrls: ['./admin-articles.component.scss']
})
export class AdminArticlesComponent implements OnInit {
  articlesArray: any;
  allarticle: any = [];
  constructor() { }

  ngOnInit(): void {
    this.getArticles();
  }

  async getArticles() {

    const res = await axios.get('http://localhost:3000/articles/')
    this.articlesArray = res.data
    let i;
    for (i = 0; i < this.articlesArray.length; i++) {
      console.log(this.articlesArray[i])
      this.allarticle.push(this.articlesArray[i])
    }
    console.log(this.allarticle)
  
  }

  async deleteArticle(id:any){
    await axios.delete('http://localhost:3000/articles/' + id)
    this.getArticles();
  }

  async updateArticles(id:any,newTitle:any, newSynopsis:any, newValidate:any){
    await axios.patch('http://localhost:3000/articles/'+id, {
      articleTitle: newTitle,
      articleSynopsis: newSynopsis,
      isValidated:newValidate,
    })
    this.getArticles()
  }


  refresh(): void {
    window.location.reload();
  }


}
