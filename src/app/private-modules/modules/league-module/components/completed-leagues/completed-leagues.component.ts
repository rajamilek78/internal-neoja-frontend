import { Component, OnInit } from '@angular/core';
import { ApiManagerService } from '../../../../../core';

@Component({
  selector: 'app-completed-leagues',
  templateUrl: './completed-leagues.component.html',
  styleUrl: './completed-leagues.component.scss'
})
export class CompletedLeaguesComponent implements OnInit {
  companies: { [key: string]: { name: string, description: string } } = {};
  clubs : { [key : string] : { name : string, phone : string, address : any}} = {}
  // clubs : any;
  constructor(private api : ApiManagerService){}
  ngOnInit(): void {
    this.getAllCompanies();
  }
  
  getAllCompanies(){
    this.api.getAllCompanies().subscribe({
      next :(resp : any)=>{
        console.log(resp);
        this.companies = resp;
        
        
      },
      error : (err : any)=>{
        console.log(err);
        
      }
    })
    
  }
  getAllClubs( companyID : string){
    this.api.getAllClubs(`${companyID}/all`).subscribe({
      next :(resp : any)=>{
        console.log(resp);
        this.clubs = resp;
        
      },
      error : (err : any)=>{
        console.log(err);
        
      }
    })
  }
  

}
