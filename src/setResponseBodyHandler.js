module.exports = async function(event, body) 
{
        event.response.body = body;
        this.continue();
};