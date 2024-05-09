import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonSearchbar, IonList, IonItem, IonLabel, IonButton, IonCard, IonCardContent, IonIcon , IonCardHeader, IonCardTitle,IonGrid,IonRow,IonCol,IonInput, IonTextarea} from '@ionic/angular/standalone'; // Adjust the import paths if necessary

interface JournalEntry {
  country: string;
  date: string;
  notes: string;
}

@Component({
  selector: 'app-journal',
  templateUrl: './journal.page.html',
  styleUrls: ['./journal.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule,IonContent, IonHeader, IonTitle, IonToolbar, IonSearchbar, IonList, IonItem, IonLabel, IonButton, IonCard, IonCardContent, IonIcon , IonCardHeader, IonCardTitle,IonGrid,IonRow,IonCol,IonInput, IonTextarea ]
})
export class JournalPage implements OnInit {
  journalEntry: JournalEntry = { country: '', date: new Date().toISOString(), notes: '' };
  journalEntries: JournalEntry[] = [];

  constructor() { }

  ngOnInit() { }

  updateField(field: keyof JournalEntry, value: string) {
    this.journalEntry[field] = value;
  }
  

  addEntry() {
    this.journalEntries.push({...this.journalEntry});
    this.journalEntry = { country: '', date: new Date().toISOString(), notes: '' }; // Reset form
  }
}
