import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faFacebookSquare } from '@fortawesome/free-brands-svg-icons/faFacebookSquare';
import { faTwitterSquare } from '@fortawesome/free-brands-svg-icons/faTwitterSquare';
import { ToastrService } from 'ngx-toastr';
import axios from 'axios';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { arrayToTree } from "performant-array-to-tree";

@Component({
  selector: 'app-single-article',
  templateUrl: './single-article.component.html',
  styleUrls: ['./single-article.component.scss']
})

export class SingleArticleComponent implements OnInit {

  fbIcon:any = faFacebookSquare;
  tweetIcon:any = faTwitterSquare;
  closeResult: string ='';
  id:Number = 0;

  isLogged:boolean = false;
  idUserLogged:any = null;
  isFavorite:boolean = false;
  isLiked:boolean = false;
  isDisliked:boolean = false;

  articleTitle: String = '';
  articleSynopsis: String = '';
  articlePath: String = '';
  articleIsValidated: boolean = false;
  location:String = '';
  idAuthor:number = 0;
  date:string= '';
  nbComments:number = 0;
  nbLikes:number = 0;
  nbDislikes:number = 0;

  newComment:string = '';
  arrayComments:any = [];
  arrayCommentsDisplayed:any = [];

  constructor(private activeRoute: ActivatedRoute, private router: Router,private toastr: ToastrService, private modalService: NgbModal) { }

  async ngOnInit(): Promise <any> {
    this.getLoggedInfo ();
    this.getId();
    await this.getArticleInfo ();
    await this.getFavoriteInfo();
    await this.getLikedInfo();
    await this.getDislikedInfo();
    await this.getNbComments();
    await this.getNbLikes();
    await this.getNbDislikes();
    await this.getComments();
  }

  getLoggedInfo(){
    if (localStorage.getItem('userId') != null){
      this.idUserLogged = JSON.parse(localStorage.getItem('userId') || '{}')
      this.isLogged = true;
    }
  }

  getId(){
    this.id = Number(this.activeRoute.snapshot.paramMap.get('id'));
  }

  async getArticleInfo (){
    const res = await axios.get('http://localhost:3000/articles/'+ this.id)
    this.articleTitle = res.data.data.articleTitle
    this.articleSynopsis = res.data.data.articleSynopsis

    const content = 'http://localhost:3000/uploads/'+ res.data.data.file
    const filefetch = await axios.get(content)
    this.articlePath = filefetch.request.responseURL

    // this.articlePath = "../../assets/" + res.data.data.file + "#toolbar=0&navpanes=0&scrollbar=0&statusbar=0"
    this.articleIsValidated = res.data.data.isValidated
    this.location = res.data.data.location
    this.idAuthor = res.data.data.userId
    this.date = res.data.data.date
      // const content = 'http://localhost:3000/uploads/1644493349583.pdf'
  // this.filefetch = await axios.get(content)
  // this.testURL = this.filefetch.request.responseURL
  }

  async getFavoriteInfo (){
    if (this.isLogged === true){
      const res = await axios.get('http://localhost:3000/Favorites/user/'+ this.idUserLogged+ '/article/'+ this.id)
      if(res.data.res != false){
        this.isFavorite = true;
      } else {
        this.isFavorite = false;
      }
    }
  }

  async getLikedInfo (){
    if (this.isLogged === true){
      const res = await axios.get('http://localhost:3000/articleLikes/user/'+ this.idUserLogged+ '/article/'+this.id)
      if(res.data.res != false){
        this.isLiked = true;
      } else {
        this.isLiked = false;
      }
    }
  }

  async getDislikedInfo (){
    if (this.isLogged === true){
      const res = await axios.get('http://localhost:3000/articleDislikes/user/'+ this.idUserLogged+ '/article/'+this.id)
      if(res.data.res != false){
        this.isDisliked = true;
      } else {
        this.isDisliked = false;
      }
    }
  }    

  async getNbComments (){
    const res = await axios.get('http://localhost:3000/comments/count/'+ this.id)
    this.nbComments = res.data.data[0].count;
  }

  async getNbLikes (){
    const res = await axios.get('http://localhost:3000/articleLikes/count/'+ this.id)
    this.nbLikes = res.data.data[0].count;
  }

  async getNbDislikes (){
    const res = await axios.get('http://localhost:3000/articleDislikes/count/'+ this.id)
    this.nbDislikes = res.data.data[0].count;
  }

  async handleFavorite(){
    if (this.isLogged === false){
      this.toastr.warning('You must be connected to add an article to favorite');
    } else {
      await axios.post('http://localhost:3000/Favorites', {
        articleId: this.id,
        userId: this.idUserLogged
      })
      this.getFavoriteInfo()
    }
  }

  async handleLike(){
    if (this.isLogged === false){
      this.toastr.warning('You must be connected to like an article');
    } else {
      await axios.post('http://localhost:3000/articleLikes', {
        articleId: this.id,
        userId: this.idUserLogged
      })
      this.getDislikedInfo()
      this.getLikedInfo()
      this.getNbDislikes()
      this.getNbLikes()
    }
  }

  async handleDislike(){
    if (this.isLogged === false){
      this.toastr.warning('You must be connected to dislike an article');
    } else {
      await axios.post('http://localhost:3000/articleDislikes', {
        articleId: this.id,
        userId: this.idUserLogged
      })
      this.getDislikedInfo()
      this.getLikedInfo()
      this.getNbDislikes()
      this.getNbLikes()
    }
  }

  handleDownload(){
    if (this.isLogged === false){
      this.toastr.warning('You must be connected to download an article');
    } else {
      // to do
    }
  }

  async createComment(){
    await axios.post('http://localhost:3000/comments', {
      commentContent: this.newComment,
      articleId: this.id,
      userId: this.idUserLogged,
      parentId : null
    })
    this.refreshComments();
    this.newComment = ''
  }

  open(content:any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      this.createComment();
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  refreshComments(){
    this.getComments();
    this.getNbComments();
  }

  async getComments(){
    this.arrayCommentsDisplayed = []
    const res = await axios.get('http://localhost:3000/comments/article/'+ this.id)
    this.arrayComments = res.data.data
    const tree = arrayToTree(this.arrayComments,{ id: "id", parentId: "parentId", childrenField: "nodes" });
    this.flattenArray(tree,0)
  }

  flattenArray(array:any[], nbPxl:number){
    array.forEach((elem:any) => {
      elem.data.pxl = nbPxl + "px"
      this.arrayCommentsDisplayed.push(elem.data)
      if(elem.nodes.length !=0){
        this.flattenArray(elem.nodes, nbPxl + 50);
      }
    })
  }
 
}