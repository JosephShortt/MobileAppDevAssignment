import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'search',
    loadComponent: () => import('./search/search.page').then( m => m.SearchPage)
  },

  {
    path: 'journal',
    loadComponent: () => import('./journal/journal.page').then( m => m.JournalPage)
  },
  
  {
    path: 'country-details',
    loadComponent: () => import('./country-details/country-details.page').then( m => m.CountryDetailsPage)
  },
  
  {
    path: 'booking',
    loadComponent: () => import('./booking/booking.page').then( m => m.BookingPage)
  },
];
