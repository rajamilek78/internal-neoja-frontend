import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
        ...form.value
      }
      this.commonService.addTeam(params).subscribe({
        next: (res) => {
          console.log("add sucessfully")
        },
        error: (error) => {
  
        }
      });
    }
    
  }
}
