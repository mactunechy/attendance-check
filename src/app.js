/**
 * Appication bootstrapping 
 */

 //Dependencies
const app = require('./server');
const init = require('./server/lib/clustering')
const worker = require("./worker")


//Starting
//init(app)

async function boot(){
 await app()
     const att = await worker.jsonTOExcel()
    // const link = await worker.genetateOneTimeLink()
    // await worker.sendEmail("testing email",`<h2>Hello world test</h2>`)
// console.log(link)


}

boot()