import { Component, OnInit } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {

  isExpandable: boolean = false;
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;
  
  FirstName :string = JSON.parse((localStorage.getItem('FundooNotes'))!).FirstName;
  LastName :string = JSON.parse((localStorage.getItem('FundooNotes'))!).LastName;
  Email :string= JSON.parse((localStorage.getItem('FundooNotes'))!).Email;
  


  constructor(
    changeDetectorRef: ChangeDetectorRef,
     media: MediaMatcher,
     private routers: Router
     ){

      this.mobileQuery = media.matchMedia('(max-width: 600px)');
      this._mobileQueryListener = () => changeDetectorRef.detectChanges();
      
   }
   
  ngOnInit(): void {
  }

  logout() {
    
    //localStorage.clear();
    this.routers.navigateByUrl('login');
  }

}
