const value = 430;
const tip = (value >= 15 && value <= 300) ? value * 0.15 : value * 0.20;
console.log(`bill value: ${value}, tip value: ${tip}, total bill is: (${value + tip})`);