module.exports = function(event, statusCode) 
{
        event.response.statusCode = statusCode;
};