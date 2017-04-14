module.exports = async function(event, statusCode = 200, body = '', headers = undefined) 
{
        event.response.statusCode = statusCode;
        event.response.body = body;
        
        if(headers)
        {
                event.response.headers = Object.assign(event.response.headers, headers);
        }
        
        this.continue();
};