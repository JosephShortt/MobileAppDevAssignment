import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonSearchbar, IonList, IonItem, IonLabel,IonButton} from '@ionic/angular/standalone';
import { CountryService } from '../Services/country.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonContent, IonHeader, IonTitle, IonToolbar, IonSearchbar, IonList, IonItem, IonLabel ,IonButton]
})
export class SearchPage implements OnInit {
  searchResults: any[] = [];

  constructor(
    private countryService: CountryService, 
    private router: Router
  ) {}

  ngOnInit() {}

  onSearchChange(event: any) {
    const searchTerm = event.detail.value;
    if (searchTerm && searchTerm.length > 2) {
      this.countryService.getCountryByName(searchTerm).subscribe(
        (data) => {
          this.searchResults = data;
        },
        (error) => {
          console.error('Error fetching countries:', error);
          this.searchResults = [];
        }
      );
    } else {
      this.searchResults = [];
    }
  }

  viewCountryDetails(country: any) {
    // Navigate to the country-details route with the country name as a parameter
    this.router.navigate(['/country-details', { name: country.name.common }]);
  }
}
