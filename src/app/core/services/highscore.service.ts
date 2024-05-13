import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import io from 'socket.io-client';
import { APIManager } from './api-manager.service';
import { API_ENDPOINTS } from '@app/helpers/constants';


@Injectable({
  providedIn: 'root'
})
export class HighscoreService {
  private socket: any;
  private baseurl = environment.apiUrl;

  constructor(private http: HttpClient, private apiManager: APIManager) {
    this.socket = io(this.baseurl);
  }

  getHighScoreData(): Observable<any[]> {
    return this.apiManager.getApis(API_ENDPOINTS.HIGHSCORE, {}, true)
  }

  getAllTeamData(): Observable<any[]> {
    return this.apiManager.getApis(API_ENDPOINTS.ALLTEAMDATA, {}, true)
  }
  resetTeam(data: any){
    return this.apiManager.postApis(`${API_ENDPOINTS.RESET_TEAMS}`,data, true)
  }


  getSocket(): any {
    return this.socket;
  }

  listenForScoreUpdates(): Observable<any> {
    return new Observable<any>((observer) => {
      this.socket.on('updateScores', (newData: any) => {
        observer.next(newData);
      });
    });
  }
}
