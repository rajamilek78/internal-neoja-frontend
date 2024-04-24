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
  session_id!: string;
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
    // Initialize form and other services
    this.playerForm = this.fb.group({
      players: this.fb.array([]),
    });
  }

  ngOnInit() {
    window.scrollTo(0, 0);
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
          this.selectedValue = selectedValue
          if (this.roundsLength >= 1 && selectedValue) {
            this.leagueSummary(selectedValue || defaultSelectedValue);
          }
        }
      );
  }
 
  ngOnChanges(changes: SimpleChanges) {
    // Handle changes in input properties
    if (changes['playerCount']) {
      this.onPlayerCountChange(this.roundCount);
    }
  }

  ngOnDestroy() {
    // Clean up subscriptions
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

   // Create a player form group
  createPlayer(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required],
      score: [0, Validators.required],
    });
  }

  // Add a new player to the form
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

  // Add multiple players at once
  addPlayers(count: number): void {
    for (let i = 0; i < count; i++) {
      this.addPlayer();
    }
  }

  // Toggle sorting of players by name or score
  toggleSorting(field: 'name' | 'score'): void {
    if (this.sortedBy === field) {
      this.isAscending = !this.isAscending;
    } else {
      this.sortedBy = field;
      this.isAscending = true;
    }
    this.sortPlayers(field);
  }

  // Sort players based on the specified field
  sortPlayers(field: 'name' | 'score'): void {
    const playersArray = this.playerForm.get('players') as FormArray;
    let sortedPlayers = playersArray.controls.slice();
    // Sort players
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
  }

  // Get the players form array
  get players(): FormArray {
    return this.playerForm.get('players') as FormArray;
  }

  // Handle user subscription
  userSubscriber = () => {
    this.userDetailSub$ = this.sharedService
      .getUserDetailCall()
      .subscribe(() => {
        this.userDetail = this.sharedService.getUser();
        if (this.userDetail) {
          this.clubID = this.userDetail?.club_id;
          this.session_id = this.userDetail?.session_id;
        }
      });
  };
 
  // Fetch league summary data based on selected value
  leagueSummary(selectedValue: string) {
    // Logic to fetch and process league summary data
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
              isDeleted: [{ value: false, disabled: true }],

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
                isDeleted: [{ value: false, disabled: true }],

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
                isDeleted: [{ value: false, disabled: true }],
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

  // Handle player count change
  onPlayerCountChange(count: number): void {
    if (this.players) {
      const currentCount = this.players.length;
      if (count > currentCount) {
        this.addPlayers(count - currentCount);
      }
    }
  }
  submitData(): void {
     // Logic to submit player data
    this.playerForm.getRawValue().players;
    const formattedDate = this.datePipe.transform(
      this.selectedDate,
      'MM/dd/yyyy'
    );
    const clubLeagueStr = `${this.clubID}/${this.leagueID}`;

    if (this.roundsLength >= 1) {
      const playerDataRound2 = {
        session_id: this.session_id,
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
        session_id: this.session_id,
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
    // Delete a player
    this.openDialogue(index);
  }

  /**
   * Change Player Availability
   * @param player 
   */

  // Change player status
  changePlayerStatus(playerIndex: number) {
    const playersArray = this.playerForm.get('players') as FormArray;
    const playerGroup = playersArray.at(playerIndex) as FormGroup;
    const isDeletedControl = playerGroup.get('isDeleted');
    if (isDeletedControl) {
      isDeletedControl.setValue(!isDeletedControl.value);
    }
  }

  // Open delete player dialogue
  openDialogue(index: number): void {
    const player = this.players.at(index).value;
    const dialogueRef = this.dialog.open(DeleteDetailDialogueComponent, {
      width: '450px',
      data: {
        roundCount: this.roundCount,
        playerName: player.name,
      },
    });
    dialogueRef.afterClosed().subscribe((accpted: boolean) => {
      if (!accpted) return
      this.players.removeAt(index);

    });
  }
}
