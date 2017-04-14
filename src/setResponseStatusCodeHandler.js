module.exports = async function(event, statusCode) 
{
        event.response.statusCode = statusCode;
        this.continue();
};