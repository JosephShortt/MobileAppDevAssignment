import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonSearchbar, IonList, IonItem, IonLabel, IonButton, IonCard, IonCardContent, IonIcon , IonCardHeader, IonCardTitle,IonGrid
,IonRow,IonCol,IonInput, IonTextarea,IonButtons,IonBackButton, IonSelectOption, IonDatetime} from '@ionic/angular/standalone';
interface BookingForm {
  destination: string;
  travelDate: string;
  duration: string;
  rooms: string;
  adults: string;
}

@Component({
  selector: 'app-booking',
  templateUrl: './booking.page.html',
  styleUrls: ['./booking.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonContent, IonHeader, IonTitle, IonToolbar, IonSearchbar, IonList, IonItem, IonLabel, IonButton, IonCard, IonCardContent, IonIcon, IonCardHeader, IonCardTitle,IonGrid,IonRow,IonCol,IonInput, IonDatetime, IonTextarea,IonButtons,IonBackButton, IonSelectOption]
})
export class BookingPage implements OnInit {

  form: BookingForm = {
    destination: '',
    travelDate: '',
    duration: '',
    rooms: '',
    adults: ''
  };

  destinations = [
    { name: 'France', id: '2842' },
    { name: 'Spain', id: '987' },
    { name: 'Italy', id: '834' },
    { name: 'Greece', id: '547' },
    { name: 'Portugal', id: '917' },
    { name: 'United States', id: '1103' },
    { name: 'Thailand', id: '273' },
    { name: 'Canary Islands', id: '474' },
    { name: 'Canada', id: '2959' },
    { name: 'Mexico', id: '1092' },
    { name: 'Japan', id: '5396' },
    { name: 'Morocco', id: '251' },
    { name: 'Germany', id: '729' },
    { name: 'United Kingdom', id: '1928' },
    { name: 'Belgium', id: '2778' }
  ];

  departureAirport = 'DUB'; // Constant for Dublin airport

  constructor() { }

  minDate: string='';

  ngOnInit() {
    const today = new Date();
    const twoDaysLater = new Date(today.setDate(today.getDate() + 2)); // Calculate two days from today
  
    this.minDate = twoDaysLater.toISOString().split('T')[0]; // Set minimum date as two days later
  
    // Also initialize form.travelDate to this minimum date
    this.form.travelDate = this.minDate;
  }
  

  handleDateChange(event: any) {
    const value = event.detail.value; // Accessing the date value from the event object
    this.updateField('travelDate', value ? new Date(value).toISOString().split('T')[0] : '');
  }
  updateField(field: keyof BookingForm, value: string) {
    this.form[field] = value;
  }
  /*
  redirectToLoveHolidays() {
    if (this.form.destination && this.form.travelDate && this.form.duration && this.form.rooms && this.form.adults) {
      // Construct URL with parameters in the exact order as required
      const url = `https://www.loveholidays.ie/holidays/?destinationIds=${this.form.destination}&departureAirports=DUB&nights=${this.form.duration}&rooms=${this.form.rooms}&date=${this.form.travelDate}&flexibility=0`;
      window.open(url, '_blank');
    } else {
      console.error('Form is incomplete:', this.form);
    }
  }
  */

  redirectToLoveHolidays() {
    if (this.form.destination && this.form.travelDate && this.form.duration && this.form.rooms && this.form.adults) {
      // Constructing the URL with parameters in the exact specified order
      const url = `https://www.loveholidays.ie/holidays/?destinationIds=${this.form.destination}&departureAirports=${this.departureAirport}&nights=${this.form.duration}&rooms=${this.form.rooms}&date=${this.form.travelDate}&flexibility=0`;
      window.open(url, '_blank');
    } else {
      console.error('Form is incomplete:', this.form);
    }
  }
  
}
