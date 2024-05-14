import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService, SnackBarService } from '@app/core';
import { FormBaseComponent } from '@app/utility/components';

@Component({
  selector: 'app-score-feed',
  templateUrl: './score-feed.component.html',
  styleUrl: './score-feed.component.scss',
})
export class ScoreFeedComponent extends FormBaseComponent {
  scoreFeedForm!: FormGroup;

  constructor(
    fb: FormBuilder,
    private commonService: CommonService,
    private router: Router,
    private snackBarService: SnackBarService
  ) {
    super(fb);
  }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.initialize();
  }

  initialize = () => {
    this.createScoreFeedForm();
  };

  createScoreFeedForm = () => {
    this.scoreFeedForm = this.createForm({
      teamName: [''],
      playername1: [''],
      playername2: [''],
      playername3: [''],
      playername4: [''],
      player1game1Score: [''],
      player1game2Score: [''],
      player1game3Score: [''],
      player1game4Score: [''],
      player2game1Score: [''],
      player2game2Score: [''],
      player2game3Score: [''],
      player2game4Score: [''],
      player3game1Score: [''],
      player3game2Score: [''],
      player3game3Score: [''],
      player3game4Score: [''],
      player4game1Score: [''],
      player4game2Score: [''],
      player4game3Score: [''],
      player4game4Score: [''],
    });
  };

  onScoreFeedFormSubmit = (form: FormGroup) => {
    console.log(form.value);
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
            },
          },
          {
            name: form.value.playername2,
            score: {
              game1: +form.value.player2game1Score,
              game2: +form.value.player2game2Score,
              game3: +form.value.player2game3Score,
              game4: +form.value.player2game4Score,
            },
          },
          {
            name: form.value.playername3,
            score: {
              game1: +form.value.player3game1Score,
              game2: +form.value.player3game2Score,
              game3: +form.value.player3game3Score,
              game4: +form.value.player3game4Score,
            },
          },
          {
            name: form.value.playername4,
            score: {
              game1: +form.value.player4game1Score,
              game2: +form.value.player4game2Score,
              game3: +form.value.player4game3Score,
              game4: +form.value.player4game4Score,
            },
          },
        ],
      };
      this.commonService.addTeam(params).subscribe({
        next: (res) => {
          this.snackBarService.openSnackBar('Team added Successfully ');
          this.scoreFeedForm.reset();
        },
        error: (error) => {},
      });
    }
  };

  onBackToMenu = () => {
    this.router.navigate(['']);
  };
}
