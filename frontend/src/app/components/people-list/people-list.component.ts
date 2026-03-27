import { Component, OnInit } from '@angular/core';

import { Person } from '../../models/person';
import { PersonService } from '../../services/person.service';

@Component({
  selector: 'app-people-list',
  templateUrl: './people-list.component.html',
  styleUrls: ['./people-list.component.css']
})
export class PeopleListComponent implements OnInit {
  people: Person[] = [];
  loading = false;
  error = '';

  constructor(private personService: PersonService) {}

  ngOnInit(): void {
    this.loadPeople();
  }

  loadPeople(): void {
    this.loading = true;
    this.error = '';

    this.personService.getPeople().subscribe(
      (data: Person[]) => {
        this.people = data;
        this.loading = false;
      },
      () => {
        this.error = 'Unable to load people.';
        this.loading = false;
      }
    );
  }
}
