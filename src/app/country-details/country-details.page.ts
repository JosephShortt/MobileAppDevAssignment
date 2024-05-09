import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CountryService } from '../Services/country.service';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonSearchbar, IonList, IonItem, IonLabel, IonButton, IonCard, IonCardContent, IonIcon , IonCardHeader, IonCardTitle,IonGrid,IonRow,IonCol,IonButtons,IonBackButton} from '@ionic/angular/standalone'; // Adjust the import paths if necessary
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Image {
  urls: {
    small: string;
  };
  description?: string;
  alt_description?: string;
}
@Component({
  selector: 'app-country-details',
  templateUrl: './country-details.page.html',
  styleUrls: ['./country-details.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonContent, IonHeader, IonTitle, IonToolbar, IonSearchbar, IonList, IonItem, IonLabel, IonButton, IonCard, IonCardContent, IonIcon, IonCardHeader, IonCardTitle,IonGrid,IonRow,IonCol,IonButtons,IonBackButton]
})
export class CountryDetailsPage implements OnInit {
  country: any;
  weather: any; 
  landmarkImages: any[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private countryService: CountryService
  ) {}

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      const countryName = params.get('name');
      if (countryName) {
        this.countryService.getCountryDetails(countryName).subscribe(data => {
          this.country = data[0]; // Assuming the API returns an array and data contains 'maps' field
          if (this.country.capital && this.country.capital.length > 0) {
            this.loadWeather(this.country.capital[0]);
          }
          this.loadLandmarkImages(countryName);

        }, error => {
          console.error('Error fetching country details:', error);
        });
      } else {
        console.error('Country name is not available');
      }
    });
  }
  loadWeather(capital: string) {
    this.countryService.getWeatherByCapital(capital).subscribe(weatherData => {
      this.weather = weatherData;
    }, error => {
      console.error('Error fetching weather data:', error);
    });
  }
  loadLandmarkImages(countryName: string) {
    this.countryService.getLandmarkImages(countryName).subscribe(images => {
      this.landmarkImages = images.results.map((image: Image) => {
        return {
          url: image.urls.small,
          description: image.description || image.alt_description || 'No description available'
        };
      });
    }, error => {
      console.error('Error fetching landmark images:', error);
    });
  }
  
  openMap(url: string) {
    window.open(url, '_blank');
  }
}
