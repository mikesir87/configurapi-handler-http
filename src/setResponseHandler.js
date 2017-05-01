module.exports = function(event, statusCode = 200, body = '', headers = undefined) 
{
        event.response.statusCode = statusCode;
        event.response.body = event.resolve(body);
        
        if(headers)
        {
                event.response.headers = Object.assign(event.response.headers, headers);
        }
};
