const assert = require('chai').assert;
const sinon = require('sinon');
const Configurapi = require('configurapi');

const setResponseStatusCodeHandler = require('../src/setResponseStatusCodeHandler');

describe('setResponseStatusCodeHandler', function() {
    it("Set status properly", async function()
    {    
        let ev = sinon.mock(Configurapi.Event);
        
        ev.response = new Configurapi.Response();
        
        setResponseStatusCodeHandler.apply(context, [ev, 302]);

        assert.equal(302, ev.response.statusCode);
    });
});