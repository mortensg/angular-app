import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { PassengersResult } from 'src/app/models/passengers.model';
import { PassengerService } from 'src/app/services/passenger/passenger.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  currentPage: number = 0;
  dataSize: number = 10;
  users$:Observable<PassengersResult> = this.getUsers();

  constructor(private passengerService: PassengerService) {
  }

  getUsers() {
    return this.passengerService.getPassengers(this.currentPage, this.dataSize);
  }

  nextPage() {
    this.currentPage++;
    this.users$ = this.getUsers();
  }
  
  prevPage() {
    this.currentPage--;
    this.users$ = this.getUsers();
  }

  firstPage() {
    this.currentPage = 0;
    this.users$ = this.getUsers();
  }

  lastPage(value: number) {
    this.currentPage = value;
    this.users$ = this.getUsers();
  }

  changeDataSize(value: number) {
    this.dataSize = value;
    this.users$ = this.getUsers();
  }
}
