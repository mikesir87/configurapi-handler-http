const Response = require('configurapi').Response;

function setAllowOrigin(event, allowOrigin)
{
    let result = undefined;

    if(allowOrigin === true)
    {
        result = event.request.headers['origin'];
    }
    else if(Array.isArray(allowOrigin))
    {
        result = allowOrigin.join(',');
    }
    else if(typeof allowOrigin === 'string')
    {
        regex = new RegExp(allowOrigin);
        
        if(regex.test(event.request.headers['origin']))
        {
            result = event.request.headers['origin'];
        }
    }

    if(result)
    {
        event.response.headers['Access-Control-Allow-Origin'] = result;
    }
}

function setAllowMethods(event, allowMethods)
{
    let result = allowMethods ? allowMethods : event.request.headers['access-control-request-method'];

    if(result)
    {
        event.response.headers['Access-Control-Allow-Methods'] = result;
    }
}

function setAllowHeaders(event, allowHeaders)
{
    let result =  allowHeaders ? allowHeaders : event.request.headers['access-control-request-headers'];

    if(result)
    {
        event.response.headers['Access-Control-Allow-Headers'] = result;
    }
}

function setAllowCredentials(event, allowCredentials)
{
    if(allowCredentials)
    {
        event.response.headers['Access-Control-Allow-Credentials'] = allowCredentials;
    }
}

function setMaxAge(event, maxAge)
{
    if(maxAge)
    {
        event.response.headers['Access-Control-Max-Age'] = maxAge;
    }
}


function setExposeHeaders(event, exposeHeaders)
{
    if(exposeHeaders)
    {
        event.response.headers['Access-Control-Expose-Headers'] = exposeHeaders;
    }
}

module.exports = function(event, allowOrigin, allowMethods, allowHeaders, allowCredentials, maxAge, exposeHeaders) 
{
    setAllowMethods(event, allowMethods);
    setAllowHeaders(event, allowHeaders);
    setAllowOrigin(event, allowOrigin);

    setAllowCredentials(event, allowCredentials);
    setMaxAge(event, maxAge);
    setExposeHeaders(event, exposeHeaders);
};