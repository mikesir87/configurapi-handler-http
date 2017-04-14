const assert = require('chai').assert;
const sinon = require('sinon');
const Configurapi = require('configurapi');

const setResponseHeaderHandler = require('../src/setResponseHeaderHandler');

describe('setResponseHeaderHandler', function() {
    it("Set header properly", async function()
    {    
        let continueSpy = sinon.spy();
        let context = {continue:continueSpy};

        let ev = sinon.mock(Configurapi.Event);
        
        ev.response = new Configurapi.Response();
        
        await setResponseHeaderHandler.apply(context, [ev, 'X-Header', 'Header value 1']);

        assert.equal('Header value 1', ev.response.headers['X-Header'])
        assert.isTrue(continueSpy.calledOnce);
    });
});