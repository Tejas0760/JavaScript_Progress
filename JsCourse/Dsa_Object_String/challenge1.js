const game = {
    team1: 'Bayern Munich',
    team2: 'Borrussia Dortmund',
    players: [
      [
        'Neuer',
        'Pavard',
        'Martinez',
        'Alaba',
        'Davies',
        'Kimmich',
        'Goretzka',
        'Coman',
        'Muller',
        'Gnarby',
        'Lewandowski',
      ],
      [
        'Burki',
        'Schulz',
        'Hummels',
        'Akanji',
        'Hakimi',
        'Weigl',
        'Witsel',
        'Hazard',
        'Brandt',
        'Sancho',
        'Gotze',
      ],
    ],
    score: '4:0',
    scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
    date: 'Nov 9th, 2037',
    odds: {
      team1: 1.33,
      x: 3.25,
      team2: 6.5,
    },
};


const [player1, player2] = game.players;
console.log(player1, player2);

const [gk, ...fieldPlayers] = player1;
console.log(gk,fieldPlayers);

const allPlayers = [...player1, ...player2];
console.log(allPlayers);

const player1final = [...player1, 'Thiago', 'Coutinho', 'Perisic'];
console.log(player1final);

const {
    odds : {team1, x : draw, team2},
} = game;

console.log(team1, draw, team2);

const printGoals = function(...player){
    console.log(player);
    console.log(`${player.length} Goals were score`)
}

printGoals(...game.scored)

team1 < team2 && console.log('Team 1 is more likely to win');
team1 > team2 && console.log('Team 2 is more likely to win');