/* 
 * file - SiteMgmtGalleryCtrl.js 
 * desc - Angular Controller for the Gallery submenu under Site Management Menu
 * author - Umesh Kumar
 * email - umeshkumark@outlook.com
 * github - https://github.com/ukbokamalla
 */

meanBootstrapPortal.controller('SiteMgmtGalleryCtrl',function($scope,galleryService){
    console.log('SiteMgmtGalleryCtrl...');
    
    // Initialize variables
    $scope.album = {
        name:'',
        desc:''
    };
    $scope.isAlbumSave = true;
    $scope.isAlbumUpdate = false;
    $scope.albumList = [];
    $scope.albumImageList = [];
    $scope.selectedAlbum = 'Select Album';
    $scope.selectedAlbumID = '';
    $scope.selectedAlbumContents = {};
    
    // Load the list of albums
    var albums = galleryService.getAlbumList();
    albums.then(function(data){
        $scope.albumList = data;
    });
    
    // Called when the user clicks on the SAVE button
    $scope.onAlbumSave = function(){
        console.log('SiteMgmtGalleryCtrl#onAlbumSave');
        var albumJSON = {
            name:$scope.album.name,
            desc:$scope.album.desc
        };
        console.dir($scope.album);
        var isSaved = galleryService.saveAlbum(albumJSON);
        isSaved.then(function(data){
            $scope.albumList = data;
        });
    };
    
    // Called when the user clicks on the EDIT Album Name/Desc button
    $scope.onAlbumEdit = function(){
        console.log('SiteMgmtGalleryCtrl#onAlbumEdit');
        var albumDetails = galleryService.getAlbumDetailsByID($scope.selectedAlbumID);
        albumDetails.then(function(data){
            console.dir(data[0]);
            $scope.album = {
                name:data[0].name,
                desc:data[0].desc
            };
            $scope.isAlbumSave = false;
            $scope.isAlbumUpdate = true;
        });
    };
    
    // Called when the user clicks on the UPDATE button
    $scope.onAlbumUpdate = function(){
        console.log('SiteMgmtGalleryCtrl#onAlbumUpdate');
        if($scope.selectedAlbumID < 1) {
            alert('Select an Album');
            return false;
        }
        var albumJSON = {
            name:$scope.album.name,
            desc:$scope.album.desc
        };
        console.dir($scope.album);
        var isSaved = galleryService.updateAlbum(albumJSON,$scope.selectedAlbumID);
        isSaved.then(function(data){
            $scope.albumList = data;
            $scope.isAlbumSave = true;
            $scope.isAlbumUpdate = false;
        });
    };
    
    // Called when the user clicks on the DELETE button
    $scope.onAlbumDelete = function(){
        console.log('SiteMgmtGalleryCtrl#onAlbumDelete');
        var isDeleted = galleryService.deleteAlbum($scope.selectedAlbumID);
        isDeleted.then(function(data){
            $scope.albumList = data;
            $scope.isAlbumSave = true;
            $scope.isAlbumUpdate = false;
        });
    };
    
    // Called when the user clicks on the RESET button
    $scope.onAlbumReset = function(){
        console.log('SiteMgmtGalleryCtrl#onAlbumReset');
        $scope.album = {
            name:'',
            desc:''
        };
    };
    
    // Called when the user selects an Album from the drop down
    $scope.onAlbumSelect = function(element){
        console.log('SiteMgmtGalleryCtrl#onAlbumSelect');
        // get the list of all images for the album
        $scope.selectedAlbumID = element.selectedAlbum;
        var albumImages = galleryService.getAlbumImagesList($scope.selectedAlbumID);
        albumImages.then(function(data){
            console.log('No of Images returned - ' + data.length);
            $scope.albumImageList = data;
        });
    };
    
    // Called when the user adds a photo using the File Upload button
    $scope.onAddImageToAlbum = function(uploadedImage){
        console.log('SiteMgmtGalleryCtrl#onAddImageToAlbum');
        if (uploadedImage.files && uploadedImage.files[0]) {
            var albumImageForm = new FormData();
            albumImageForm.append('file', uploadedImage.files[0]);
            albumImageForm.append('imageDesc', $scope.albumImageDesc);
            albumImageForm.append('album_id',$scope.selectedAlbumID);
            var isImageUploaded = galleryService.uploadAlbumImage(albumImageForm);
                isImageUploaded.then(function(data){
                console.log('No of Images returned - ' + data.length);
                $scope.albumImageList = data;
            });
        }   
    };
    
    // Called when the user clicks on the delete button from the grid
    $scope.onDeleteImageFromAlbum = function(selectedRow){
        console.log('SiteMgmtGalleryCtrl#onAddImageToAlbum');
        var albumImage = selectedRow.entity;
        var isDeleted = galleryService.deleteAlbumImage(albumImage._id,albumImage.image_path,albumImage.album_id);
        isDeleted.then(function(data){
            console.log('No of Images returned - ' + data.length);
            $scope.albumImageList = data;
        });
    };
    
    // Populate the Grid
    $scope.galleryGridOptions = {
        data:'albumImageList',
        rowHeight:50,
        columnDefs: [
            {field:'creationDate', displayName:'Created On',width:150,
            cellTemplate:'<div class="ngCellText" ng-class="col.colIndex()"><span>{{row.getProperty(\'creationDate\') | date:\'dd-MM-yyyy HH:mm\' }}</span></div>'},
            {field:'updationDate', displayName:'Updated On',width:150,
            cellTemplate:'<div class="ngCellText" ng-class="col.colIndex()"><span>{{row.getProperty(\'updationDate\') | date:\'dd-MM-yyyy HH:mm\' }}</span></div>'},
            {field:'desc', displayName:'Image Desc',
            cellTemplate:'<div class="ngCellText" ng-class="col.colIndex()"><span class="contentEllipses">{{row.getProperty(\'desc\')}}</span></div>'},
            {field:'image_path', displayName:'Image Preview',
            cellTemplate:'<div class="ngCellText" ng-class="col.colIndex()"><img height = "75" width="75" src="./{{row.getProperty(\'image_path\')}}" /></div>'},
            {field:'delete', displayName:'Delete',width:75,
            cellTemplate:'<div class="ngCellText" ng-class="col.colIndex()"><a href="#"><i class="fa fa-trash-o fa-fw" ng-click="onDeleteImageFromAlbum(row)"></i></a></div>'}
        ],
        multiSelect: false,
        enableRowSelection:false,
        selectedItems: []
    };
    
});
