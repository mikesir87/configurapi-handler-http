module.exports = function(event, body) 
{
        event.response.body = event.resolve(body);
};
