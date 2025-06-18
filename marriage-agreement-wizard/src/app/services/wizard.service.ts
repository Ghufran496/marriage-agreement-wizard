import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { PartyInfo, Child } from '../models/party-info';
import { Clause } from '../models/clause';
import { tap, catchError, map } from 'rxjs/operators';
// private apiUrl = 'https://f294-2407-d000-b-9d6e-ad14-8650-dd4-6e27.ngrok-free.app/api/document';
@Injectable({
  providedIn: 'root'
})
export class WizardService {
  // private apiUrl = 'https://localhost:7228/api/document'; // Updated to match the API's port
  private apiUrl = 'https://ba87-43-248-13-114.ngrok-free.app/api/document';
  // ngrok http https://localhost:7228
  private clausesData: Clause[] = [];
  private clausesLoaded = false;
  private partyInfoSubject = new BehaviorSubject<PartyInfo>({
    party1FirstName: '',
    party1LastName: '',
    party2FirstName: '',
    party2LastName: '',
    children: []
  });
  private selectedClausesSubject = new BehaviorSubject<Clause[]>([]);

  // Storage keys
  private readonly PARTY_INFO_STORAGE_KEY = 'marriage-agreement-party-info';
  private readonly SELECTED_CLAUSES_STORAGE_KEY = 'marriage-agreement-selected-clauses';

  constructor(private http: HttpClient) {
    this.loadSavedData();

    this.loadClausesData();

    this.setupAutoSave();
  }

  private loadSavedData(): void {
    try {
      const savedPartyInfo = sessionStorage.getItem(this.PARTY_INFO_STORAGE_KEY);
      if (savedPartyInfo) {
        const partyInfo = JSON.parse(savedPartyInfo);

        if (partyInfo.marriedDate) partyInfo.marriedDate = new Date(partyInfo.marriedDate);
        if (partyInfo.cohabitationDate) partyInfo.cohabitationDate = new Date(partyInfo.cohabitationDate);
        if (partyInfo.separationDate) partyInfo.separationDate = new Date(partyInfo.separationDate);

        if (partyInfo.children && partyInfo.children.length > 0) {
          partyInfo.children.forEach((child: any) => {
            if (child.birthdate) child.birthdate = new Date(child.birthdate);
          });
        }

        this.partyInfoSubject.next(partyInfo);
      }

      const savedClauses = sessionStorage.getItem(this.SELECTED_CLAUSES_STORAGE_KEY);
      if (savedClauses) {
        this.selectedClausesSubject.next(JSON.parse(savedClauses));
      }
    } catch (error) {
      console.error('Error loading saved data from sessionStorage:', error);
    }
  }

  private setupAutoSave(): void {
    this.partyInfoSubject.subscribe(partyInfo => {
      sessionStorage.setItem(this.PARTY_INFO_STORAGE_KEY, JSON.stringify(partyInfo));
    });

    this.selectedClausesSubject.subscribe(clauses => {
      sessionStorage.setItem(this.SELECTED_CLAUSES_STORAGE_KEY, JSON.stringify(clauses));
    });
  }

  private loadClausesData(): void {
    this.http.get<Clause[]>('assets/Prenupclauses.json')
      .pipe(
        tap(data => {
          this.clausesData = data;
          this.clausesLoaded = true;
          console.log('Clauses loaded successfully:', data.length);
        }),
        catchError(error => {
          console.error('Error loading clauses:', error);
          return of([]);
        })
      )
      .subscribe();
  }

  getPartyInfo(): Observable<PartyInfo> {
    return this.partyInfoSubject.asObservable();
  }

  updatePartyInfo(partyInfo: PartyInfo): void {
    this.partyInfoSubject.next(partyInfo);
  }

  getAllClauses(): Clause[] {
    if (!this.clausesLoaded || this.clausesData.length === 0) {
      this.loadClausesData();
      return [];
    }
    return this.clausesData;
  }

  ensureClausesLoaded(): Observable<boolean> {
    if (this.clausesLoaded && this.clausesData.length > 0) {
      return of(true);
    } else {
      return this.http.get<Clause[]>('assets/Prenupclauses.json')
        .pipe(
          map(data => {
            this.clausesData = data;
            this.clausesLoaded = true;
            console.log('Clauses loaded successfully:', data.length);
            return true;
          }),
          catchError(error => {
            console.error('Error loading clauses:', error);
            return of(false);
          })
        );
    }
  }

