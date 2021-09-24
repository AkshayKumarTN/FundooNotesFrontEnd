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
      Color : data.color,
      reminder : data.reminder
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
    let params = {
      NoteId: noteId,
      Color: Color
    };

    return this.httpService.put(`${environment.baseUrl}/api/NoteColor`,params,true,this.header);
  }

  DeleteNote(token: any,data: any) {
    this.getToken()
    console.log(this.header);
    return this.httpService.delete(`${environment.baseUrl}/api/NoteTrash?noteId=${data.noteId}`,null,true,this.header);
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

  AddReminder(token: any,noteId: any,remider : string) {
    this.getToken()
    console.log(this.header);
    return this.httpService.put(`${environment.baseUrl}/api/SetReminder?noteId=${noteId}&reminder=${remider}`,null,true,this.header);
  }

  //// RemainderNotes

  GetAllRemainderNotes(token: any,data: any) {
    let params = {
      UserId: this.user.key,
    };
    this.getToken()
    console.log(this.header);
    return this.httpService.put(`${environment.baseUrl}/api/ReminderNotes?UserId=${this.user.key}`,null,true,this.header);
  }

  RemoveReminder(token: any,data: any) {
    this.getToken()
    console.log(this.header);
    return this.httpService.put(`${environment.baseUrl}/api/DeleteReminder?noteId=${data.noteId}`,null,true,this.header);
  }


  //// TrashNotes

  GetAllTrashNotes(token: any,data: any) {
    let params = {
      UserId: this.user.key,
    };
    this.getToken()
    console.log(this.header);
    return this.httpService.put(`${environment.baseUrl}/api/TrashNotes?UserId=${this.user.key}`,null,true,this.header);
  }

  DeleteNoteForever(token: any,data: any) {
    this.getToken()
    console.log(this.header);
    return this.httpService.delete(`${environment.baseUrl}/api/Note?noteId=${data.noteId}`,null,true,this.header);
  }

  RestoreNote(token: any,data: any) {
    this.getToken()
    console.log(this.header);
    return this.httpService.put(`${environment.baseUrl}/api/RestoreNote?noteId=${data.noteId}`,null,true,this.header);
  }





  getToken(){
    this.header = {
      headers: {Authorization: "Bearer " + this.user.Token}
    }
  }
  
  

  
}
