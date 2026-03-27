import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Person } from '../../models/person';
import { PersonService } from '../../services/person.service';

@Component({
  selector: 'app-person-delete',
  templateUrl: './person-delete.component.html',
  styleUrls: ['./person-delete.component.css']
})
export class PersonDeleteComponent implements OnInit {
  person: Person = {
    id: 0,
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  };

  loading = false;
  deleting = false;
  error = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private personService: PersonService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.fetchPerson(id);
    }
  }

  fetchPerson(id: number): void {
    this.loading = true;
    this.personService.getPerson(id).subscribe(
      (data: Person) => {
        this.person = data;
        this.loading = false;
      },
      () => {
        this.error = 'Unable to load person.';
        this.loading = false;
      }
    );
  }

  confirmDelete(): void {
    this.deleting = true;
    this.error = '';

    this.personService.deletePerson(this.person.id).subscribe(
      () => {
        this.deleting = false;
        this.router.navigate(['/people']);
      },
      () => {
        this.error = 'Unable to delete person.';
        this.deleting = false;
      }
    );
  }

  cancel(): void {
    this.router.navigate(['/people']);
  }
}
