import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import axios from 'axios';

@Component({
  selector: 'app-search-bar',
  templateUrl: './searchBar.component.html',
  styleUrls: ['./searchBar.component.scss']
})

export class SearchComponent implements OnInit {

  searchText:String = '';
  @Output() sendSearchText = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
    
  }

  clickSearch () {
    this.sendSearchText.emit(this.searchText);
  }

 
}


