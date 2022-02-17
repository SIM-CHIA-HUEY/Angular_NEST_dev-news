import { Output, EventEmitter, Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import axios from 'axios';
import { ToastrService } from 'ngx-toastr';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {

  isLogged:boolean = false;
  idUserLogged:any = null;
  isLiked:boolean = false;
  isDisliked:boolean = false;

  @Input() id: any
  @Input() articleId: any
  @Input() pxl: any
  initialContent:string =''
  content: any
  nbDislikes: number = 0
  nbLikes: number = 0
  idAuthor:number = 0;
  nickName:string = '';
  dateOfComment: string ='';
  ageOfComment:String='';
  isShort:boolean = true;
  isEditMode:boolean = false
  isCommentAuthor:boolean = false;

  newComment:string = ''
  closeResult: string = '';
 
  @Output() sendRefreshComments = new EventEmitter<any>();

  constructor(private activeRoute: ActivatedRoute, private router: Router,private toastr: ToastrService,private modalService: NgbModal) { }

  async ngOnInit(): Promise<any> {
    this.getLoggedInfo ();
    await this.getCommentInfo ();
    await this.getLikedInfo();
    await this.getDislikedInfo();
    await this.getNbLikes();
    await this.getNbDislikes();

    if (this.idAuthor == this.idUserLogged) {
      this.isCommentAuthor = true;
    }

  }

  getLoggedInfo(){
    if (localStorage.getItem('userId') != null){
      this.idUserLogged = JSON.parse(localStorage.getItem('userId') || '{}')
      this.isLogged = true;
    }
  }

  async getCommentInfo (){
    const res = await axios.get('http://localhost:3000/comments/'+ this.id)
    this.content = res.data.data.commentContent
    this.initialContent = res.data.data.commentContent
    this.idAuthor = res.data.data.userId
    this.dateOfComment = res.data.data.dateOfComment.toString()
    this.calculAge()
    const res2 = await axios.get('http://localhost:3000/users/'+ this.idAuthor)
    this.nickName = res2.data.data.username
  }

  async getLikedInfo (){
    if (this.isLogged === true){
      const res = await axios.get('http://localhost:3000/commentLikes/user/'+ this.idUserLogged+ '/comment/'+this.id)
      if(res.data.res != false){
        this.isLiked = true;
      } else {
        this.isLiked = false;
      }
    }
  }

  async getDislikedInfo (){
    if (this.isLogged === true){
      const res = await axios.get('http://localhost:3000/commentDislikes/user/'+ this.idUserLogged+ '/comment/'+this.id)
      if(res.data.res != false){
        this.isDisliked = true;
      } else {
        this.isDisliked = false;
      }
    }
  }

  calculAge() {
    const today = new Date().getTime() / 1000;
    const commentAge = Date.parse(this.dateOfComment) / 1000;
    var diff = today - commentAge;
    if (diff < 0) {
      this.ageOfComment = "Not available";
    } else if (diff < 60) {
      this.ageOfComment = "less than 1 minute";
    } else if (diff < 120) {
      this.ageOfComment = "1 minute ago";
    } else if (diff < 3600) {
      this.ageOfComment = Math.floor(diff / 60) + " minutes ago";
    } else if (diff < 7200) {
      this.ageOfComment = "1 hour ago";
    } else if (diff < 86400) {
      this.ageOfComment = Math.floor(diff / 3600) + " hours ago";
    } else if (diff < 172800) {
      this.ageOfComment = "1 day ago";
    } else if (diff < 2592000) {
      this.ageOfComment = Math.floor(diff / 86400) + " days ago";
    } else if (diff < 5184000) {
      this.ageOfComment = "1 month ago";
    } else if (diff < 31536000) {
      this.ageOfComment = Math.floor(diff / 2592000) + " months ago";
    } else {
      this.ageOfComment = "more than 1 year ago";
    }
  }

  async getNbLikes(){
    const res = await axios.get('http://localhost:3000/commentLikes/count/'+ this.id)
    this.nbLikes = res.data.data[0].count;
  }

  async getNbDislikes(){
    const res = await axios.get('http://localhost:3000/commentDislikes/count/'+ this.id)
    this.nbDislikes = res.data.data[0].count;
  }

  toggleShort (){
    this.isShort = !this.isShort;
  }

  editModeMethod (){
    this.isEditMode = true;
  }

  async handleLike(){
    if (this.isLogged === false){
      this.toastr.warning('You must be connected to like an comment');
    } else {
      await axios.post('http://localhost:3000/commentLikes', {
        commentId: this.id,
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
      this.toastr.warning('You must be connected to like an comment');
    } else {
      await axios.post('http://localhost:3000/commentDislikes', {
        commentId: this.id,
        userId: this.idUserLogged
      })
      this.getDislikedInfo()
      this.getLikedInfo()
      this.getNbDislikes()
      this.getNbLikes()
  }
}

 async modifyMethod(){
   console.log(this.initialContent)
   console.log(this.content)
   if(this.initialContent != this.content) {
      await axios.patch('http://localhost:3000/comments/' + this.id, {
        commentContent: this.content,
      })
    }
    this.isEditMode = false;
    this.isShort = true;
  }

  async deleteMethod (){
    // add the emit to get all the comments
    if(confirm("Do you really want to delete this comment ?")){
      await axios.delete('http://localhost:3000/comments/'+ this.id)
      this.sendRefreshComments.emit();
    }
  }

  async createComment(){
    await axios.post('http://localhost:3000/comments', {
      commentContent: this.newComment,
      articleId: this.articleId,
      userId: this.idUserLogged,
      parentId : this.id
    })
    this.sendRefreshComments.emit();
    this.newComment = ''
  }

  open(content:any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result:any) => {
      this.closeResult = `Closed with: ${result}`;
      this.createComment();
    }, (reason: any) => {
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

}
