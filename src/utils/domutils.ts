namespace LayoutLzg {

    export function css(elem: any, name: string, value: any) {
        $(elem).css(name,value);
    }

    export function attr(elem: any, name: string) {
        return $(elem).attr(name);
    }

    export function setattr(elem: any, name: string, value: any) {
        $(elem).attr(name,value);
    }

    export function createElement(tag: string) {
        return document.createElement(tag);
    }

    export function appendChild(parent: any, child: any) {
        $(parent).append(child);
    }

    export function emptyChildren(elem:any){
        $(elem).empty();
    }

    export function getElemText(elem: any) {
        return $(elem).text();
    }

    export function setElemText(elem: any, text:string) {
        $(elem).text(text);
    }

    export function getElemValue(elem: any) {
        $(elem).val();
    }

    export function setElemValue(elem: any, value: any) {
        $(elem).val(value);
    }

    export function onEvent(elem:any, eventName:string, callback:Function) {
        $(elem).on(eventName,function () {
            if(callback) callback.apply(this,arguments);
        });
    }

    export function offEvent(elem: any, eventName: string, callback: any) {
        $(elem).off(eventName,callback);
    }

    export function measureElemSize(elem:HTMLElement, w:number=20000,h:number=20000) {
        let celem:any = elem.cloneNode(true);
        let bigdiv = createElement("DIV");
        bigdiv.appendChild(celem);
        css(bigdiv,"width",w+"px");
        css(bigdiv,"height",h+"px");
        let body:any = document.body;
        body.append(bigdiv);
        let ww = celem.offsetWidth;
        let hh = celem.offsetHeight;
        bigdiv.remove();
        return [ww,hh];
    }


}