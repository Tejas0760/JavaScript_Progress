const mark = {
    fullName : 'Mark Miller',
    mass : 78,
    height : 1.69,
    calcBmi : function() {
        this.bmi = this.mass / (this.height * this.height);
        return this.bmi;
    }
}

const john = {
    fullName : 'John Smith',
    mass : 92,
    height : 1.95,
    calcBmi : function() {
        this.bmi = this.mass / (this.height * this.height);
        return this.bmi;
    }
}

mark.calcBmi();
john.calcBmi();
if(mark.bmi > john.bmi){
    console.log(`${mark.fullName} BMI (${mark.bmi}) is higher than ${john.fullName} (${john.bmi})`);
}
else{
    console.log(`${john.fullName} BMI (${john.bmi}) is Higher than ${mark.fullName} (${mark.bmi})`);
}