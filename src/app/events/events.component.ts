import {Component, Inject} from "@angular/core";
import {ReqresService} from "../services/reqres.service";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Component({
  selector: 'events-page',
  templateUrl: './events.component.html'
})

export class EventsComponent{
  listOfEvents: UpComingEvent[] = [];
  url = 'https://lijitapi.azurewebsites.net/weatherforecast';
  WeatherEntries1: Weather[] = [];
  WeatherEntries2: Weather[] = [];
  firstEntry: Weather | undefined;
  firstEntryUpcomingEvents: UpComingEvent | undefined;
  allowNewEvent = false;
  newEventWanted = false;
  eventName = '';
  eventNote = '';
  eventAddress1 = '';
  eventAddress2 = '';
  eventDescription = '';
  eventStartDate: Date | undefined;
  eventEndDate: Date | undefined;
  eventLocation = '';
  eventPhone = '';
  eventEmail = '';
  eventShareLink = '';
  eventOrganizer = '';

  //private http: HttpClient;
  //constructor(http: HttpClient, @Inject('https://lijitapi.azurewebsites.net/weatherforecast') baseUrl: string) {
  constructor(private reqresService: ReqresService) {

  }
  async getWeather(){
      (await this.reqresService.getWeather()).subscribe((res) => {
        alert('Results are here');
        for(let j = 0; j < res.length; j++) {
          this.firstEntry = {
            date: (res[j] as any).date,
            temperatureC: (res[j] as any).temperatureC,
            summary: (res[j] as any).summary
          }
          this.WeatherEntries1.push(this.firstEntry);
        }
    });
  }
  async getUpcomingEvents(){
    (await this.reqresService.getUpcomingEvents()).subscribe((res) => {
      for(let j = 0; j < res.length; j++) {
        this.firstEntryUpcomingEvents = {
          id: (res[j] as any).id,
          name: (res[j] as any).name,
          note: (res[j] as any).note,
          address: (res[j] as any).address,
          address2: (res[j] as any).address2,
          description: (res[j] as any).description,
          startDate: (res[j] as any).startDate,
          endDate: (res[j] as any).endDate,
          imageEvent: (res[j] as any).imageEvent,
          location: (res[j] as any).location,
          phone: (res[j] as any).phone,
          email: (res[j] as any).email,
          shareLink: (res[j] as any).shareLink,
          organizer: (res[j] as any).organizer
        }
        this.listOfEvents.push(this.firstEntryUpcomingEvents);
      }
    });
  }

  async setUpcomingEvent(newEvent: UpComingEvent){
    (await this.reqresService.setUpcomingEvent(newEvent));
  }
  onShowAllEvents(){
    this.newEventWanted = false;
    this.listOfEvents = [];
    alert('Button is clicked');
    this.getWeather();
  }
  onShowUpcomingEvents(){
    this.newEventWanted = false;
    this.WeatherEntries1 = [];
    this.getUpcomingEvents();
  }
  onAddEvent(){
    this.listOfEvents = [];
    this.WeatherEntries1 = [];
    this.newEventWanted = true;
  }
  onSubmitNewEvent(){
    if(this.eventName!=='' && this.eventNote!=='' && this.eventEmail!=='' && this.eventPhone!=='' && this.eventAddress1!=='' &&
      this.eventDescription!=='' && this.eventOrganizer!=='' && this.eventEndDate!==undefined && this.eventStartDate!==undefined && this.eventShareLink!=='' &&
      this.eventLocation!==''){
      this.firstEntryUpcomingEvents = {
        id: 0,
        name: this.eventName,
        note: this.eventNote,
        address: this.eventAddress1,
        address2: this.eventAddress2,
        description: this.eventDescription,
        startDate: this.eventStartDate,
        endDate: this.eventEndDate,
        imageEvent: '',
        location: this.eventLocation,
        phone: this.eventPhone,
        email: this.eventEmail,
        shareLink: this.eventShareLink,
        organizer: this.eventOrganizer
      }
      this.setUpcomingEvent(this.firstEntryUpcomingEvents);
    }else {
      alert("All mandatory fields are not filled yet!");
    }
  }

}
export interface Weather {
  date: Date;
  temperatureC: number;
  //temperatureF: number;
  summary: string;
}
export interface UpComingEvent {
  id: number;
  name: string;
  note: string;
  address: string;
  address2: string;
  description: string;
  startDate: Date;
  endDate: Date;
  location: string;
  imageEvent: string;
  phone: string;
  email: string;
  shareLink: string;
  organizer: string;
}
