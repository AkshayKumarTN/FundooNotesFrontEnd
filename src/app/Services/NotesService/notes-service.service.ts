import { Injectable } from '@angular/core';
import { HttpServiceService } from '../HttpService/http-service.service';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class NotesServiceService {

  user = JSON.parse(localStorage.getItem('FundooNotes')!);
  header:any='';

  constructor(
    private httpService: HttpServiceService
  ) { }

  createNote(token: any, data: any) {
    let params = {
      Title: data.Title,
      Description: data.Description,
      UserId: this.user.key,
    };
    this.getToken()
    console.log(this.header);
    return this.httpService.post(`${environment.baseUrl}/api/NewNote`, params,true,this.header);

  }

  getToken(){
    this.header = {
      headers: {Authorization: "Bearer " + this.user.Token}
    }
  }
  

  
}
