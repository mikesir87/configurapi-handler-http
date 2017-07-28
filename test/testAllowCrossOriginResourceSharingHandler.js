const assert = require('chai').assert;
const sinon = require('sinon');
const Configurapi = require('configurapi');

const setResponseHandler = require('../src/allowCrossOriginResourceSharingHandler');

describe('allowCrossOriginResourceSharingHandler', function() {

    it("Set origin - true", async function()
    {    
        let ev = sinon.mock(Configurapi.Event);
        
        ev.request = new Configurapi.Request();    
        ev.response = new Configurapi.Response();
        ev.request.headers = {'origin': 'example.com'};

        setResponseHandler.apply(context, [ev, true]);

        assert.equal(ev.response.headers['Access-Control-Allow-Origin'], 'example.com');
    });

    it("Set origin - false", async function()
    {    
        let ev = sinon.mock(Configurapi.Event);
        
        ev.request = new Configurapi.Request();         
        ev.response = new Configurapi.Response();
        ev.request.headers = {'origin': 'example.com'};

        setResponseHandler.apply(context, [ev, false]);

        assert.isFalse('Access-Control-Allow-Origin' in ev.response.headers);
    });

    it("Set origin - unset", async function()
    {    
        let ev = sinon.mock(Configurapi.Event);
        
        ev.request = new Configurapi.Request();    
        ev.response = new Configurapi.Response();
        ev.request.headers = {'origin': 'example.com'};

        setResponseHandler.apply(context, [ev, undefined]);

        assert.isFalse('Access-Control-Allow-Origin' in ev.response.headers);
    });

    it("Set origin - string", async function()
    {    
        let ev = sinon.mock(Configurapi.Event);
       
        ev.request = new Configurapi.Request();         
        ev.response = new Configurapi.Response();
        ev.request.headers = {'origin': 'example.com'};

        setResponseHandler.apply(context, [ev, 'example.com']);

        assert.equal(ev.response.headers['Access-Control-Allow-Origin'], 'example.com');
    });

    it("Set origin - string - unmatched", async function()
    {    
        let ev = sinon.mock(Configurapi.Event);
        
        ev.request = new Configurapi.Request();         
        ev.response = new Configurapi.Response();
        ev.request.headers = {'origin': 'unmatched.com'};

        setResponseHandler.apply(context, [ev, 'example.com']);

        assert.isFalse('Access-Control-Allow-Origin' in ev.response.headers);
    });

    it("Set origin - regex", async function()
    {    
        let ev = sinon.mock(Configurapi.Event);
        
        ev.request = new Configurapi.Request();         
        ev.response = new Configurapi.Response();
        ev.request.headers = {'origin': 'sub.example.com'};

        setResponseHandler.apply(context, [ev, '.*\.example.com']);

        assert.equal(ev.response.headers['Access-Control-Allow-Origin'], 'sub.example.com');
    });

    it("Set origin - regex - unmatched", async function()
    {    
        let ev = sinon.mock(Configurapi.Event);
          
        ev.request = new Configurapi.Request();         
        ev.response = new Configurapi.Response();
        ev.request.headers = {'origin': 'example.com'};

        setResponseHandler.apply(context, [ev, '.*\.example.com']);

        assert.isFalse('Access-Control-Allow-Origin' in ev.response.headers);
    });

    it("Set origin - array", async function()
    {    
        let ev = sinon.mock(Configurapi.Event);
        
        ev.request = new Configurapi.Request();         
        ev.response = new Configurapi.Response();
        ev.request.headers = {'origin': 'b.com'};

        setResponseHandler.apply(context, [ev, ['a.com', 'b.com', 'c.com']]);

        assert.equal(ev.response.headers['Access-Control-Allow-Origin'], 'a.com,b.com,c.com');
    });

    it("Set method", async function()
    {    
        let ev = sinon.mock(Configurapi.Event);
        
        ev.request = new Configurapi.Request();         
        ev.response = new Configurapi.Response();

        ev.method = 'options';
        ev.request.headers['access-control-request-method'] = 'POST';

        setResponseHandler.apply(context, [ev, undefined, 'POST,PUT']);

        assert.equal(ev.response.headers['Access-Control-Allow-Methods'], 'POST,PUT');
    });

    it("Set method - unset", async function()
    {    
        let ev = sinon.mock(Configurapi.Event);
        
        ev.request = new Configurapi.Request();         
        ev.response = new Configurapi.Response();

        setResponseHandler.apply(context, [ev, undefined, undefined]);

        assert.isFalse('Access-Control-Allow-Methods' in ev.response.headers);
    });

    it("Set method - access-control-request-method present", async function()
    {    
        let ev = sinon.mock(Configurapi.Event);
        
        ev.request = new Configurapi.Request();         
        ev.response = new Configurapi.Response();
        ev.method = 'options';
        ev.request.headers = {'access-control-request-method': 'PATCH,DELETE'};

        setResponseHandler.apply(context, [ev, undefined, undefined]);

        assert.equal(ev.response.headers['Access-Control-Allow-Methods'], 'PATCH,DELETE');
    });

    it("Set method - not set on non-preflight request", async function()
    {    
        let ev = sinon.mock(Configurapi.Event);
        
        ev.request = new Configurapi.Request();         
        ev.response = new Configurapi.Response();
        ev.method = 'get';
        ev.request.headers = {'access-control-request-method': 'GET'};

        setResponseHandler.apply(context, [ev, undefined, undefined]);

        assert.isFalse('Access-Control-Allow-Methods' in ev.response.headers);
    });

    it("Set allow headers", async function()
    {    
        let ev = sinon.mock(Configurapi.Event);
        
        ev.request = new Configurapi.Request();         
        ev.response = new Configurapi.Response();
        ev.method = 'options';
        ev.request.headers = {'access-control-request-method': 'POST'};

        setResponseHandler.apply(context, [ev, undefined, undefined, 'X-Header1,X-Header2']);

        assert.equal(ev.response.headers['Access-Control-Allow-Headers'], 'X-Header1,X-Header2');
    });

    it("Set allow headers - unset", async function()
    {    
        let ev = sinon.mock(Configurapi.Event);
        
        ev.request = new Configurapi.Request();         
        ev.response = new Configurapi.Response();

        setResponseHandler.apply(context, [ev]);

        assert.isFalse('Access-Control-Allow-Headers' in ev.response.headers);
    });

    it("Set allow headers - access-control-request-method present", async function()
    {    
        let ev = sinon.mock(Configurapi.Event);
        
        ev.request = new Configurapi.Request();         
        ev.response = new Configurapi.Response();
        ev.method = 'options';
        ev.request.headers = {
            'access-control-request-method': 'POST',
            'access-control-request-headers': 'X-Header3,X-Header4'
        };

        setResponseHandler.apply(context, [ev]);

        assert.equal(ev.response.headers['Access-Control-Allow-Headers'], 'X-Header3,X-Header4');
    });

    it("Set allow headers - not set on non-preflight request", async function()
    {
        let ev = sinon.mock(Configurapi.Event);
        
        ev.request = new Configurapi.Request();         
        ev.response = new Configurapi.Response();
        ev.method = 'get';
        ev.request.headers = {
            'access-control-request-headers': 'X-Header3,X-Header4'
        };

        setResponseHandler.apply(context, [ev]);

        assert.isFalse('Access-Control-Allow-Headers' in ev.response.headers);
    });

    it("Set allow credentials", async function()
    {    
        let ev = sinon.mock(Configurapi.Event);
        
        ev.request = new Configurapi.Request();         
        ev.response = new Configurapi.Response();

        setResponseHandler.apply(context, [ev, undefined, undefined, undefined, 'Credentials']);

        assert.equal(ev.response.headers['Access-Control-Allow-Credentials'], 'Credentials');
    });

    it("Set allow credentials - unset", async function()
    {    
        let ev = sinon.mock(Configurapi.Event);
        
        ev.request = new Configurapi.Request();         
        ev.response = new Configurapi.Response();

        setResponseHandler.apply(context, [ev]);

        assert.isFalse('Access-Control-Allow-Credentials' in ev.response.headers);
    });

    it("Set max age", async function()
    {    
        let ev = sinon.mock(Configurapi.Event);
        
        ev.request = new Configurapi.Request();         
        ev.response = new Configurapi.Response();
        ev.method = 'options';
        ev.request.headers = {'access-control-request-method': 'POST'};

        setResponseHandler.apply(context, [ev, undefined, undefined, undefined, undefined, 100]);

        assert.equal(ev.response.headers['Access-Control-Max-Age'], 100);
    });

    it("Set max age - not set on non-preflight request", async function()
    {    
        let ev = sinon.mock(Configurapi.Event);
        
        ev.request = new Configurapi.Request();         
        ev.response = new Configurapi.Response();
        ev.method = 'get';

        setResponseHandler.apply(context, [ev, undefined, undefined, undefined, undefined, 100]);

        assert.isFalse('Access-Control-Max-Age' in ev.response.headers);
    });

    it("Set max age - unset", async function()
    {    
        let ev = sinon.mock(Configurapi.Event);
        
        ev.request = new Configurapi.Request();         
        ev.response = new Configurapi.Response();

        setResponseHandler.apply(context, [ev]);

        assert.isFalse('Access-Control-Max-Age' in ev.response.headers);
    });

    it("Set expose headers", async function()
    {    
        let ev = sinon.mock(Configurapi.Event);
        
        ev.request = new Configurapi.Request();         
        ev.response = new Configurapi.Response();

        setResponseHandler.apply(context, [ev, undefined, undefined, undefined, undefined, undefined, 'X-Header1,X-Header2']);

        assert.equal(ev.response.headers['Access-Control-Expose-Headers'], 'X-Header1,X-Header2');
    });

    it("Set expose headers - unset", async function()
    {    
        let ev = sinon.mock(Configurapi.Event);
        
        ev.request = new Configurapi.Request();         
        ev.response = new Configurapi.Response();

        setResponseHandler.apply(context, [ev]);

        assert.isFalse('Access-Control-Expose-Headers' in ev.response.headers);
    });

});
