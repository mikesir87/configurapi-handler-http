module.exports = async function(event, headerName, headerValue) 
{
        event.response.headers[headerName] = headerValue;
        this.continue();
};