import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import {animate, state, style, transition, trigger} from '@angular/animations';


@Component({
  selector: 'app-admin-comments',
  templateUrl: './admin-comments.component.html',
  styleUrls: ['./admin-comments.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})



export class AdminCommentsComponent implements OnInit {
  arrayComments:any = []

  columnsToDisplay = ['id', 'commentContent', 'articleId', 'userId', 'dateOfComment', 'parentId'];
  expandedElement: Comment | null | undefined;

  constructor() { }

  ngOnInit(): void {
    this.getArrayComments();
  }

  async deleteComment(id:any){
    await axios.delete('http://localhost:3000/comments/' + id),
    this.getArrayComments()
  }

  async getArrayComments (){
    const res = await axios.get('http://localhost:3000/comments/')
    this.arrayComments = res.data
  }

  async updateComment(id:any,newComment:any){
    await axios.patch('http://localhost:3000/comments/'+id, {
      commentContent: newComment,
    })
    this.getArrayComments()
  }

}


export interface Comment {
  name: string;
  position: number;
  weight: number;
  symbol: string;
  description: string;
}