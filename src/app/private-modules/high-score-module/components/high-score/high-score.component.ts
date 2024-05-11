import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HighscoreService } from '@app/core/services/highscore.service';


@Component({
  selector: 'app-high-score',
  templateUrl: './high-score.component.html',
  styleUrl: './high-score.component.scss'
})
export class HighScoreComponent implements OnInit {
  players: any[] = [];
  constructor(private highscoreService: HighscoreService,private router: Router,) { }

  ngOnInit(): void {
    this.initialize();
 }

 initialize = () => {
  this.getHighScore();
  this.getSocetData();
};

   getHighScore =() => {
    this.highscoreService.getHighScoreData().subscribe({
      next: (res) => {
        this.players = res;
      },
      error: (err) => {
        console.log(err);
      }
    });


  }
  getSocetData = () => {
    this.highscoreService.listenForScoreUpdates().subscribe((newData) => {
      this.players = newData;
      console.log("Event emitted by server", this.players);
    });
  }
  
  onBackToMenu = () => {
    this.router.navigate(['']);
  };

}
