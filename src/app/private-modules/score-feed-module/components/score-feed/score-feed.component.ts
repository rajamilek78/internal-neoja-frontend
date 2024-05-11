import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from '@app/core';
import { FormBaseComponent } from '@app/utility/components';

@Component({
  selector: 'app-score-feed',
  templateUrl: './score-feed.component.html',
  styleUrl: './score-feed.component.scss'
})
export class ScoreFeedComponent extends FormBaseComponent {
scoreFeedForm!: FormGroup;

constructor(
  fb: FormBuilder,
  private commonService: CommonService,
  private router: Router,
) {
  super(fb);
}

  ngOnInit(): void {
     this.initialize();
  }

  initialize = () => {
    this.createScoreFeedForm();
  };

  createScoreFeedForm = () => {
    this.scoreFeedForm = this.createForm({
      teamName: ['', Validators.required],
      playername1: ['', Validators.required],
      playername2: ['', Validators.required],
      playername3: ['', Validators.required],
      playername4: ['', Validators.required],
      player1game1Score: ['', Validators.required],
      player1game2Score: ['', Validators.required],
      player1game3Score: ['', Validators.required],
      player1game4Score: ['', Validators.required],
      player2game1Score: ['', Validators.required],
      player2game2Score: ['', Validators.required],
      player2game3Score: ['', Validators.required],
      player2game4Score: ['', Validators.required],
      player3game1Score: ['', Validators.required],
      player3game2Score: ['', Validators.required],
      player3game3Score: ['', Validators.required],
      player3game4Score: ['', Validators.required],
      player4game1Score: ['', Validators.required],
      player4game2Score: ['', Validators.required],
      player4game3Score: ['', Validators.required],
      player4game4Score: ['', Validators.required],
    });
  };

  onScoreFeedFormSubmit = (form: FormGroup) => {
    console.log(form.value)
    if (this.onSubmit(form)) {
      const params = {
        team_name: form.value.teamName,
        players: [
          {
            name: form.value.playername1,
            score: {
              game1: +form.value.player1game1Score,
              game2: +form.value.player1game2Score,
              game3: +form.value.player1game3Score,
              game4: +form.value.player1game4Score,
            }
          },
          {
            name: form.value.playername2,
            score: {
              game1: +form.value.player2game1Score,
              game2: +form.value.player2game2Score,
              game3: +form.value.player2game3Score,
              game4: +form.value.player2game4Score,
            }
          },
          {
            name: form.value.playername3,
            score: {
              game1: +form.value.player3game1Score,
              game2: +form.value.player3game2Score,
              game3: +form.value.player3game3Score,
              game4: +form.value.player3game4Score,
            }
          },
          {
            name: form.value.playername4,
            score: {
              game1: +form.value.player4game1Score,
              game2: +form.value.player4game2Score,
              game3: +form.value.player4game3Score,
              game4: +form.value.player4game4Score,
            }
          }
        ]
      };
      this.commonService.addTeam(params).subscribe({
        next: (res) => {
          this.scoreFeedForm.reset();
        },
        error: (error) => {
  
        }
      });
    }
    
  }

  onBackToMenu = () => {
    this.router.navigate(['']);
  };
}
