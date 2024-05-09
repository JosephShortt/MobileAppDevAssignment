import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CountryService } from '../Services/country.service';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonSearchbar, IonList, IonItem, IonLabel, IonButton, IonCard, IonCardContent, IonIcon , IonCardHeader, IonCardTitle,IonGrid,IonRow,IonCol,IonButtons,IonBackButton} from '@ionic/angular/standalone'; // Adjust the import paths if necessary
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Geolocation } from '@capacitor/geolocation';

//Interface for image objects that allows them to have descriptions
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
    // Variables to store country details, weather data, and landmark images
  country: any;
  weather: any; 
  landmarkImages: any[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private countryService: CountryService
  ) {}

  ngOnInit() {
        // Subscribe to route paramMap to get country name from URL
    this.activatedRoute.paramMap.subscribe(params => {
      const countryName = params.get('name');
      //If the country name exists, call country service to get country details
      if (countryName) {
        this.countryService.getCountryDetails(countryName).subscribe(data => {
          this.country = data[0];
          //Load weather data for capital 
          if (this.country.capital && this.country.capital.length > 0) {
            this.loadWeather(this.country.capital[0]);
          }
          //Load landmark images fo0r country
          this.loadLandmarkImages(countryName);
        //Handle errors
        }, error => {
          console.error('Error fetching country details:', error);
        });
      } else {
        console.error('Country name is not available');
      }
    });
  }

    // Method to load weather data for a given capital
  loadWeather(capital: string) {
    this.countryService.getWeatherByCapital(capital).subscribe(weatherData => {
      this.weather = weatherData;
    }, error => {
      console.error('Error fetching weather data:', error);
    });
  }
  
  // Method to load landmark images for a given country name
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

  // Method to fetch directions from user's current location to the capital of the selected country
  getDirections() {
      // Attempt to get the current geographical position of the device using Capacitor's Geolocation API
    Geolocation.getCurrentPosition().then(position => {
          // Extract latitude and longitude from the position object and format them as a string suitable for URL use
      const origin = `${position.coords.latitude},${position.coords.longitude}`;
      const destination = this.country.capital[0].replace(' ', '+');
      //Constructs the URL using users location, destination and mode of transport as driving by deafult(User can switch to flight in maps)
      const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}&travelmode=driving`;
      window.open(googleMapsUrl, '_blank');
    }).catch(error => {
      console.error('Error getting location:', error);
      // Handle errors such as permissions issues
    });
  }
   
}
