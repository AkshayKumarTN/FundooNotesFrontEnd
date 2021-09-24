import { Component, OnInit } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { NotesServiceService } from 'src/app/Services/NotesService/notes-service.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {

  isExpandable: boolean = false;
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;
  token: any;
  labels: any = [];
  
  FirstName :string = JSON.parse((localStorage.getItem('FundooNotes'))!).FirstName;
  LastName :string = JSON.parse((localStorage.getItem('FundooNotes'))!).LastName;
  Email :string= JSON.parse((localStorage.getItem('FundooNotes'))!).Email;
  


  constructor(
    changeDetectorRef: ChangeDetectorRef,
    private noteService: NotesServiceService,
     media: MediaMatcher,
     private routers: Router
     ){

      this.mobileQuery = media.matchMedia('(max-width: 600px)');
      this._mobileQueryListener = () => changeDetectorRef.detectChanges();
      
   }
   
  ngOnInit(): void {
    this.GetAllLabels();
  }

  GetAllLabels() {
    this.noteService.GetAllLabels(this.token, "data").subscribe((response: any) => {
      console.log(response);
      console.log("Labels");
      let labelsArr = response.data;
      console.log(labelsArr);
      this.labels= labelsArr;      
      console.log(this.labels);
    })
  
  }

  logout() {
    
    //localStorage.clear();
    this.routers.navigateByUrl('login');
  }

}
