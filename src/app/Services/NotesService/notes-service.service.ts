import { Injectable } from '@angular/core';
import { HttpServiceService } from '../HttpService/http-service.service';
import { environment } from 'src/environments/environment';
import { HttpParams } from '@angular/common/http';


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
      Archieve : data.archive,
      UserId: this.user.key,
      Color : data.color
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

  AarchiveNote(token: any,data: any) {
    this.getToken()
    console.log(this.header);
    return this.httpService.put(`${environment.baseUrl}/api/Archive?noteId=${data.noteId}`,null,true,this.header);
  }
  UnAarchiveNote(token: any,data: any) {
    this.getToken()
    console.log(this.header);
    return this.httpService.put(`${environment.baseUrl}/api/UnArchive?noteId=${data.noteId}`,null,true,this.header);
  }

  ChangeColor(token: any,noteId: any,Color : string) {
    this.getToken()
    console.log(noteId);
    console.log(Color);
    console.log(this.header);
    let params = new HttpParams()
        .set('NoteId',noteId)
        .set('Color',Color);

    return this.httpService.put(`${environment.baseUrl}/api/NoteColor?noteId=${noteId}&color=${Color}`,null,true,this.header);
  }


  /// ArchiveNotes

  GetAllArchiveNotes(token: any,data: any) {
    let params = {
      UserId: this.user.key,
    };
    this.getToken()
    console.log(this.header);
    return this.httpService.put(`${environment.baseUrl}/api/ArchiveNotes?UserId=${this.user.key}`,null,true,this.header);
  }





  getToken(){
    this.header = {
      headers: {Authorization: "Bearer " + this.user.Token}
    }
  }
  
  

  
}
