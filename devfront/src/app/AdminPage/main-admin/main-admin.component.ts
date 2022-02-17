import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-admin',
  templateUrl: './main-admin.component.html',
  styleUrls: ['./main-admin.component.scss']
})
export class MainAdminComponent implements OnInit {

  panelSelected:string = 'none'

  isLogged:boolean = false;
  idUserLogged:any = null;
  isAdmin:boolean = true;
  isModo:boolean = true;



  constructor(private router: Router) { }

  ngOnInit(): void {
    this.getLoggedInfo()
  }

  getLoggedInfo(){
    // to be change when the login is done

    if (localStorage.getItem('userId') != null){
      this.idUserLogged = JSON.parse(localStorage.getItem('userId') || '{}')
      this.isAdmin = JSON.parse(localStorage.getItem('isAdmin') || '{}')
      this.isModo = JSON.parse(localStorage.getItem('isModo') || '{}')
      this.isLogged = true;
    }
  }

  selectPanel(panel:string){
    this.panelSelected = panel
  }

  backHome(){
    this.router.navigate(['/'])
  }

}
