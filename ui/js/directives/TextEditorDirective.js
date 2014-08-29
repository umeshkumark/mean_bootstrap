/* 
 * file - TextEditorDirective.js 
 * desc - Angular Directive for initializing & displaying Summer Note text editor
 * author - Umesh Kumar
 * email - umeshkumark@outlook.com
 * github - https://github.com/ukbokamalla
 */

meanBootstrapPortal.directive('summerNoteEditor',function(){
    console.log('meanBootstrapPortal#summerNoteEditor');
    return{
            restrict: 'EA',
            link: function(scope,element,attributes){
                // Initialize Summer Note Text Editor
                $(element).summernote({
                    height: attributes.editorHeight,
                    focus: attributes.editorFocus
                });
            }
    };
});


