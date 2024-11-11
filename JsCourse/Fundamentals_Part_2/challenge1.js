function calcAverage(score1,score2,score3){
    return (score1 + score2 + score3) / 3;
}

const teamDolphins = calcAverage(85,54,41);
const teamKoalas = calcAverage(23,34,27);

if(teamDolphins >= 2 * teamKoalas){
    console.log("Team Dolphins win the match!!!")
}
else if(teamKoalas >= 2 * teamDolphins){
    console.log("Team Koalas wins the match");
}
else{
    console.log("Nobody won");
}