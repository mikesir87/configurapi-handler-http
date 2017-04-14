const setResponseHandler = require('./setResponseHandler');

module.exports = async function(event, statusCode = 200, body = '', headers = undefined) 
{
        setResponseHandler.apply({continue:()=>{}}, [event, statusCode, body, headers]);

        if(!('Content-Type' in event.response.headers))
        {
                event.response.headers['Content-Type'] = 'application/json';
        }
        
        this.continue();
};