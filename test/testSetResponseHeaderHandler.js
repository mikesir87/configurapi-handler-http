const assert = require('chai').assert;
const sinon = require('sinon');
const Configurapi = require('configurapi');

const setResponseHeaderHandler = require('../src/setResponseHeaderHandler');

describe('setResponseHeaderHandler', function() {
    it("Set header properly", async function()
    {    
        let ev = sinon.mock(Configurapi.Event);
        
        ev.response = new Configurapi.Response();
        
        setResponseHeaderHandler.apply(context, [ev, 'X-Header', 'Header value 1']);

        assert.equal('Header value 1', ev.response.headers['X-Header'])
    });
});