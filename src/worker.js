/*
 performs non server tasks.. 
 - scheduled email sending
*/

//Dependencies
const nodemailer = require("nodemailer");
const CronJob = require("cron").CronJob;
const Token = require('./server/models/Token')


class MainWorker {
  constructor(smtpServer, smtpPort, user, password) {
    this.config = {
      smtpServer,
      smtpPort,
      user,
      password
    };
  }
  async sendEmail(subject, html) {
    let transporter = nodemailer.createTransport({
      host: this.smtpServer,
      port: this.smtpPort,
      secure: false,
      auth: {
        user: this.user,
        pass: this.password
      }
    });

    try {
      let info = await transporter.sendMail({
        from: "Kolleris, <info@kolleris.com>",
        to: "",
        subject,
        html
      });
      console.log("Message sent %s", info.messageId);
    } catch (ex) {
      console.log("Error occured while try to send email: %s", ex);
    }
  }
  dailyRegister() {
    let job = new CronJob(
      "0 0 8 * * 1-6",
      function() {
        console.log("Sending daily email....");
          const html =  `<p> Please fill in the daily  <a href="${this.genetateOneTimeLink()}">register here</a></p>`
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
  monthlyReport() {
    let job = new CronJob(
      "0 0 8 1 * *",
      function() {
        console.log("Sending Monthly report status..");
      },
      null,
      true,
      "America/Los_Angeles"
    );
    job.start();
  }
  genetateOneTimeLink() {
    Token.create({}).then((token) => {
        console.log("error during token creation")
        if(!token) return `/register?token=error`
        return `/register?token=${token.id}`
    }).catch((err) => {
        console.log(err)
        return `/register?token=error`
    });
  }
}

const worker = new MainWorker(
  mail.smtp2go.com,
  2525,
  "info@kolleris.com",
  "1f1femsk"
);

module.exports = worker
