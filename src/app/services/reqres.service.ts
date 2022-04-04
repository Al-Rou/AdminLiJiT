import { Injectable } from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {Weather, UpComingEvent} from "../events/events.component";
import {catchError, retry} from "rxjs/operators";
import {JwtService} from "./jwt.service";

@Injectable({
  providedIn: 'root'
})

export class ReqresService{
  //private urlWeather = 'http://localhost:37432/weatherforecast';
  private urlWeather = 'https://lijitapi.azurewebsites.net/weatherforecast';
  private urlUpcomingEvents = 'https://lijitapi.azurewebsites.net/Events/Upcoming';
  //private urlUpcomingEvents = 'http://localhost:37432/Events/Upcoming';
  private urlToCreateNewEvent = 'https:';
  //The token is
  // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyTmFtZSI6IkxpSmlUIiwibmJmIjoxNjQ4OTUxMTE3LCJleHAiOjE2NDg5NjkxMTcsImlhdCI6MTY0ODk1MTExN30.RJLno05oGs0v3mLpE_Pcn4wjk6DtUiwSwKwahlDu60U
  // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyTmFtZSI6IkxpSmlUIiwibmJmIjoxNjQ5MDAzMzMyLCJleHAiOjE2NDkwMjEzMzIsImlhdCI6MTY0OTAwMzMzMn0.W5mKWup5mQiO5V2bczOvyZlYC2TlRpDjoLJL8kc0fV4
  tokenValue = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyTmFtZSI6IkxpSmlUIiwibmJmIjoxNjQ5MDAzMzMyLCJleHAiOjE2NDkwMjEzMzIsImlhdCI6MTY0OTAwMzMzMn0.W5mKWup5mQiO5V2bczOvyZlYC2TlRpDjoLJL8kc0fV4';

  constructor(private http: HttpClient) {

  }
  async getWeather(): Promise<Observable<Weather[]>> {
    const headerDict = {
      'Content-Type': 'application/json',
    };
    const requestOptions = {
      headers: new HttpHeaders(headerDict)
    };
    alert('ReqresService is called');
    return this.http.get<Weather[]>(this.urlWeather, requestOptions);
  }

  async getUpcomingEvents(): Promise<Observable<UpComingEvent[]>> {
    const headerDict = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+ this.tokenValue,
    };
    const requestOptions = {
      headers: new HttpHeaders(headerDict)
    };
    return this.http.get<UpComingEvent[]>(this.urlUpcomingEvents, requestOptions);
  }

  async setUpcomingEvent(newEvent: UpComingEvent){
    const headerDict = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+ this.tokenValue,
    };
    const requestOptions = {
      headers: new HttpHeaders(headerDict)
    };
    const requestBody = {
      id: 0,
      name: newEvent.name,
      note: newEvent.note,
      address: newEvent.address,
      address2: newEvent.address2,
      description: newEvent.description,
      startDate: newEvent.startDate,
      endDate: newEvent.endDate,
      imageEvent: newEvent.imageEvent,
      location: newEvent.location,
      phone: newEvent.phone,
      email: newEvent.email,
      shareLink: newEvent.shareLink,
      organizer: newEvent.organizer
    }
    alert("this is post in ReqresService!");
    this.http.post<UpComingEvent>(this.urlToCreateNewEvent, requestBody, requestOptions).subscribe(res =>{
      alert('The event is successfully stored!');
    });
  }

}
