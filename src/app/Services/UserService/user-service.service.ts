import { Injectable } from '@angular/core';
import { HttpServiceService } from '../HttpService/http-service.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor(
    private httpService: HttpServiceService
  ) { }


  Register(data:any){
    const params = {
      FirstName : data.FirstName,
      LastName : data.LastName,
      Email : data.Email,
      Password : data.Password
    }
    return this.httpService.post(`${environment.baseUrl}/api/User/Register`, params);
  }

  UpdatePassword(Email:string,data:any){
    const params = {
      Email : Email,
      NewPassword : data.Password,
      ConfirmNewPassword : data.ConfirmPassword
    }
    return this.httpService.put(`${environment.baseUrl}/api/User/ResetPassword`, params);
  }
  Login(data:any){
    const params = {
      Email : data.Email,
      Password : data.Password
    }
    return this.httpService.post(`${environment.baseUrl}/api/User/Login`, params);
  }
  Next(data:any){
    const params = {
      Email : data.Email
    }
    return this.httpService.post(`${environment.baseUrl}/api/User/ForgotPassword?Email=${data.Email}`);
  }

}
