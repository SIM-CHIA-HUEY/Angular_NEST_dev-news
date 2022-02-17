import { Component, OnInit, NgModule, Output, EventEmitter} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import axios from 'axios';
import {FormControl} from '@angular/forms';
import { MatChip } from '@angular/material/chips';
import { ToastrService } from 'ngx-toastr';
import { TagsSidebarComponent } from '../MainPage/tags-sidebar/tags-sidebar.component';
import {CdkTextareaAutosize} from '@angular/cdk/text-field';
import { DatePipe } from '@angular/common'

@Component({
  selector: 'app-create-new-article',
  templateUrl: './create-new-article.component.html',
  styleUrls: ['./create-new-article.component.scss']
})
export class CreateNewArticleComponent implements OnInit {
  userId:any;
  articleId:number=0;
  articleDetails:any;
  // @Output() sendArticleSynopsis  = new EventEmitter<any>();
  articleSynopsis:string=''
  // @Output() sendArticleTitle  = new EventEmitter<any>();
  articleTitle:string=''
  arrayOfTags:Array<{tagId: number, tagName: string, isSelected: boolean}> = [];
  city:string = "Rennes"
  selectedTagsId:Array<any> = [];
  originalTagsId:Array<any> = [];
  arrayOfId:Array<{id: number, tagId: number}> = [];
  fileName:any
  fileToUpload: File | null = null;
  filePath: string = '';
  filefetch:any;
  sanitizer:any;
  testURL:any;

  constructor( 
    private route: ActivatedRoute,
    private toastr: ToastrService,
    public datepipe: DatePipe
  ) { }

  async ngOnInit(): Promise<void> {

    this.userId = JSON.parse(localStorage.getItem('userId') || '{}');
    this.getLocation()
   
    let fetchTagList = await axios.get('http://localhost:3000/tags')
    fetchTagList.data.map( (item: { id: number; tagTitle: string; }) => {
    this.arrayOfTags.push({"tagId": item.id, "tagName": item.tagTitle, "isSelected": false});
    })
  }

  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        try {
          const latt = position.coords.latitude;
          const lngg = position.coords.longitude;
          let url = 'https://api-adresse.data.gouv.fr/reverse/?lon=' + lngg + '&lat=' + latt
          fetch(url)
            .then(response => response.json())
            .then(data => {
              console.log(data.features[0].properties.city);
              this.city = data.features[0].properties.city;
            })
        } catch (err) {
          console.error(err);
        }
      });
    } else {
      window.alert("Geolocation is not supported by this browser.")
    }
  }

  onFileSelected(event: any) {
    this.fileToUpload = event.target.files[0];
    if (this.fileToUpload) {
      this.uploadFile(this.fileToUpload)
    }
  }

  async uploadFile(file: File) {
    let blob = new Blob([file], { type: 'application/pdf' });
    let formData = new FormData();
    formData.append('uploaded_file', blob, file.name);

    await fetch('http://localhost:3000/upload', {
        method: 'POST',
        body: formData,
      })
      .then(res => res.json())
      .then(data => {
        console.log(data)
        this.fileName = data.filename
      })
    }

  onSelectFile(e: any) {
    this.fileToUpload = e.target.files[0];

  }

  toggleSelection(chip: MatChip) {
    chip.toggleSelected();
      if (chip.selected){
        this.selectedTagsId.push(chip.value)
      } else {
        this.selectedTagsId.splice(this.selectedTagsId.indexOf(chip.value), 1)
      }
  }

  async postArticle() {
    if(window.confirm('Are sure you want to publish this article ?')){

      if(this.selectedTagsId.length === 0) {
        this.toastr.warning('No tag selected', 'Please select at least one tag', {positionClass: "toast-center-full-width"});
      } else {
        
        var today = new Date()
        var latest_date = this.datepipe.transform(today, 'yyyy-MM-dd');
        // var date = today.getFullYear() + '-' + (today.getMonth()) + '-' + today.getDate();
        console.log(latest_date)
        // console.log(date)

        const newArticle = await axios.post('http://localhost:3000/articles', { 
          "articleTitle": this.articleTitle,
          "articleSynopsis": this.articleSynopsis,
          "isValidated": false,
          "file": this.fileName,
          "location": this.city,
          "date": latest_date,
          "userId": this.userId
        });
        console.log(newArticle)
        this.selectedTagsId.map(async (tag) => {
          await axios.post('http://localhost:3000/articlesTags', { 
          "articleId": newArticle.data.id,
          "tagId": tag
          })
        })

        this.toastr.success('Article published', 'Well done!');
      }
      
      
     }
  }

}
