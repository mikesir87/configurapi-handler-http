const ErrorResponse = require('configurapi').ErrorResponse;

module.exports = function validateEmptyPayloadHandler(event)
{
    if(event.request.payload && event.request.payload !== '')
    {
        event.response = new ErrorResponse('Request payload should be empty.', 400);
        this.complete();
    }
}