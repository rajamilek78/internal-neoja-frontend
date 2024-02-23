export interface PlayerScore {
    played: number;
    points_possible: number;
    points_scored: number;
    rating: number;
    win_percent: number;
    won: number;
    win_lose_history : string;
}

export interface Players {
    [playerName: string]: PlayerScore;
}

export interface RoundScore {
    cumulative: Players;
    individual: Players;
}

export interface ScoreModel {
    [round: string]: RoundScore;
}
