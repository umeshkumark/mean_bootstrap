/* 
 * file - SiteMgmtBlogCtrl.js 
 * desc - Angular Controller for the Blog submenu under Site Management Menu
 * author - Umesh Kumar
 * email - umeshkumark@outlook.com
 * github - https://github.com/ukbokamalla
 */

meanBootstrapPortal.controller('SiteMgmtBlogCtrl',function($scope,blogService){
    console.log('SiteMgmtBlogCtrl...');
    // Initialize variables when the Site_Mgmt_Blog.html is opened
    $scope.isBlogSave = true;
    $scope.isBlogUpdate = false;
    $scope.sectionList = [];
    $scope.blogList = [];
    $scope.selectedSection='Select Section';
    $scope.selectedSectionGrid='Select Section';
    $scope.selectedSectionID='';
    $scope.selectedSectionIDGrid='';
    $scope.selectedBlogContent={};
    
    var sections = blogService.getBlogSectionList();
    sections.then(function(data){
        $scope.sectionList = data;
    });
    
    // Called when the User clicks on the SAVE button
    $scope.onBlogSave = function(){
        console.log('SiteMgmtBlogCtrl#onBlogSave()');
        if($scope.selectedSectionID < 1){
            console.log('Select any Section');
            alert('Select any Section');
            return false;
        }
        // get the html formatted text
        var blogContents = $('#BlogEditor').code();
        var blogJSON = {
            sectionID:$scope.selectedSectionID,
            blogText:blogContents        
        };
        // Save
        var isSaved = blogService.saveBlog(blogJSON);
        // refresh the grid
        isSaved.then(function(data){
            console.log('No of Blogs returned : ' + data.length);
            $scope.blogList = data;
            // Reset the editor
            $('#BlogEditor').code('');
        });
    };
    
    // Called when the User clicks on the UPDATE button
    $scope.onBlogUpdate = function(){
        console.log('SiteMgmtBlogCtrl#onBlogUpdate()');
        if($scope.selectedSectionID < 1){
            console.log('Select any Section');
            alert('Select any Section');
            return false;
        }
        // get the html formatted text
        var blogContents = $('#BlogEditor').code();
        var blogJSON = {
            sectionID:$scope.selectedSectionID,
            blogText:blogContents,
            creationDate:$scope.selectedBlogContent.creationDate
        };
        var blogId = $scope.selectedBlogContent._id;
        // Save
        var isSaved = blogService.updateBlog(blogJSON,blogId);
        // refresh the grid
        isSaved.then(function(data){
            console.log('No of Blogs returned : ' + data.length);
            $scope.blogList = data;
            // Reset the editor
            $('#BlogEditor').code('');
            $scope.isBlogSave = true;
            $scope.isBlogUpdate = false;
        });
    };
    
    // Called when the User clicks on the RESET button
    $scope.onBlogReset = function(){
        console.log('SiteMgmtBlogCtrl#onBlogReset()');
        $('#BlogEditor').code('');
        $scope.isBlogSave = true;
        $scope.isBlogUpdate = false;
    };
    
    // Called when the User clicks on the EDIT button in the Grid
    $scope.onBlogEdit = function(selectedRow){
        console.log('SiteMgmtBlogCtrl#onBlogEdit()');
        // get the formatted html
        var blogHtml = selectedRow.entity.blog_html;
        $('#BlogEditor').code(blogHtml);
        $scope.isBlogSave = false;
        $scope.isBlogUpdate = true;
        $scope.selectedBlogContent = selectedRow.entity;
        $scope.selectedSectionID = selectedRow.entity.section_id;
    };
    
    // Called when the User clicks on the DELETE button in the Grid
    $scope.onBlogDelete = function(selectedRow){
        console.log('SiteMgmtBlogCtrl#onBlogDelete()');
        var selectedBlogID = selectedRow.entity._id;
        var isDeleted = blogService.deleteBlog(selectedBlogID,$scope.selectedSectionIDGrid);
        isDeleted.then(function(data){
            console.log('No of Blogs returned : ' + data.length);
            $scope.blogList = data;
            $scope.isBlogSave = true;
            $scope.isBlogUpdate = false;
        });
    };
    
    // Called when the User selects a Section from the drop down
    $scope.onSectionChange = function(element){
        console.log('SiteMgmtBlogCtrl#onSectionChange()');
        $scope.selectedSectionID=element.selectedSection;
        $scope.isBlogSave = true;
        $scope.isBlogUpdate = false;
    };
    
    // Called when the User selects a Section from the drop down in the Grid
    $scope.onSectionChangeGrid = function(element){
        console.log('SiteMgmtBlogCtrl#onSectionChangeGrid()');
        $scope.selectedSectionIDGrid=element.selectedSectionGrid;
        if($scope.selectedSelecttionIDGrid < 1 ) {
            return false;
        }
        // Get the list of blogs to be displayed in the Grid for the selected section
        var blogs = blogService.getBlogList($scope.selectedSectionIDGrid);
        blogs.then(function(data){
            console.log('No of Blogs returned : ' + data.length);
            console.dir(data);
            $scope.blogList = data;
        });
    };
    
    // Populate the Grid
    $scope.blogGridOptions = {
        data:'blogList',
        rowHeight:50,
        columnDefs: [
            {field:'creationDate', displayName:'Created On',width:150,
            cellTemplate:'<div class="ngCellText" ng-class="col.colIndex()"><span>{{row.getProperty(\'creationDate\') | date:\'dd-MM-yyyy HH:mm\' }}</span></div>'},
            {field:'updationDate', displayName:'Updated On',width:150,
            cellTemplate:'<div class="ngCellText" ng-class="col.colIndex()"><span>{{row.getProperty(\'updationDate\') | date:\'dd-MM-yyyy HH:mm\' }}</span></div>'},
            {field:'blog_html', displayName:'Contents',
            cellTemplate:'<div class="ngCellText" ng-class="col.colIndex()"><span class="contentEllipses">{{row.getProperty(\'blog_html\')}}</span></div>'},
            {field:'edit', displayName:'Edit',width:50,
            cellTemplate:'<div class="ngCellText" ng-class="col.colIndex()"><a href="#"><i class="fa fa-pencil fa-fw" ng-click="onBlogEdit(row)"></i></a></div>'},
            {field:'delete', displayName:'Delete',width:75,
            cellTemplate:'<div class="ngCellText" ng-class="col.colIndex()"><a href="#"><i class="fa fa-trash-o fa-fw" ng-click="onBlogDelete(row)"></i></a></div>'}
        ],
        multiSelect: false,
        enableRowSelection:false,
        selectedItems: []
    };
    
});

