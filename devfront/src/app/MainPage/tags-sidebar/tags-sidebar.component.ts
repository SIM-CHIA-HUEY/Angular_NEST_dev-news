import { Output, EventEmitter, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tags-sidebar',
  templateUrl: './tags-sidebar.component.html',
  styleUrls: ['./tags-sidebar.component.scss']
})
export class TagsSidebarComponent implements OnInit {
  arrayOfTags: Array<{tagId: number, tagName: string, className: string}> = [];
  selectedTags:Array<string> = [];
  selectedTagsId:Array<any> = [];
  userId:any;
  @Output() sendSelectedTags = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
    // localStorage.setItem("userId", "3"); // to be deleted
    this.userId = JSON.parse(localStorage.getItem('userId') || '{}');

    fetch('http://localhost:3000/tagUsers')
    .then(res => res.json())
    .then(data => {
      
      data.map((item: { tagId: number; userId: number; }) => {
        if(this.userId == item.userId) {
          this.selectedTagsId.push(item.tagId)
        }
        
      })
    });

    fetch('http://localhost:3000/tags')
    .then(res => res.json())
    .then(data => {
      data.map( (item: { id: number; tagTitle: string; }) => {
        if (this.selectedTagsId.indexOf(item.id) > -1) {
          this.arrayOfTags.push({"tagId": item.id, "tagName": item.tagTitle, "className": "isSelected"});
        } else {
          this.arrayOfTags.push({"tagId": item.id, "tagName": item.tagTitle, "className": ""});
        }
      })
    });
    
    this.sendSelectedTags.emit(this.selectedTagsId);
  }

  async getTagId(tagName:string) {

    let tagId;
    const Promess = await fetch('http://localhost:3000/tags/')
      .then(res => res.json())
      .then(data => {
        data.map((item: { tagTitle: string; id: any; }) => {
          if(item.tagTitle === tagName) {
            tagId = item.id
          } 
        })
      })
    return tagId
  }

  async tagSelected(tag:any) {
    
    let TagId = await this.getTagId(tag.target.innerText)
    if (tag.target.className.includes("isSelected")) {
      tag.target.className = ""
      this.selectedTags.splice(this.selectedTags.indexOf(tag.target.innerText), 1)
      this.selectedTagsId.splice(this.selectedTagsId.indexOf(TagId), 1)
    } else {
      tag.target.className = "isSelected"
      this.selectedTags.push(tag.target.innerText)
      this.selectedTagsId.push(TagId)
    }
    console.log(this.selectedTagsId)
    
    this.sendSelectedTags.emit(this.selectedTagsId);
  }



}
