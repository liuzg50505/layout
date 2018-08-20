namespace LayoutLzg {
    export function eventTransparentDiv(divSelector:any) {
        $(divSelector).css("filter","Alpha(opacity=0)");
        $(divSelector).css("pointer-events","none");
    }
}