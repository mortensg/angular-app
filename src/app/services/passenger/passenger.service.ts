import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PassengersResult } from 'src/app/models/passengers.model';

@Injectable({
  providedIn: 'root'
})
export class PassengerService {

  constructor(private http:HttpClient) { }

  getPassengers(page:number, size:number): Observable<PassengersResult> {
    return this.http.get<PassengersResult>(`https://api.instantwebtools.net/v1/passenger?page=${page}&size=${size}`);
  }
}
