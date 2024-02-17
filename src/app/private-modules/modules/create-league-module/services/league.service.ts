import { Injectable } from '@angular/core';
import { CommonService } from '@app/core';

@Injectable({
  providedIn: 'root'
})
export class LeagueService {

  constructor(private commonService : CommonService) {  }
}
