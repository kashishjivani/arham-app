import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { SearchPipe } from '../search.pipe';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})

export class StudentsComponent implements AfterViewInit {

  studentForm: FormGroup;
  studentsData: any[] = [];
  displayedColumns: string[] = ['fullName', 'dob', 'age', 'contactNumber', 'email', 'std', 'division', 'percentage', 'status'];
  newStudent: Object = {};
  dataSource = new MatTableDataSource(this.studentsData);
  searchText: string = '';

  @ViewChild(MatSort) sort: MatSort | null;

  constructor(private fb: FormBuilder, private searchPipe: SearchPipe) {
    this.sort = null;
    this.studentForm = fb.group({
      fullName: ['', [Validators.required, Validators.maxLength(20), Validators.pattern(/^[a-zA-Z\s]*$/)]],
      dob: ['', [Validators.required]],
      contactNumber: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(15), Validators.pattern('^[0-9]*$')]],
      email: ['', [Validators.required, Validators.email]],
      std: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      division: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]*$/)]],
      percentage: ['', [Validators.required, Validators.min(0), Validators.max(100)]]
    })
  }

  ngAfterViewInit(): void {
      this.dataSource.sort = this.sort;
  }

  onSubmit() {
      const age = this.calculateAge(this.studentForm.value.dob);
      const status = this.studentForm.value.percentage > 35 ? 'Pass': 'Fail';
      
      this.newStudent = {
        ...this.studentForm.value,
        age,
        status
      }

      this.studentsData.push(this.newStudent);
      this.dataSource.data = this.studentsData;
      this.studentForm.reset();
  }

  calculateAge(dob: Date): number {
    const today = new Date();
    const birthDate = new Date(dob);

    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if(monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

  applySearch() {
    this.dataSource.data = this.searchPipe.transform(this.studentsData, this.searchText);
  }

}
