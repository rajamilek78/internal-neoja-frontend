export interface ScoreModel {
    [round: string]: RoundScore;
}
export interface RoundScore {
    cumulative: Players;
    individual: Players;
}
export interface Players {
    [playerName: string]: PlayerScore;
}
export interface PlayerScore {
    played: number;
    points_possible: number;
    points_scored: number;
    rating: number;
    win_percent: number;
    won: number;
    win_lose_history : string;
}



