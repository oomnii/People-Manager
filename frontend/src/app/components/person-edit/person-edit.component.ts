import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Person } from '../../models/person';
import { PersonService } from '../../services/person.service';

@Component({
  selector: 'app-person-edit',
  templateUrl: './person-edit.component.html',
  styleUrls: ['./person-edit.component.css']
})
export class PersonEditComponent implements OnInit {
  person: Person = {
    id: 0,
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  };

  loading = false;
  saving = false;
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

  updatePerson(): void {
    this.saving = true;
    this.error = '';

    this.personService.updatePerson(this.person.id, this.person).subscribe(
      () => {
        this.saving = false;
        this.router.navigate(['/people']);
      },
      () => {
        this.error = 'Unable to update person.';
        this.saving = false;
      }
    );
  }

  goBack(): void {
    this.router.navigate(['/people']);
  }
}
