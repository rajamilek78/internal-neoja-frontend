import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../../../../core';
import { CompanyModel } from '@app/helpers/models/company.model';

@Component({
  selector: 'app-completed-leagues',
  templateUrl: './completed-leagues.component.html',
  styleUrl: './completed-leagues.component.scss',
})
export class CompletedLeaguesComponent implements OnInit {
  companies: { [key: string]: { name: string; description: string } } = {};
  newCompanies!: CompanyModel[];
  clubs: { [key: string]: { name: string; phone: string; address: any } } = {};
  // clubs : any;
  constructor(private commonService: CommonService) {}

  ngOnInit(): void {
    this.getAllCompanies();
  }

  getAllCompanies() {
    this.commonService.getAllCompanies().subscribe({
      next: (resp: any) => {
        // format change
        // [{
        //   id:'DLF',
        //   name:'test',
        //   description:'test',
        // }]
        this.companies = resp;
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }
  getAllClubs(companyID: string) {
    this.commonService.getAllClubs(`${companyID}/all`).subscribe({
      next: (resp: any) => {
        this.clubs = resp;
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }
}
