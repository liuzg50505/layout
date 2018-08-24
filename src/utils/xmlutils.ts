namespace LayoutLzg {

    export class XmlWrapper{
        elem: Element;

        constructor(elem?: Element|string) {
            if(typeof elem === "string") {
                let parser = new DOMParser();
                this.elem = <Element>parser.parseFromString(elem,"text/xml").childNodes[0];
            } else {
                this.elem = elem;
            }
        }

        get tagName(): string {
            return this.elem.nodeName;
        }

        get nodeName(): string {
            return this.elem.nodeName;
        }

        get children(): Array<XmlWrapper>{
            let result:Array<XmlWrapper> = [];
            let node = this.elem;
            for (let i=0;i<node.childNodes.length;i++) {
                let child = node.childNodes[i];
                let wrapper = new XmlWrapper();
                wrapper.elem = <Element>child;
                result.push(wrapper);
            }
            return result;
        }

        forEach(callback:(i:number,item:XmlWrapper)=>any) {
            let arr = this.children;
            for (let i=0;i<arr.length;i++){
                let item = arr[i];
                if(callback) {
                    let r = callback(i,item);
                    if(r) break;
                }
            }
        }

        toString():string {
            return this.elem.outerHTML;
        }

        firstChild(): XmlWrapper {
            if(this.elem.childNodes.length>0) {
                let wrapper = new XmlWrapper();
                wrapper.elem = <Element>this.elem.childNodes[0];
                return wrapper;
            }
            return null;
        }

        lastChild():XmlWrapper {
            if(this.elem.childNodes.length>0) {
                let wrapper = new XmlWrapper();
                wrapper.elem = <Element>this.elem.childNodes[this.elem.childNodes.length-1];
                return wrapper;
            }
            return null;
        }

        attr(...args:any[]):XmlWrapper|string {
            if(args.length==1) {
                let name = <string>args[0];
                if(this.elem.hasAttribute(name)){
                    return this.elem.getAttribute(name);
                }
            }else if(args.length==2) {
                let name = <string>args[0];
                let value= args[1];
                this.elem.setAttribute(name,value);
            }
            return this;
        }

        getChildByTag(tagName:string): XmlWrapper{
            for (let child of this.children) {
                if(child.tagName==tagName) {
                    return child;
                }
            }
            return null;
        }

        hasAttr(name:string):boolean {
            return this.elem.hasAttribute(name);
        }

        hasChildByTag(tagName:string):boolean {
            for (let child of this.children) {
                if(child.tagName==tagName) {
                    return true;
                }
            }
            return false;
        }

        text(...args:any[]):XmlWrapper|string {
            if(args.length==0) {
                return this.elem.textContent;
            }else if(args.length==1) {
                let text = <string>args[0];
                this.elem.textContent = text;
            }
            return this;
        }

        appendChild(elem:XmlWrapper|Element):XmlWrapper {
            if (elem instanceof XmlWrapper) {
                this.elem.appendChild(elem.elem);
            }else{
                this.elem.appendChild(elem);
            }
            return this;
        }

        removeChild(elem:XmlWrapper|Element):XmlWrapper {
            if (elem instanceof XmlWrapper) {
                this.elem.removeChild(elem.elem);
            }else{
                this.elem.removeChild(elem);
            }
            return this;
        }

        emptyChildren():XmlWrapper {
            let arr:any = [];
            for (let i=0;i<this.elem.childNodes.length;i++) {
                let child = <Element>this.elem.childNodes[i];
                arr.push(child);
            }
            for (let child of arr) {
                this.elem.removeChild(child);
            }
            return this;
        }
    }
}