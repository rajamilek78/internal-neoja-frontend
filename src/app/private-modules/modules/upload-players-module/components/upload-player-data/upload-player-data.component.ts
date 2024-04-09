import {
  Component,
  Input,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { RouteConstant } from '@app/helpers/constants';
import { Subscription } from 'rxjs';
import { UserModel } from '@app/helpers/models';
import { DeleteDetailDialogueComponent } from '../delete-detail-dialogue/delete-detail-dialogue.component';
import {
  SnackBarService,
  SharedCommonService,
  CommonService,
  SharedService,
  LeaguemanageService,
} from '@app/core';
import { MatRadioChange } from '@angular/material/radio';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
@Component({
  selector: 'app-upload-player-data',
  templateUrl: './upload-player-data.component.html',
  styleUrl: './upload-player-data.component.scss',
})
export class UploadPlayerDataComponent implements OnInit, OnDestroy {
  playerForm!: FormGroup;
  isRoundTwo = false;
  selectedLeague$!: Subscription;
  selectedPlayer$!: Subscription;
  userDetailSub$!: Subscription;
  userDetail!: UserModel | null;
  clubID!: string;
  @Input() roundCount!: number;
  @Input() roundsLength!: number;
  @Input() leagueID!: string;
  @Input() selectedLeague: any;
  @Input() selectedDate!: Date;
  @Input() selectedValue!: string;
  isDropInDisabled = true;
  isNoShowDisabled = false;
  roundOnePlayersCount!: number;
  dropInPlayersCount!: number;
  previousRoundPlayersCount!: number;
  leagueIDSubscription!: Subscription;
  sortedBy: string = '';
  isAscending: boolean = true;

  leagueSummaryData: any;
  sessionID!: string;
  ld!: string;
  leagueSelect!: string;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private sharedService: SharedService,
    private commonservice: CommonService,
    private snackbarService: SnackBarService,
    private datePipe: DatePipe,
    private SharedCommonService: SharedCommonService,
    private leagueManagerService: LeaguemanageService,
    private dialog: MatDialog
  ) {
    this.playerForm = this.fb.group({
      players: this.fb.array([]),
    });
  }

  ngOnInit() {
    window.scrollTo(0, 0);
    //this.selectedValue = '1'
    // this.addPlayers(this.playerCount);
    this.userSubscriber();
    this.onleagueSelect();
    this.onplayerSelect();
  }

  onleagueSelect() {
    const defaultSelectedValue = '1';
    this.selectedLeague$ = this.leagueManagerService.getSelectedLeague().subscribe((lague: any) => {
      this.leagueSelect = lague.id;
      if (this.roundsLength >= 1) {
        this.leagueSummary(defaultSelectedValue);
      } else {
        this.addPlayer();
      }
    }
    );
  }

  onplayerSelect() {
    const defaultSelectedValue = '1';
    this.selectedPlayer$ =
      this.SharedCommonService.getSelectedValue().subscribe(
        (selectedValue: string) => {
          this.selectedValue= selectedValue
          if (this.roundsLength >= 1 && selectedValue) {
            this.leagueSummary(selectedValue || defaultSelectedValue);
          }
        }
      );
  }
  // onSelectChange() {
  //   const defaultSelectedValue = '1';
  //   this.selectedLeague$ = this.leagueManagerService.getSelectedLeague().subscribe((league: any) => {
  //     this.leagueSelect = league.id;
  //     console.log(this.leagueSelect);

  //     this.selectedPlayer$ = this.SharedCommonService.getSelectedValue().subscribe((selectedValue: string) => {
  //       if (this.roundsLength >= 1) {
  //         this.leagueSummary(selectedValue || defaultSelectedValue);
  //       } else {
  //         this.addPlayer();
  //       }
  //     });
  //   });
  // }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['playerCount']) {
      this.onPlayerCountChange(this.roundCount);
    }
  }

  ngOnDestroy() {
    if (this.userDetailSub$) {
      this.userDetailSub$.unsubscribe();
    }
    if (this.selectedLeague$) {
      this.selectedLeague$.unsubscribe();
    }
    if (this.selectedPlayer$) {
      this.selectedPlayer$.unsubscribe();
    }
    this.SharedCommonService.setSelectedValue(null);
  }

  createPlayer(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required],
      score: [0, Validators.required],
    });
  }

  addPlayer(): void {
    this.players.push(this.createPlayer());
    setTimeout(() => {
      const playerInputs = document.querySelectorAll(
        'input[formControlName="name"]'
      );
      const lastPlayerInput = playerInputs[
        playerInputs.length - 1
      ] as HTMLInputElement;
      lastPlayerInput.focus();
    });
  }

  addPlayers(count: number): void {
    for (let i = 0; i < count; i++) {
      this.addPlayer();
    }
  }

  // onRadioButtonChange(event: MatRadioChange) {
  //   const selectedValue = event.value;
  //   console.log('Selected radio button value:', selectedValue);
  //   if(selectedValue == "1"){
  //     console.log(this.leagueSummaryData.players);
  //   }
  //   else if (selectedValue == "2") {
  //     const roundOnePlayers = Object.entries(this.leagueSummaryData.players)
  //           .filter(([_, playerData]: [string, any]) => playerData.in_round1 === true)
  //           .map(([playerName, playerData]: [string, any]) => ({ playerName, playerData }));
  //       console.log(roundOnePlayers);
  //   }
  // }
  // onRadioButtonChange(event: MatButtonToggleChange) {
  //   const selectedValue = event.value;
  //   console.log('Selected radio button value:', selectedValue);
  //   this.leagueSummary(selectedValue);
  // }
  toggleSorting(field: 'name' | 'score'): void {
    if (this.sortedBy === field) {
      this.isAscending = !this.isAscending;
    } else {
      this.sortedBy = field;
      this.isAscending = true;
    }
    this.sortPlayers(field);
  }

  sortPlayers(field: 'name' | 'score'): void {
    const playersArray = this.playerForm.get('players') as FormArray;
    let sortedPlayers = playersArray.controls.slice();

    if (this.sortedBy === field) {
      this.isAscending = !this.isAscending;
    } else {
      this.sortedBy = field;
      this.isAscending = true;
    }

    sortedPlayers.sort((a, b) => {
      const valueA = a.value[field];
      const valueB = b.value[field];
      if (field === 'name') {
        if (this.isAscending) {
          return valueA.localeCompare(valueB);
        } else {
          return valueB.localeCompare(valueA);
        }
      } else if (field === 'score') {
        if (this.isAscending) {
          return valueA - valueB;
        } else {
          return valueB - valueA;
        }
      }
      return 0;
    });

    playersArray.clear();
    sortedPlayers.forEach((player) => {
      playersArray.push(player);
    });
    //  // Check if the same field is clicked thrice to reset sorting
    //  if (this.sortedBy === field && !this.isAscending) {
    //   this.sortedBy = ''; // Reset sortedBy field
    //   this.isAscending = true; // Reset sorting order to ascending
    // }
  }

  get players(): FormArray {
    return this.playerForm.get('players') as FormArray;
  }

  userSubscriber = () => {
    this.userDetailSub$ = this.sharedService
      .getUserDetailCall()
      .subscribe(() => {
        this.userDetail = this.sharedService.getUser();
        if (this.userDetail) {
          this.clubID = this.userDetail?.club_id;
          this.sessionID = this.userDetail?.session_id;
        }
      });
  };
  // leagueSummary() {
  //   const clubLeagueStr = `${this.clubID}/${this.leagueID}`;
  //   this.commonservice.getLeaguesSummary(clubLeagueStr).subscribe({
  //     next: (res: any) => {
  //       this.roundOnePlayersCount = res.round1_player_count;
  //       this.dropInPlayersCount = res.drop_in_player_count;
  //       this.leagueSummaryData = res;
  //       let sortedPlayers = Object.entries(this.leagueSummaryData.players);
  //       // sortedPlayers.sort((a, b) => {
  //       //   return (
  //       //     (b[1] as any)['weighted_rating'] - (a[1] as any)['weighted_rating']
  //       //   );
  //       // });
  //       const playersArray = this.playerForm.get('players') as FormArray;
  //       playersArray.clear();
  //       for (let i = 0; i < sortedPlayers.length; i++) {
  //         let playerName = sortedPlayers[i][0];
  //         let playerData = sortedPlayers[i][1] as any;
  //         const winLoseHistory = playerData.win_lose_history
  //           ? playerData.win_lose_history.split(',').reverse()
  //           : [];
  //         const round = playerData.in_round1;
  //         const playerGroup = this.fb.group({
  //           name: [{ value: playerName, disabled: true }, Validators.required],
  //           score: [
  //             { value: playerData.weighted_rating, disabled: true },
  //             Validators.required,
  //           ],
  //           winLoseHistory: [{ value: winLoseHistory, disabled: true }],
  //           round: [{ value: round, disabled: true }],
  //         });

  //         playersArray.push(playerGroup);
  //       }
  //       // this.updateToggleState();
  //     },
  //     error: (err: any) => {
  //       this.roundOnePlayersCount = 0;
  //       this.dropInPlayersCount = 0;
  //       const playersArray = this.playerForm.get('players') as FormArray;
  //       playersArray.clear();
  //       this.addPlayer();
  //       const message = err.error.message;
  //       this.snackbarService.setSnackBarMessage(message);
  //     },
  //   });
  // }

  leagueSummary(selectedValue: string) {
    const clubLeagueStr = `${this.clubID}/${this.leagueSelect}`;
    this.commonservice.getLeaguesSummary(clubLeagueStr).subscribe({
      next: (res: any) => {
        this.roundOnePlayersCount = res.round1_player_count;
        this.dropInPlayersCount = res.drop_in_player_count;
        this.previousRoundPlayersCount = res.last_round_player_count;
        this.leagueSummaryData = res;
        const sortedPlayers = Object.entries(this.leagueSummaryData.players);
        const playersArray = this.playerForm.get('players') as FormArray;
        playersArray.clear();

        if (selectedValue == '1') {
          sortedPlayers.forEach(([playerName, playerData]: [string, any]) => {
            const winLoseHistory = playerData.win_lose_history
              ? playerData.win_lose_history.split(',').reverse()
              : [];
            const round = playerData.in_round1;
            const playerGroup = this.fb.group({
              name: [
                { value: playerName, disabled: true },
                Validators.required,
              ],
              score: [
                { value: playerData.weighted_rating, disabled: true },
                Validators.required,
              ],
              winLoseHistory: [{ value: winLoseHistory, disabled: true }],
              round: [{ value: round, disabled: true }],
            });
            playersArray.push(playerGroup);
            this.isAscending = true;
            this.sortPlayers('score');
          });
        } else if (selectedValue == '2') {
          const roundOnePlayers = sortedPlayers
            .filter(
              ([_, playerData]: [string, any]) => playerData.in_round1 === true
            )
            .map(([playerName, playerData]: [string, any]) => ({
              playerName,
              playerData,
            }));

          roundOnePlayers.forEach(
            ({
              playerName,
              playerData,
            }: {
              playerName: string;
              playerData: any;
            }) => {
              const winLoseHistory = playerData.win_lose_history
                ? playerData.win_lose_history.split(',').reverse()
                : [];
              const round = playerData.in_round1;
              const playerGroup = this.fb.group({
                name: [
                  { value: playerName, disabled: true },
                  Validators.required,
                ],
                score: [
                  { value: playerData.weighted_rating, disabled: true },
                  Validators.required,
                ],
                winLoseHistory: [{ value: winLoseHistory, disabled: true }],
                round: [{ value: round, disabled: true }],
              });
              playersArray.push(playerGroup);
              this.isAscending = true;
              this.sortPlayers('score');
            }
          );
        } else if (selectedValue == '3') {
          const previousRoundPlayers = sortedPlayers
            .filter(
              ([_, playerData]: [string, any]) =>
                playerData.in_last_round === true
            )
            .map(([playerName, playerData]: [string, any]) => ({
              playerName,
              playerData,
            }));

          previousRoundPlayers.forEach(
            ({
              playerName,
              playerData,
            }: {
              playerName: string;
              playerData: any;
            }) => {
              const winLoseHistory = playerData.win_lose_history
                ? playerData.win_lose_history.split(',').reverse()
                : [];
              const round = playerData.in_round1;
              const playerGroup = this.fb.group({
                name: [
                  { value: playerName, disabled: true },
                  Validators.required,
                ],
                score: [
                  { value: playerData.weighted_rating, disabled: true },
                  Validators.required,
                ],
                winLoseHistory: [{ value: winLoseHistory, disabled: true }],
                round: [{ value: round, disabled: true }],
              });
              playersArray.push(playerGroup);
              this.isAscending = true;
              this.sortPlayers('score');
            }
          );
        }

        // this.updateToggleState();
      },
      error: (err: any) => {
        this.roundOnePlayersCount = 0;
        this.dropInPlayersCount = 0;
        this.previousRoundPlayersCount = 0;
        this.addPlayer();
        const playersArray = this.playerForm.get('players') as FormArray;
        playersArray.clear();
        const message = err.error.message;
        this.snackbarService.setSnackBarMessage(message);
      },
    });
  }

  onPlayerCountChange(count: number): void {
    if (this.players) {
      const currentCount = this.players.length;
      if (count > currentCount) {
        this.addPlayers(count - currentCount);
      }
    }
  }
  submitData(): void {
    const formattedDate = this.datePipe.transform(
      this.selectedDate,
      'MM/dd/yyyy'
    );
    const clubLeagueStr = `${this.clubID}/${this.leagueID}`;

    if (this.roundsLength >= 1) {
      const playerDataRound2 = {
        sessionID: this.sessionID,
        round: this.roundCount,
        date: formattedDate,
        players: {},
      };

      this.playerForm.getRawValue().players.forEach((player) => {
        playerDataRound2.players[player.name] = {
          rating: player.score,
          in_round1: player.in_round1,
          is_deleted: player.isDeleted || false,
        };
      });

      // Upload data for round 2
      this.commonservice
        .uploadDataRound2(clubLeagueStr, playerDataRound2)
        .subscribe({
          next: (res: any) => {
            this.SharedCommonService.setMatchData(res);
            this.router.navigate([
              RouteConstant.LEAGUE_CONTAINER,
              { leagueID: this.leagueID, leagueName: this.selectedLeague.name },
            ]);
          },
          error: (err: any) => {
            const message = err.error.message;
            this.snackbarService.setSnackBarMessage(message);
          },
        });
    } else {
      const playerData = {
        sessionID: this.sessionID,
        round: String(this.roundCount),
        date: formattedDate,
        players: {},
      };

      this.playerForm.getRawValue().players.forEach((player) => {
        playerData.players[player.name] = player.score;
      });

      this.commonservice.uploadData(clubLeagueStr, playerData).subscribe({
        next: (res: any) => {
          this.SharedCommonService.setMatchData(res);
          this.router.navigate([
            RouteConstant.LEAGUE_CONTAINER,
            { leagueID: this.leagueID, leagueName: this.selectedLeague.name },
          ]);
        },
        error: (err: any) => {
          const message = err.error.message;
          this.snackbarService.setSnackBarMessage(message);
        },
      });
    }
  }
  deletePlayer(index: number): void {
    this.openDialogue(index);
  }

  openDialogue(index: number): void {
    const player = this.players.at(index).value;
    const dialogueRef = this.dialog.open(DeleteDetailDialogueComponent, {
      width: '450px',
      data: {
        roundCount: this.roundCount,
        playerName: player.name,
        players: this.players,
        index: index,
      },
    });
    dialogueRef.afterClosed().subscribe((result) => { });
  }
}
