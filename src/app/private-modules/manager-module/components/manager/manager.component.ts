import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HighscoreService } from '@app/core/services/highscore.service';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrl: './manager.component.scss'
})
export class ManagerComponent {
  teams: any[] = [];
  constructor(private highscoreService: HighscoreService,private router: Router,) { }

  ngOnInit(): void {
    this.initialize();
 }

 initialize = () => {
  this.getAllTeams();
  // this.getSocetData();
};

   getAllTeams =() => {
    this.highscoreService.getAllTeamData().subscribe({
      next: (res) => {
        console.log(res)
        this.teams = res;
      },
      error: (err) => {
        console.log(err);
      }
    });


  }

  resetTeams(){
    const data = {};
    this.highscoreService.resetTeam(data).subscribe({
      next : (res : any) =>{
        this.router.navigate(['']);
        console.log(res);
      },
      error : (err : any) =>{
        this.router.navigate(['']);
        console.log(err);
      }
    })
  }

  // getSocetData = () => {
  //   this.highscoreService.listenForScoreUpdates().subscribe((newData) => {
  //     this.teams = newData;
  //     console.log("Event emitted by server", this.teams);
  //   });
  // }
  
  onBackToMenu = () => {
    this.router.navigate(['']);
  };

}
