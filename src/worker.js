/*
 performs non server tasks.. 
 - scheduled email sending
*/

//Dependencies
 const nodemailer = require("nodemailer");
const CronJob = require("cron").CronJob;
const Token = require('./server/models/Token')
const Attendance = require("./server/models/Attendance")
const Employee = require("./server/models/Employee")
const moment = require('moment')
const fs = require('fs')
const json2xls = require('json2xls');
const config = require('./server/lib/config')

class MainWorker {
  constructor(smtpServer, smtpPort, user, password, toEmail) {
    this.config = {
      smtpServer,
      smtpPort,
      user,
      password,
      toEmail
    };
  }
  async sendEmail(subject, html) {
    var smtpTransport = nodemailer.createTransport({
    pool:true,  
    host: "mail.smtp2go.com",
    port: 2525, // 8025, 587 and 25 can also be used.
    secure:false,
    auth: {
    user: this.config.user,
    pass: this.config.password
}
}
    );
      
      smtpTransport.sendMail({
      from: "Register <accounts@kolleris.com>",
      to: this.config.toEmail,
      subject,
      html,
      }, function(error, response){
      if(error){
      console.log(error);
      }else{
      console.log("Message sent: " + response.message);
      }
      });
  }
  dailyRegister() {
    let job = new CronJob(
       "0 0 8 * * 1-6", //"5 * * * * *"
      async () => {
        console.log("Sending daily email....");
          const html =  `<p> Please fill in the daily  <a href="${await this.generateOneTimeLink()}">register here</a></p>`
          // console.log(html)
          try {
              await this.sendEmail("Daily register",html)
              console.log("Email sent ;)");
          } catch (ex) {
              console.log('Error while sending daily email: %s',ex)
          }
      },
      null,
      true,
      "America/Los_Angeles"
    );
    job.start();
  }
  async jsonTOExcel(){
    try {
      const att = await Attendance.find({}).populate('employee','firstName lastName')
    const employees = await Employee.find({})
    
    const today = moment().subtract(1, 'days')
    // console.log(att)
// console.log(today.date())

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
let begginingDay =  moment().subtract(daysToSubtract, 'days');

let records = []
while(!begginingDay.isAfter(today,'day')){
    let record = { date : begginingDay.format('YYYY MM DD')}
    if(records.length == 0 ){
      for (let x = 0; x < employees.length; x++) {
        const employee = employees[x];
        record[`${employee.firstName} ${employee.lastName}`] = ''
      }
    } 
      for (let i = 0; i < att.length; i++) {
        const attendance = att[i];
        // console.log(moment(attendance.date))
      if(moment(attendance.date).isSame(begginingDay,'day'))
      record[`${attendance.employee.firstName} ${attendance.employee.lastName}`] = attendance.attended? 1 : 0;
        
      }
      records.push(record)
      begginingDay = begginingDay.add(1,'days')

    };
  //  console.log(records)
    var xls = json2xls(records);
    const filename = `monthly-report-${Date.now()}.xlsx`
    const filePath = __dirname+`/server/reports/${filename}`

fs.writeFileSync(filePath, xls, 'binary');
return filename
} catch (err) {
  console.log(err)
}
    
  }
  monthlyReport() {
    let job = new CronJob(
      "0 0 8 1 * *", //"5 * * * * *", 
      async () => {
        console.log("Sending Monthly report status..");
        const filename= await this.jsonTOExcel()
          console.log("Sending monthly email....");
            const html =  `<p> You can download the monthly attendance spreadsheet <a href="${config.origin}/api/attendance/monthly-report/${filename}">Download here</a></p>`
            console.log(html)
            try {
                await this.sendEmail("Monthly report",html)
                console.log("Email sent ;)");
            } catch (ex) {
                console.log('Error while sending daily email: %s',ex)
            }
      },
      null,
      true,
      "America/Los_Angeles"
    );
    job.start();
  }
  generateOneTimeLink() {
    return Token.create({}).then((token) => {
       console.log("token");
        if(!token) return `?token=error`
        return `${config.origin}?token=${token.id}`
    }).catch((err) => {
        console.log(err)
        return `${config.origin}?token=error`
    });
  }
}

const worker = new MainWorker(
  "mail.smtp2go.com",
  2525,
  "info@kolleris.com",
  "Prof@15@1f1femsk",
  "dmuchengapadare@gmail.com"
);


module.exports = worker
