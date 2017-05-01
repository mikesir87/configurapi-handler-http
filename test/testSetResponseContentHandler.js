const assert = require('chai').assert;
const sinon = require('sinon');
const Configurapi = require('configurapi');

const setResponseBodyHandler = require('../src/setResponseBodyHandler');

describe('setResponseBodyHandler', function() {
    it("Set body properly", async function()
    {    
        let ev = sinon.mock(Configurapi.Event);
        ev.resolve = (e) => {return e;};        
        ev.response = new Configurapi.Response();
        
        setResponseBodyHandler.apply(context, [ev, "hi there"]);

        assert.equal("hi there", ev.response.body);
    });
});
