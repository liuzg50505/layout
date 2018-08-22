namespace LayoutLzg {
    export function xmlTag(xml:string):string {
        return null;
    }

    export function xmlChildren(xml:string):Array<string> {
        return null;
    }

    export function xmlGetChildByTag(xml: string, childTagName: string):string {
        return null;
    }

    export function xmlGetFirstChild(xml: string):string {
         return null;
    }

    export function xmlContainAttribute(xml: string, attrName: string):boolean {
        return false;
    }

    export function xmlContainChildTag(xml: string, childTagName: string):boolean {
        return false;
    }

    export function xmlGetAttribute(xml: string, attrName:string):string {
        return null;
    }

    export function xmlSetAttribute(xml:string, attrName:string, value:any):string {
        if(value==null) value = "";
        return null;
    }

    export function xmlSetText(xml: string, text: string):string {
        return null;
    }

    export function xmlGetText(xml: string):string {
        return null;
    }

    export function xmlAddChild(xml: string, child: string):string {
        return null;
    }

    export function xmlRemoveChild(xml:string, childIndex:number):string {
        return null;
    }

    export function xmlClearChildren(xml: string):string {
        return null;
    }
}