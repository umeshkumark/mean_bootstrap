/* 
 * file - HtmlRenderDirective.js 
 * desc - Angular Directive for rendering html formatted text that is created by the WYSIWYG text editor
 * author - Umesh Kumar
 * email - umeshkumark@outlook.com
 * github - https://github.com/ukbokamalla
 */

meanBootstrapPortal.directive('htmlRender',function(){
    console.log('meanBootstrapPortal#htmlRender');
    return{
        restrict: 'EA',
        link: function(scope,element,attributes){
            var htmlText = attributes.contentText;
            $(element).html(htmlText);
        }
    };
});