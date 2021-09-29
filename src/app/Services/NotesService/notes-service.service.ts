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

  /// Labels

  GetAllLabels(token: any,data: any) {
    let params = {
      UserId: this.user.key,
    };
    this.getToken()
    console.log(this.header);
    return this.httpService.get(`${environment.baseUrl}/api/LabelName?UserId=${this.user.key}`,null,true,this.header);
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

  AddImage(noteId:any,file:any)
  { 
    console.log(file);
    var data = new FormData();
    data.append("image",file);
    console.log(data);
      this.getToken();
      return this.httpService.put(`${environment.baseUrl}/addImage?noteId=${noteId}`,data,true,this.header); 
      
  }

  /// UpdateNote

  UpdateNote(token: any,note: any) {
    this.getToken()
    console.log(this.header);
    return this.httpService.put(`${environment.baseUrl}/api/UpdateNote`,note,true,this.header);
  }

  /// Collaborator

  GetAllCollaborator(token: any,data: any) {
    this.getToken()
    console.log(this.header);
    return this.httpService.get(`${environment.baseUrl}/api/Collaborator?noteId=${data}`,null,true,this.header);
  }


  AddCollaborator(token: any,collaboraters: any) {
    this.getToken()
    console.log(collaboraters.receiverEmail);
    console.log(this.header);
    return this.httpService.post(`${environment.baseUrl}/api/Collaborator`,collaboraters,true,this.header);
  }

  RemoveCollaborator(token: any,data: any) {
    this.getToken()
    console.log(this.header);
    return this.httpService.delete(`${environment.baseUrl}/api/Collaborator?CollaboratorId=${data}`,null,true,this.header);
  }

  /// Label

  AddLabelToNote(token: any,data: any) {
    console.log("AddLabel");
    console.log(data);

    this.getToken()
    console.log(this.header);
    return this.httpService.post(`${environment.baseUrl}/api/Label`,data,true,this.header);
  }





  getToken(){
    this.header = {
      headers: {Authorization: "Bearer " + this.user.Token}
    }
  }
  
  

  
}
