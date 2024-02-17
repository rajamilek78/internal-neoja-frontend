import { FormatWidth } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';

@Component({
  selector: 'app-upload-player-data',
  templateUrl: './upload-player-data.component.html',
  styleUrl: './upload-player-data.component.scss'
})
export class UploadPlayerDataComponent implements OnInit{

constructor (private fb : FormBuilder){}
 playerForm! : FormGroup;
 players! : FormArray;
  ngOnInit(): void {
    this.playerForm = this.fb.group({
      playerName : [''],
      playerScore : [''],
      players : this.fb.array([this.createPlayer()]),
    });
   
  }

  createPlayer() : FormGroup {
    return this.fb.group({
      name : '',
      score : '',
    });
  }

  addPlayer() : void{
    this.players = this.playerForm.get('players') as FormArray;
    this.players.push(this.createPlayer());
  }

}
