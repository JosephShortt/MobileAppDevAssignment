import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonSearchbar, IonList, IonItem, IonLabel, IonButton, IonCard, IonCardContent, IonIcon , IonCardHeader, IonCardTitle,IonGrid,IonRow,IonCol,IonInput, IonTextarea,IonButtons,IonBackButton} from '@ionic/angular/standalone'; // Adjust the import paths if necessary

//Interface for journal entries
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
  imports: [CommonModule, FormsModule,IonContent, IonHeader, IonTitle, IonToolbar, IonSearchbar, IonList, IonItem, IonLabel, IonButton, IonCard, IonCardContent, IonIcon , IonCardHeader, IonCardTitle,IonGrid,IonRow,IonCol,IonInput, IonTextarea ,IonButtons,IonBackButton]
})
export class JournalPage implements OnInit {
    //variable to store the current journal entry 
  journalEntry: JournalEntry = { country: '', date: new Date().toISOString(), notes: '' };

    // Array to store all journal entries
  journalEntries: JournalEntry[] = [];

  constructor() { }

  ngOnInit() { }

  // Method to update a field in the journal entry
  updateField(field: keyof JournalEntry, value: string) {
    this.journalEntry[field] = value;
  }
  
  // Method to add a new journal entry to the entries array
  addEntry() {
        // Push's a copy of the current journal entry to the entries array
    this.journalEntries.push({...this.journalEntry});
        // Resets the journal entry to empty fields
    this.journalEntry = { country: '', date: new Date().toISOString(), notes: '' }; // Reset form
  }
}
