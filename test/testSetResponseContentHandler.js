const assert = require('chai').assert;
const sinon = require('sinon');
const Configurapi = require('configurapi');

const setResponseBodyHandler = require('../src/setResponseBodyHandler');

describe('setResponseBodyHandler', function() {
    it("Set body properly", async function()
    {    
        let continueSpy = sinon.spy();
        let context = {continue:continueSpy};

        let ev = sinon.mock(Configurapi.Event);
        
        ev.response = new Configurapi.Response();
        
        await setResponseBodyHandler.apply(context, [ev, "hi there"]);

        assert.equal("hi there", ev.response.body)
        assert.isTrue(continueSpy.calledOnce);
    });
});