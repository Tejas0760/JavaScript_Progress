function calcTip(value){
    return (value >= 50 && value <= 300) ? value * 0.15 : value * 0.20;
}

const bill = [125,555,44];
let tip = [];

const tip1 = calcTip(bill[0]);
tip.push(tip1);
const tip2 = calcTip(bill[1]);
tip.push(tip2);
const tip3 = calcTip(bill[2]);
tip.push(tip3);
console.log(bill);
console.log(tip);

const total = [bill[0] +  tip[0], bill[1] + tip[1], bill[2] + tip[2]];
console.log(total);