const assert = require('chai').assert;
const sinon = require('sinon');
const Configurapi = require('configurapi');

const validateEmptyRequestPayloadHandler = require('../src/validateEmptyRequestPayloadHandler');

describe('validateEmptyRequestPayloadHandler', function() {
    it("Empty payload", async function()
    {    
        let ev = sinon.mock(Configurapi.Event);
        ev.resolve = (e) => {return e;};
        ev.request = new Configurapi.Request();        
        ev.response = new Configurapi.Response();
        
        let continueSpy = sinon.spy();
        let completeSpy = sinon.spy();
        let context = {continue:continueSpy,complete:completeSpy};

        validateEmptyRequestPayloadHandler.apply(context, [ev]);

        assert.equal(200, ev.response.statusCode);
        assert.isFalse(continueSpy.calledOnce);
        assert.isFalse(completeSpy.calledOnce);
    });

    it("Non-empty payload", async function()
    {    
        let ev = sinon.mock(Configurapi.Event);
        ev.resolve = (e) => {return e;};  
        ev.request = new Configurapi.Request();      
        ev.response = new Configurapi.Response();
        ev.request.payload = "Hi";
        
        let continueSpy = sinon.spy();
        let completeSpy = sinon.spy();
        let context = {continue:continueSpy,complete:completeSpy};

        validateEmptyRequestPayloadHandler.apply(context, [ev]);

        assert.equal(400, ev.response.statusCode);
        assert.isFalse(continueSpy.calledOnce);
        assert.isTrue(completeSpy.calledOnce);
    });
});