  getClausesByCategory(category: string): Clause[] {
    return this.clausesData.filter(clause => clause.category === category);
  }

  getCategories(): string[] {
    const categories = new Set<string>();
    this.clausesData.forEach(clause => categories.add(clause.category));
    return Array.from(categories);
  }

  getSelectedClauses(): Observable<Clause[]> {
    return this.selectedClausesSubject.asObservable();
  }

  getOrderedSelectedClauses(): Observable<Clause[]> {
    return this.selectedClausesSubject.pipe(
      map(clauses => this.orderClausesByCategory(clauses))
    );
  }

  orderClausesByCategory(clauses: Clause[]): Clause[] { 
    const categoryOrder = [
      'Definitions',
      'Background',
      'Intentions of Agreement',
      'Spousal Support',
      'Child Support',
      'Life Insurance',
      'Property Rights',
      'Date of Marriage Home Ownership/Calculations',
      'Family Residence Division',
      'Household Property and Possessions',
      'Dispute Resolution',
      'Estate Issues',
      'General Terms',
      'Execution',
      'Schedules'
    ];

    return [...clauses].sort((a, b) => {
      const indexA = categoryOrder.indexOf(a.category);
      const indexB = categoryOrder.indexOf(b.category);

      if (indexA !== -1 && indexB !== -1) {
        return indexA - indexB;
      }

      if (indexA !== -1) return -1;
      if (indexB !== -1) return 1;

      return 0;
    });
  }

  addSelectedClause(clause: Clause): void {
    const currentClauses = this.selectedClausesSubject.value;
    if (!currentClauses.some(c => c.id === clause.id)) {
      const updatedClauses = [...currentClauses, { ...clause, selected: true }];
      this.selectedClausesSubject.next(updatedClauses);
    }
  }

  removeSelectedClause(clauseId: number): void {
    const currentClauses = this.selectedClausesSubject.value;
    const updatedClauses = currentClauses.filter(c => c.id !== clauseId);
    this.selectedClausesSubject.next(updatedClauses);
  }

  addChild(): void {
    const currentInfo = { ...this.partyInfoSubject.value };
    currentInfo.children.push({
      firstName: '',
      lastName: '',
      birthdate: new Date()
    });
    this.partyInfoSubject.next(currentInfo);
  }

  removeChild(index: number): void {
    const currentInfo = { ...this.partyInfoSubject.value };
    if (index >= 0 && index < currentInfo.children.length) {
      currentInfo.children.splice(index, 1);
      this.partyInfoSubject.next(currentInfo);
    }
  }

  updateChild(index: number, child: Child): void {
    const currentInfo = { ...this.partyInfoSubject.value };
    if (index >= 0 && index < currentInfo.children.length) {
      currentInfo.children[index] = child;
      this.partyInfoSubject.next(currentInfo);
    }
  }

  resetWizard(): void {
    sessionStorage.removeItem(this.PARTY_INFO_STORAGE_KEY);
    sessionStorage.removeItem(this.SELECTED_CLAUSES_STORAGE_KEY);

    this.partyInfoSubject.next({
      party1FirstName: '',
      party1LastName: '',
      party2FirstName: '',
      party2LastName: '',
      children: []
    });
    this.selectedClausesSubject.next([]);
  }

  generateDocument(): Observable<Blob> {
    const documentRequest = {
      partyInfo: this.partyInfoSubject.value,
      selectedClauses: this.orderClausesByCategory(this.selectedClausesSubject.value)
    };

    return this.http.post(
      `${this.apiUrl}/generate`,
      documentRequest,
      { responseType: 'blob' }
    );
  }
}


// {
//   "id": "0001",
//   "category": "Contract Preamble",
//   "text": "THIS IS A MARRIAGE CONTRACT DATED\n\nBetween\n\nParty 1 \n(Party 1)\nAND\n\nParty 1 \n(Party 2)",
//   "label": "Contract Preamble"
// },