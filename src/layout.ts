// /**
//  * Created by liuzg on 2018/7/30.
//  */
// import $ = require("jquery");
//
//
// enum HorizonAlignment {
//     Strech,
//     Left,
//     Right,
//     Center
// }
//
// enum VerticalAlignment{
//     Strech,
//     Top,
//     Bottom,
//     Center
// }
//
// class Thickness{
//     left:number;
//     right:number;
//     top:number;
//     bottom:number;
// }
//
// enum DistanceType{
//     auto,
//     fixed
// }
//
// class Distance{
//     value:number;
//     type:DistanceType;
// }
//
// class Brush{
//
// }
//
// interface SizeCalculatable {
//     actualWidth:number;
//     actualHeight:number;
//
//     calculateWidth():void;
//     calculateHeight():void;
// }
//
// class ControlBase {
//     name:string;
//     fill:Brush;
//     stroke:Brush;
//     strokeThickness:Thickness;
//     width:Distance;
//     height:Distance;
//     horizonAlignment : HorizonAlignment;
//     verticalAlignment : VerticalAlignment;
//
//     constructor(name:string){
//         this.name = name;
//         this.horizonAlignment = HorizonAlignment.Strech;
//         this.verticalAlignment = VerticalAlignment.Strech;
//     }
//
//     getHtmlElement():HTMLElement|any {
//
//     }
//
//     updateHtmlElement():void {
//
//     }
// }
//
// class ContainerBase extends ControlBase{
//     children:Array<ControlBase>;
//     constructor(name:string) {
//         super(name);
//         this.children= [];
//     }
//     doLayout():void{
//
//     }
// }
//
// enum StackPanelOrientation {
//     Horizonal,
//     Vertical
// }
//
// class AbsoluteLayoutContainer extends ContainerBase implements SizeCalculatable{
//
//     actualWidth: number;
//     actualHeight: number;
//
//     calculateWidth(): void {
//
//     }
//
//     calculateHeight(): void {
//     }
// }
//
// enum DockStyle{
//     Left,Right,Top,Bottom,Fill
// }
//
// class DockPanel extends ContainerBase implements SizeCalculatable{
//     actualWidth: number;
//     actualHeight: number;
//     actualX: number;
//     actualY: number;
//     lastChildFill:boolean;
//
//     rootElem:HTMLElement;
//     doLayout(): void {
//
//     }
// }
//
// class StackPanel extends ContainerBase {
//     orientation: StackPanelOrientation;
//     rootElem : HTMLElement;
//     constructor(name:string){
//         super(name);
//         this.rootElem = $("<div></div>")[0];
//     }
//
//     doLayout():void{
//         $(this.rootElem).empty();
//         for (var i=0;i<this.children.length;i++) {
//             var child = this.children[i];
//             if(child instanceof ContainerBase){
//                 child.doLayout();
//             }
//             $(this.rootElem).append(child.getHtmlElement());
//         }
//     }
//
//     getHtmlElement(): HTMLElement | any {
//         return this.rootElem;
//     }
//
//     updateHtmlElement(): void {
//     }
//
// }
//
// class HtmlLiteral extends ControlBase {
//     html:string;
//     constructor(name:string,html:string){
//         super(name);
//     }
//
//     rootElem: HTMLElement;
//
//     doLayout():void{
//         if(this.rootElem == null) {
//             this.rootElem = $(this.html)[0];
//         }
//     }
//
//
//     getHtmlElement(): HTMLElement | any {
//         if(this.rootElem == null) {
//             this.rootElem = $(this.html)[0];
//         }
//         return this.rootElem;
//     }
//
//     updateHtmlElement(): void {
//     }
// }
//
