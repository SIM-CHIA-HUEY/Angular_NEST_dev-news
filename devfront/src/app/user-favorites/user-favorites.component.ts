import { Component, OnInit } from '@angular/core';
import { MatChip } from '@angular/material/chips';
import axios from 'axios';

@Component({
  selector: 'app-user-favorites',
  templateUrl: './user-favorites.component.html',
  styleUrls: ['./user-favorites.component.scss']
})
export class UserFavoritesComponent implements OnInit {
  // arrayArticles:[] | undefined
  arrayFavorites:[] | undefined
  arrayOfTags:Array<{tagId: number, tagName: string, isSelected: boolean}> = [];
  arrayOfId:Array<{id: number, tagId: number}> = [];
  originalTagsId:Array<any> = [];
  selectedTagsId:Array<any> = [];
  userId:any

  constructor() { }

  async ngOnInit(): Promise<void> {
    this.userId = JSON.parse(localStorage.getItem('userId') || '{}');
    // let fetch = await axios.get('http://localhost:3000/articles/user/'+ this.userId)
    // this.arrayArticles = fetch.data.res

    let fetch2 = await axios.get('http://localhost:3000/favorites/user/'+ this.userId)
    this.arrayFavorites = fetch2.data.res

    fetch('http://localhost:3000/tagUsers')
    .then(res => res.json())
    .then(data => {
      data.map((item: { id: number; tagId: number; userId: number; }) => {
        if(item.userId === this.userId) {
          this.selectedTagsId.push(item.tagId)
          this.originalTagsId.push(item.tagId) 
          this.arrayOfId.push({"id": item.id, "tagId": item.tagId})
        }
        
      })
    });

    let fetchTagList = await axios.get('http://localhost:3000/tags')
    fetchTagList.data.map( (item: { id: number; tagTitle: string; }) => {
      if (this.selectedTagsId.indexOf(item.id) > -1) {
        this.arrayOfTags.push({"tagId": item.id, "tagName": item.tagTitle, "isSelected": true});
      } else {
        this.arrayOfTags.push({"tagId": item.id, "tagName": item.tagTitle, "isSelected": false});
      }
    })

  }

  deleteArticle() {
    if(window.confirm('Are sure you want to remove this article from your favorites ?')){
      console.log("favorites removed")
     }
  }

  removeFavorite() {
    if(window.confirm('Are sure you want to remove this article from your favorites ?')){
      console.log("favorites removed")
     }
  }

  toggleSelection(chip: MatChip) {
    chip.toggleSelected();
      if (chip.selected){
        this.selectedTagsId.push(chip.value)
      } else {
        this.selectedTagsId.splice(this.selectedTagsId.indexOf(chip.value), 1)
      }
  }
  

}
