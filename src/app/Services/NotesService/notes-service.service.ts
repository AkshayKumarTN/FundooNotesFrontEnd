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
      Pin : data.pin,
      UserId: this.user.key,
    };
    this.getToken()
    console.log(this.header);
    return this.httpService.post(`${environment.baseUrl}/api/NewNote`, params,true,this.header);

  }

  GetAllUnPinNotes(token: any,data: any) {
    let params = {
      UserId: this.user.key,
    };
    this.getToken()
    console.log(this.header);
    return this.httpService.put(`${environment.baseUrl}/api/UnPinnedNotes?UserId=${this.user.key}`,null,true,this.header);
  }
  GetAllPinNotes(token: any,data: any) {
    let params = {
      UserId: this.user.key,
    };
    this.getToken()
    console.log(this.header);
    return this.httpService.put(`${environment.baseUrl}/api/PinnedNotes?UserId=${this.user.key}`,null,true,this.header);
  }

  UnPinNote(token: any,data: any) {
    this.getToken()
    console.log(this.header);
    return this.httpService.put(`${environment.baseUrl}/api/UnPinNote?noteId=${data.noteId}`,null,true,this.header);
  }

  PinNote(token: any,data: any) {
    this.getToken()
    console.log(this.header);
    return this.httpService.put(`${environment.baseUrl}/api/PinNote?noteId=${data.noteId}`,null,true,this.header);
  }



  getToken(){
    this.header = {
      headers: {Authorization: "Bearer " + this.user.Token}
    }
  }
  
  

  
}
