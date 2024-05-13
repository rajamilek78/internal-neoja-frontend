export interface ScoreModel {
    [round: string]: RoundScore;
}
export interface RoundScore {
    cumulative: any[];
    individual: any[];
    originalCumulative : [];
}
export interface Players {
    [playerName: string]: PlayerScore;
}
export interface PlayerScore {
    games_played: number;
    player:string,
    games_possible: number;
    points_possible: number;
    games_played_percent: number;
    points_scored: number;
    weighted_rating: number;
    points_won_percent: number;
    win_percent: number;
    games_won: number;
    games_lost: number;
    games_won_percent: number;
    win_lose_history : string;
}



