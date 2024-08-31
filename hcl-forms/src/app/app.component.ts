import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'hcl-forms';
   nameForm: FormGroup;
  searchForm: FormGroup;
  names: string[] = [];
  filteredNames: string[] = [];

  constructor(private fb: FormBuilder) {
    this.nameForm = this.fb.group({
      name: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
    });

    this.searchForm = this.fb.group({
      searchTerm: [''],
    });

    // Subscribe to search input value changes for real-time filtering
    this.searchForm.get('searchTerm')?.valueChanges.subscribe((searchTerm) => {
      this.filterNames(searchTerm);
    });
  }

  addName() {
    if (this.nameForm.valid) {
      const name = this.nameForm.get('name')?.value.trim();
      if (name && !this.names.includes(name)) {
        this.names.push(name);
        this.filteredNames = [...this.names]; // Update the filtered list
      }
      this.nameForm.reset();
    } else {
      alert('Please enter a valid name without numbers.');
    }
  }

  filterNames(searchTerm: string) {
    this.filteredNames = this.names.filter((name) =>
      name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  onNameClick(name: string) {
    this.searchForm.patchValue({ searchTerm: name });
  }
}