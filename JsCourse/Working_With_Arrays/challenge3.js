const scoreDolphins1 = 97;
const scoreDolphins2 = 112;
const scoreDolphins3 = 101;

const scoreKoalas1 = 109;
const scoreKoalas2 = 95;
const scoreKoalas3 = 106;

const avgDolphins = (scoreDolphins1 + scoreDolphins2 + scoreDolphins3) / 3;
const avgKoalas = (scoreKoalas1 + scoreKoalas2 + scoreKoalas3) / 3;

console.log("Average Dolphins Score is: " + avgDolphins);
console.log("Average Koalas Score is: " + avgKoalas);

if(avgDolphins > avgKoalas && avgDolphins > 100){
    console.log("The Winner is Dolphins!! 🏆");
}
else if(avgDolphins == avgKoalas && (avgDolphins && avgKoalas > 100)){
    console.log("Its a Draw but both wins the trophy");
}
else if(avgKoalas > avgDolphins && avgKoalas > 100){
    console.log("The Winner is Koalas!! 🏆");
}

