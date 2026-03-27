import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Person } from '../models/person';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PersonService {
  private apiUrl = `${environment.apiBaseUrl}/people`;

  constructor(private http: HttpClient) {}

  getPeople(): Observable<Person[]> {
    return this.http.get<Person[]>(this.apiUrl);
  }

  getPerson(id: number): Observable<Person> {
    return this.http.get<Person>(`${this.apiUrl}/${id}`);
  }

  createPerson(person: Person): Observable<Person> {
    return this.http.post<Person>(this.apiUrl, person);
  }

  updatePerson(id: number, person: Person): Observable<Person> {
    return this.http.put<Person>(`${this.apiUrl}/${id}`, person);
  }

  deletePerson(id: number): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.apiUrl}/${id}`);
  }
}
