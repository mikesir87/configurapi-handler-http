module.exports = function(event, headerName, headerValue) 
{
        event.response.headers[headerName] = headerValue;
};