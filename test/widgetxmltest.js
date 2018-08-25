var mocha = require('mocha');
var jsdom = require('jsdom');
var should = require('should');

const { JSDOM } = jsdom;
const doc = new JSDOM(``);

global.window = doc.window;
global.document = doc.window.document;
global.DOMParser = doc.window.DOMParser;

var jq = require("../js/jquery.min");
global.jQuery = jq;
global.$ = jq;
require("../dist/output");



describe('widget的xml序列化和反序列化', function () {
    var LayoutLzg = require('../dist/output');
    it('Button序列化和反序列化',function () {
        let xml = `<Button name="sdf" width="auto" horizonAlignment="Right" height="33" verticalAlignment="Center"></Button>`;
        with (LayoutLzg) {
            let parser = new MetaWidgetParser(getDefaultStringSerializerProvider(),getDefaultXmlSerializerProvider());
            let w = parser.parseWidget(xml);
            console.log(w);
            let serializer = new MetaWidgetSerializer(getDefaultStringSerializerProvider(),getDefaultXmlSerializerProvider());
            let xmlout = serializer.serializeWidget(w);
            console.log(xmlout);

            w.width.type.should.equal(DistanceType.auto);
            w.horizonAlignment.should.equal(HorizonAlignment.Right);
        }
    })
});