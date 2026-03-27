import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Person } from '../../models/person';
import { PersonService } from '../../services/person.service';

@Component({
  selector: 'app-person-create',
  templateUrl: './person-create.component.html',
  styleUrls: ['./person-create.component.css']
})
export class PersonCreateComponent implements OnInit {
  person: Person = {
    id: 0,
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  };

  saving = false;
  error = '';

  constructor(
    private router: Router,
    private personService: PersonService
  ) {}

  ngOnInit(): void {}

  createPerson(): void {
    this.saving = true;
    this.error = '';

    this.personService.createPerson(this.person).subscribe(
      () => {
        this.saving = false;
        this.router.navigate(['/people']);
      },
      () => {
        this.error = 'Unable to create person.';
        this.saving = false;
      }
    );
  }

  goBack(): void {
    this.router.navigate(['/people']);
  }
}
