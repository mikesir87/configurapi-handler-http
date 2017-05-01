const assert = require('chai').assert;
const sinon = require('sinon');
const Configurapi = require('configurapi');

const setResponseHandler = require('../src/setResponseHandler');

describe('setResponseHandler', function() {
    it("Set response properly", async function()
    {    
        let ev = sinon.mock(Configurapi.Event);
        ev.resolve = (e) => {return e;};        
        ev.response = new Configurapi.Response();
        
        let headers = {'X-Header-1': 'Header value 1', 'X-Header-2': 'Header value 2'};
        setResponseHandler.apply(context, [ev, 404, 'Not found', headers]);

        assert.equal(404, ev.response.statusCode);
        assert.equal('Not found', ev.response.body);
        assert.equal('Header value 1', ev.response.headers['X-Header-1']);
        assert.equal('Header value 2', ev.response.headers['X-Header-2']);
    });

    it("Keep existing headers", async function()
    {    
        let ev = sinon.mock(Configurapi.Event);
        ev.resolve = (e) => {return e;};
        ev.response = new Configurapi.Response();
        ev.response.headers = {'X-Header-3': 'Header value 3'};
        
        let headers = {'X-Header-1': 'Header value 1', 'X-Header-2': 'Header value 2'};
        setResponseHandler.apply(context, [ev, undefined, undefined, headers]);

        assert.equal('Header value 1', ev.response.headers['X-Header-1']);
        assert.equal('Header value 2', ev.response.headers['X-Header-2']);
        assert.equal('Header value 3', ev.response.headers['X-Header-3']);
    });
});
