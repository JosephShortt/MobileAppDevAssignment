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
    path: 'itinerary',
    loadComponent: () => import('./itinerary/itinerary.page').then( m => m.ItineraryPage)
  },
  {
    path: 'journal',
    loadComponent: () => import('./journal/journal.page').then( m => m.JournalPage)
  },
  {
    path: 'budget',
    loadComponent: () => import('./budget/budget.page').then( m => m.BudgetPage)
  },
  {
    path: 'country-details',
    loadComponent: () => import('./country-details/country-details.page').then( m => m.CountryDetailsPage)
  },
];
