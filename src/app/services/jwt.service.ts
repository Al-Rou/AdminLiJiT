import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
//import { Token } from '../token';
//import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  private apiURL = "https://lijitapi.azurewebsites.net/AuthenManagement/Login/"

  constructor(private http : HttpClient, public storage: Storage) {
    this.ngOnInit();
  }

  async ngOnInit() {
    // @ts-ignore
    await this.storage.create();
  }

  getToken(){
    let requestOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,HEAD,OPTIONS,POST,PUT',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization'
      })
    };

    let requestBody = {
      "UserName":"LiJiT",
      "Password":"1234"
    }

    // @ts-ignore
    //this.http.post<Token>(this.apiURL, requestBody,
      //requestOptions)
      //.subscribe(jwtResponse =>
        //sessionStorage.setItem("Token", jwtResponse.token));
  }
}
export interface Token {
  token?: String;
  refreshToken?: String;
}
