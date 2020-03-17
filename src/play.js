const moment = require('moment')


const today = moment("2019-03-01").subtract(1, 'days')
console.log(today.date())

let daysToSubtract = 0
switch (today.date()) {
    case 28:
        daysToSubtract = 28
        break;
    case 30:
        daysToSubtract = 30
        break;
    case 31:
        daysToSubtract = 31
        break;
}
// console.log(daysToSubtract)
let begginingDay =  moment("2019-03-01").subtract(daysToSubtract, 'days');

console.log(today.isSame(begginingDay,'day'))

while(!begginingDay.isAfter(today,'day')){
    console.log(begginingDay)
    begginingDay = begginingDay.add(1,'days')
}


console.log("begginingDay:",begginingDay)