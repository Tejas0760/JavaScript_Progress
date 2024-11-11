const bill = [22, 295, 176, 440, 37, 105, 10, 1100, 86 ,52];
const tips =[];
const totals =[];


function calcTip(value){
    return (value >= 50 && value <= 300) ? value * 0.15 : value * 0.20;
}

for(let i = 0; i < bill.length; i++){
    tips.push(calcTip(bill[i]));
}

for(let i = 0; i < bill.length; i++){
    totals.push(tips[i] + bill[i]);
}

console.log(tips);
console.log(totals);