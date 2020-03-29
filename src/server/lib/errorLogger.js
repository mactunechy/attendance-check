/*Simple function for logging errors to a log file */


//Dependencies
const fs = require('fs')
const path = require('path')


module.exports = ( error) => {
    const filename = `log-${Date.now()}.log`
    const filePath = path.join(__dirname,'/../logs/'+filename)
    fs.writeFile(filePath,JSON.stringify(error),error =>  {
        if(error) console.log(error)
    } )
}