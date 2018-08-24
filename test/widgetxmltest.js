var mocha = require('mocha');
var jsdom = require('jsdom');
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
    it('',function () {

        var LayoutLzg = require('../dist/output');
        let xml = `<Button name="sdf" width="auto" horizonAlignment="Right" height="33" verticalAlignment="Center">
    
    
    
        </Button>`;

        let parser = new LayoutLzg.MetaWidgetParser(LayoutLzg.getDefaultStringSerializerProvider(),LayoutLzg.getDefaultXmlSerializerProvider());
        let w = parser.parseWidget(xml);
        console.log(w);
        let serializer = new LayoutLzg.MetaWidgetSerializer(LayoutLzg.getDefaultStringSerializerProvider(),LayoutLzg.getDefaultXmlSerializerProvider());
        let xmlout = serializer.serializeWidget(w);
        console.log(xmlout);



    })
});