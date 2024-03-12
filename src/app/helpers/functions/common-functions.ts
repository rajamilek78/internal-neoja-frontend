
export const isEmpty = (obj): boolean =>
    Object.keys(obj).length === 0 && obj.constructor === Object;

export const AppLogger = (value: any) => {
    // console.log(`<------------------------------------ ${value} ------------------------------------>`);
};
export const generateRandomPlayer = () =>{
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    const playerNameLength = Math.floor(Math.random() * 10) + 5; // Generate a random length for the player name (between 5 and 14 characters)
    let playerName = '';
    for (let i = 0; i < playerNameLength; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        playerName += characters.charAt(randomIndex);
    }
    return {
        "games_lost": (Math.random()*10).toFixed(2),
        "games_played": (Math.random()*10).toFixed(2),
        "games_played_percent": (Math.random()*100).toFixed(2),
        "games_possible": (Math.random()*10).toFixed(2),
        "games_won": (Math.random()*10).toFixed(2),
        "games_won_percent": (Math.random()*70).toFixed(2),
        "player": playerName,
        "points_possible": (Math.random()*50).toFixed(2),
        "points_scored": (Math.random()*50).toFixed(2),
        "points_won_percent": (Math.random()*100).toFixed(2),
        "weighted_rating": (Math.random()*100).toFixed(2),
        "win_lose_history": "0,0,1,1"
      }
}