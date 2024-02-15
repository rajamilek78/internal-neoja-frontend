import { FormatWidth } from '@angular/common';
import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ApiManagerService } from '../../../../../core/services';
import { Router } from '@angular/router';
import { SharedService } from '../../../../../helpers/services';

@Component({
  selector: 'app-upload-player-data',
  templateUrl: './upload-player-data.component.html',
  styleUrl: './upload-player-data.component.scss',
})
export class UploadPlayerDataComponent implements OnInit {
  form!: FormGroup;
  @Input() playerCount!: number;

  constructor(
    private fb: FormBuilder,
    private api: ApiManagerService,
    private router: Router,
    private sharedService: SharedService
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      players: this.fb.array([]),
    });

    this.addPlayers(this.playerCount);
  }

  createPlayer(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required],
      score: ['', Validators.required],
    });
  }

  addPlayer(): void {
    this.players.push(this.createPlayer());
  }

  deletePlayer(index: number): void {
    this.players.removeAt(index);
  }

  addPlayers(count: number): void {
    for (let i = 0; i < count; i++) {
      this.addPlayer();
    }
  }

  get players(): FormArray {
    return this.form.get('players') as FormArray;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['playerCount']) {
      this.onPlayerCountChange(this.playerCount);
    }
  }

  onPlayerCountChange(count: number): void {
    const currentCount = this.players.length;
    if (count > currentCount) {
      this.addPlayers(count - currentCount);
    } else {
      for (let i = currentCount; i > count; i--) {
        this.deletePlayer(i - 1);
      }
    }
  }

  submitData(): void {
    const playerData = this.form.value.players.reduce((obj, player) => {
      obj[player.name] = player.score;
      return obj;
    }, {});

    this.api.post('json', playerData).subscribe({
      next: (res: any) => {
        // this.sharedService.setMatchData(res);
        localStorage.setItem('matchData', JSON.stringify(res));
        this.router.navigate(['league']);
        console.log(res);
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }
}
