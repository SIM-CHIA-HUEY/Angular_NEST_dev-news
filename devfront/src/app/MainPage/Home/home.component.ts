import { Component, Inject, OnInit } from '@angular/core';
import axios from 'axios';
import { DOCUMENT } from '@angular/common';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {

  isSortedBy: String = 'Latest';
  searchText:String = '';
  arrayArticles: any;
  arrayArticlesTags: any;
  arrayArticlesLikes: any;
  arrayTagsIdSelected: any = [];
  arrayArticlesDisplayed: any;

  constructor(@Inject(DOCUMENT) private document: Document) { }

  async ngOnInit(): Promise<any> {
    await this.checkAuth2Connection();
    await this.getAllArticles();
    await this.getAllArticlesTags();
    await this.getAllArticlesLikes();
    // console.log(this.arrayArticles);
    this.ImproveArrayArticles();
    this.arrayArticlesDisplayed = this.FilterArticlesOnTags(this.arrayArticles)
    this.arrayArticlesDisplayed = this.checkArticleValidated(this.arrayArticlesDisplayed)
    this.sortByLatest()
    // console.log(this.arrayArticles);
  }

  async checkAuth2Connection() {
    if (localStorage.getItem('googleId') != null){
      console.log('on a googleid')
      const infoAuth = await axios.get('http://localhost:3000/users/google/'+ localStorage.getItem('googleId'))
      console.log(infoAuth);
      localStorage.setItem('userId', infoAuth.data.data.id);
      localStorage.setItem('isAdmin', infoAuth.data.data.isAdmin);
      localStorage.setItem('isModo', infoAuth.data.data.isModo);
    }
    if (localStorage.getItem('githubId') != null){
      const infoAuth2 = await axios.get('http://localhost:3000/users/github/'+ localStorage.getItem('githubId'))
      localStorage.setItem('userId', infoAuth2.data.data.id);
      localStorage.setItem('isAdmin', infoAuth2.data.data.isAdmin);
      localStorage.setItem('isModo', infoAuth2.data.data.isModo);
    }
  }

  async receiveFilter (text:String) {
    this.searchText = text;
    if (this.searchText != ''){
      await this.getArticlesWithSearch()
    } else {
      await this.getAllArticles();
    }
    await this.getAllArticlesTags();
    await this.getAllArticlesLikes();
    this.ImproveArrayArticles();
    this.arrayArticlesDisplayed = this.FilterArticlesOnTags(this.arrayArticles)
    this.arrayArticlesDisplayed = this.checkArticleValidated(this.arrayArticlesDisplayed)
    this.sortByLatest()
  }

  async getAllArticles (){
    // fetch all the articles from the database
    this.arrayArticles = await axios.get('http://localhost:3000/articles')
    this.arrayArticles = this.arrayArticles.data
  }

  async getArticlesWithSearch (){
    // fetch all the articles based on the search word from the database
    this.arrayArticles = await axios.get('http://localhost:3000/articles/search', {
      params:{
      search: this.searchText
      }
    })
    this.arrayArticles = this.arrayArticles.data.res
  }

 async getAllArticlesTags () {
    // fetch the table articles_tags from the database
    this.arrayArticlesTags = await axios.get('http://localhost:3000/articlesTags')
    this.arrayArticlesTags = this.arrayArticlesTags.data
  }

  async getAllArticlesLikes () {
    // fetch the table articles_tags from the database
    this.arrayArticlesLikes = await axios.get('http://localhost:3000/articleLikes')
    this.arrayArticlesLikes = this.arrayArticlesLikes.data
  }

  ImproveArrayArticles () {
    // add the list of tags and number of likes for each article in the arrayArticles
    // First, the number of likes
    this.arrayArticles.forEach((article: any) => {
      var count:any = 0;
      this.arrayArticlesLikes.forEach((elem:any) => {
        if (elem.articleId === article.id) {
          count ++;
        }
      })
      article.nbLikes = count
    })

    // Second, the list of tags
    this.arrayArticles.forEach((article: any) => {
      var tags:any = [];
      this.arrayArticlesTags.forEach((elem:any) => {
        if (elem.articleId === article.id) {
          tags.push(elem.tagId);
        }
      })
      article.listTags = tags
    })
  }

  getSelectedTagsId (array:any){
    this.arrayTagsIdSelected = array;
    this.arrayArticlesDisplayed = this.FilterArticlesOnTags(this.arrayArticles)
    this.arrayArticlesDisplayed = this.checkArticleValidated(this.arrayArticlesDisplayed)
    if (this.isSortedBy=== "Latest") {
      this.sortByLatest()
    } else {
      this.sortByTop()
    }
  }

  FilterArticlesOnTags (array:any) {
   // return an array of articles that include at least one of the selected tags
    var arrayReturnWork: any = [];
    var arrayReturn: any = [];
    if (this.arrayTagsIdSelected.length === 0){
      return array
    } else {
      array.forEach((article:any) => {
        this.arrayTagsIdSelected.forEach((elem:any) => {
          if (article.listTags.includes(elem)){
            arrayReturnWork.push(article)
          }
        })
      })
      var arrayReturn: any = [...new Set(arrayReturnWork)];
      return arrayReturn
    }
  }

  checkArticleValidated (array:any){
    // return an array of articles that have been validated
    var arrayReturn: any = [];
    array.forEach((elem:any) => {
      if (elem.isValidated === true || elem.isValidated === 1) {
        arrayReturn.push(elem)
      }
    })
    return arrayReturn;
  }

  sortByLatest (){
    // return an array sorted by most recent date
    this.isSortedBy = "Latest"
    this.arrayArticlesDisplayed.sort(compareDate);

    function compareDate(a: any, b: any) {
      const dateA = a.date;
      const dateB = b.date;
      let comparison = 0;
      if (dateA > dateB) {
        comparison = 1;
      } else if (dateA < dateB) {
        comparison = -1;
      }
      return comparison * -1;
    }

  }

  sortByTop (){
    // return an array sorted by the most liked
    this.isSortedBy = "Top"
    this.arrayArticlesDisplayed.sort(compareLikes);

    function compareLikes(a: any, b: any) {
      const likesA = a.nbLikes;
      const likesB = b.nbLikes;
      
      let comparison = 0;
      if (likesA > likesB) {
        comparison = 1;
      } else if (likesA < likesB) {
        comparison = -1;
      }
      return comparison * -1;
    }
  }

}


