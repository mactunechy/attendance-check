/*
* Requests logger
*/

//Dependencies 
// const errorLogger = require('../lib/errorLogger')




module.exports = async function(req,res,next){
	let {method,path,body,params,id,headers,query} = req;
	const str = method.toUpperCase() + path ;
	var data = {url:str};
	if(body) data.body = body;
	if(query) data.query = query;
	if(params) data.params = params;
	if(headers)data.contentType = req.header('content-type')
	if(req.header('x-auth-token')) data.token = req.header('x-auth-token');
	// await errorLogger(data)
	console.log(data);

	next();
	
}