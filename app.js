/**
 * Appication bootstrapping 
 */

 //Dependencies
const app = require('./src/server');
const init = require('./src/server/lib/clustering')
const worker = require("./src/worker")


//Starting
//init(app)

async function boot(){
 await app()
    // const att = await worker.jsonTOExcel()
    // const link = await worker.genetateOneTimeLink()
    // await worker.sendEmail("testing email",`<h2>Hello world test</h2>`)
// console.log(att)
    worker.dailyRegister()
    worker.monthlyReport()


}

boot()