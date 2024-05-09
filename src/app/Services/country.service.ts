import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  //url for rest api for fetching ccountry data
  private baseUrl = 'https://restcountries.com/v3.1';

  constructor(private httpClient: HttpClient) { }

  // Fetch countries by name for search functionality
  getCountryByName(name: string): Observable<any> {
    return this.httpClient.get<any[]>(`${this.baseUrl}/name/${name}`)
      .pipe(
        catchError(error => throwError(() => new Error(`Failed to fetch country: ${error.message}`)))
      );
  }

  // Fetch detailed information about a country
  getCountryDetails(name: string): Observable<any> {
    //Fetch country details from rest api
    return this.httpClient.get<any>(`${this.baseUrl}/name/${name}?fullText=true`)
      .pipe(
        catchError(error => throwError(() => new Error(`Failed to fetch country details: ${error.message}`)))
      );
  }

  // Method to fetch weather data for a given capital city(Using visualcrossing api)
getWeatherByCapital(capital: string): Observable<any> {
  const apiKey = 'Q893YM9RKTTJL4RLRKXEL76UZ'; 
  const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${capital}?key=${apiKey}&unitGroup=metric`;
  
  return this.httpClient.get<any>(url).pipe(
    catchError(error => throwError(() => new Error(`Failed to fetch weather: ${error.message}`)))
  );
}

// Fetch images of landmarks for a given country(using unsplash api)
getLandmarkImages(countryName: string): Observable<any> {
  const clientId = '12Feh3STvEwxqUQiLhnYoNrRlUVjoWoJL3Y9dE3s83s'; // Replace with your actual Unsplash access key
  //Constrcut url for fetching images
  const url = `https://api.unsplash.com/search/photos?query=${countryName} landmarks&client_id=${clientId}`;
  
  return this.httpClient.get<any>(url).pipe(
    catchError(error => throwError(() => new Error(`Failed to fetch landmark images: ${error.message}`)))
  );
}

}
