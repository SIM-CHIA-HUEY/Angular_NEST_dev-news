import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { AnyMxRecord } from 'dns'

@Component({
  selector: 'app-admin-tags',
  templateUrl: './admin-tags.component.html',
  styleUrls: ['./admin-tags.component.scss']
})
export class AdminTagsComponent implements OnInit {

  newTag:string = '';
  arrayTags:any

  constructor() { }

  async ngOnInit(): Promise <any> {
    await this.getArrayTags();
  }

  async createNewTag(){
    await axios.post('http://localhost:3000/tags/', {
      tagTitle: this.newTag,
      
    })
    this.newTag =''
    this.getArrayTags()
  }

  async getArrayTags (){
    const res = await axios.get('http://localhost:3000/tags/')
    this.arrayTags = res.data
  }

  async updateTag(  id:any,newTitle:any){
    await axios.patch('http://localhost:3000/tags/'+ id, {
      tagTitle: newTitle,
    })
    this.getArrayTags()
  }

 async deleteTag(id:any){
    await axios.delete('http://localhost:3000/tags/' + id),
    this.getArrayTags()
  }

}
