const assert = require('chai').assert;
const sinon = require('sinon');
const Configurapi = require('configurapi');

const setResponseStatusCodeHandler = require('../src/setResponseStatusCodeHandler');

describe('setResponseStatusCodeHandler', function() {
    it("Set status properly", async function()
    {    
        let continueSpy = sinon.spy();
        let context = {continue:continueSpy};

        let ev = sinon.mock(Configurapi.Event);
        
        ev.response = new Configurapi.Response();
        
        await setResponseStatusCodeHandler.apply(context, [ev, 302]);

        assert.equal(302, ev.response.statusCode)
        assert.isTrue(continueSpy.calledOnce);
    });
});