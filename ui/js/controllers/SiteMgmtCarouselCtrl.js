/* 
 * file - SiteMgmtCarouselCtrl.js 
 * desc - Angular Controller for the Carousel submenu under Site Management Menu
 * author - Umesh Kumar
 * email - umeshkumark@outlook.com
 * github - https://github.com/ukbokamalla
 */

meanBootstrapPortal.controller('SiteMgmtCarouselCtrl',function($scope,carouselService){
    console.log('meanBootstrapPortal#SiteMgmtCarouselCtrl');
    
    $scope.carouselList = [];
    $scope.isCarouselSave = true;
    $scope.isCarouseUpdate = false;
    $scope.uploadedFile;
    $scope.previewImagePath =""; 
    $scope.existingFilePath="";
    $scope.isImageUpdated = false;
    
    $scope.carousel = {
        name:"",
        desc:"",
        creationDate:"",
        updationDate:"",
        imagePath:"",
        _id:""
    };
    
    var carousels = carouselService.getCarouselList();
    carousels.then(function(data){
        console.dir(data);
        $scope.carouselList = data;
    });
    
    $scope.carouselGridOptions = {
        data:'carouselList',
        rowHeight:50,
        columnDefs: [
            {field:'creationDate', displayName:'Created On',width:150,
            cellTemplate:'<div class="ngCellText" ng-class="col.colIndex()"><span>{{row.getProperty(\'creationDate\') | date:\'dd-MM-yyyy HH:mm\' }}</span></div>'},
            {field:'updationDate', displayName:'Updated On',width:150,
            cellTemplate:'<div class="ngCellText" ng-class="col.colIndex()"><span>{{row.getProperty(\'updationDate\') | date:\'dd-MM-yyyy HH:mm\' }}</span></div>'},
            {field:'title', displayName:'Title',
            cellTemplate:'<div class="ngCellText" ng-class="col.colIndex()"><span class="contentEllipses">{{row.getProperty(\'title\')}}</span></div>'},
            {field:'title', displayName:'Description',
            cellTemplate:'<div class="ngCellText" ng-class="col.colIndex()"><span class="contentEllipses">{{row.getProperty(\'desc\')}}</span></div>'},
            {field:'desc', displayName:'Preview',
            cellTemplate:'<div class="ngCellText" ng-class="col.colIndex()"><img height = "75" width="75" src="./{{row.getProperty(\'image_path\')}}" /></div>'},
            {field:'edit', displayName:'Edit',width:50,
            cellTemplate:'<div class="ngCellText" ng-class="col.colIndex()"><a href="#"><i class="fa fa-pencil fa-fw" ng-click="onCarouselEdit(row)"></i></a></div>'},
            {field:'delete', displayName:'Delete',width:75,
            cellTemplate:'<div class="ngCellText" ng-class="col.colIndex()"><a href="#"><i class="fa fa-trash-o fa-fw" ng-click="onCarouselDelete(row)"></i></a></div>'}
        ],
        multiSelect: false,
        enableRowSelection:false,
        selectedItems: []
    };
    
    // Load the list of Carousels. Used in the Grid
    
    // Handle Image Upload
    $scope.uploadCarouselImage = function(uploadedImage){
        console.log('SiteMgmtCarouselCtrl#uploadCarouselImage');
        if (uploadedImage.files && uploadedImage.files[0]) {
            $scope.uploadedFile = uploadedImage.files[0];
            $scope.isImageUpdated = true;
        }
    };
    
    // Called when the user clicks on the Save button
    $scope.onCarouselSave = function(){
        console.log('SiteMgmtCarouselCtrl#onCarouselSave');
        var carouselJSON = {
            title:$scope.carousel.title,
            desc:$scope.carousel.desc,
            creationDate:new Date(),
            updationDate:new Date()
        };
        var carouselImageForm = new FormData();
        carouselImageForm.append('file', $scope.uploadedFile);
        carouselImageForm.append('title', carouselJSON.title);
        carouselImageForm.append('desc', carouselJSON.desc);
        carouselImageForm.append('creationDate', carouselJSON.creationDate);
        carouselImageForm.append('updationDate', carouselJSON.updationDate);
        
        var isSaved = carouselService.saveCarousel(carouselImageForm);
        isSaved.then(function(data){
            $scope.carouselList = data;
            $scope.onCarouselReset();
        });
    };
    
    // Called when the user clicks on the Update button
    $scope.onCarouselUpdate = function(){
        console.log('SiteMgmtCarouselCtrl#onCarouselUpdate');
        var carouselJSON = {
            title:$scope.carousel.title,
            desc:$scope.carousel.desc,
            creationDate:$scope.carousel.creationDate,
            updationDate:new Date(),
            isImageUpdated:$scope.isImageUpdated,
            image_path:$scope.carousel.imagePath
        };
        var carouselImageForm = new FormData();
        carouselImageForm.append('file', $scope.uploadedFile);
        carouselImageForm.append('title', carouselJSON.title);
        carouselImageForm.append('desc', carouselJSON.desc);
        carouselImageForm.append('creationDate', carouselJSON.creationDate);
        carouselImageForm.append('isImageUpdated', carouselJSON.isImageUpdated);
        carouselImageForm.append('imagePath', carouselJSON.image_path);
        var carouselID = $scope.carousel._id;
        var isUpdated = carouselService.updateCarousel(carouselID,carouselImageForm);
        isUpdated.then(function(data){
            $scope.carouselList = data;
            $scope.onCarouselReset();
        });
        
    };
    
    // Called when the user clicks on the Reset button
    $scope.onCarouselReset = function(){
        console.log('SiteMgmtCarouselCtrl#onCarouselReset');
        $scope.carousel = {
            name:"",
            desc:"",
            creationDate:"",
            updationDate:"",
            imagePath:"",
            _id:""
        };
        $scope.isCarouselSave = true;
        $scope.isCarouseUpdate = false;
        $scope.isImageUpdated = false;
    };
    
   
    // Called when the user clicks on the Edit button in the grid
    $scope.onCarouselEdit = function(selectedRow){
        console.log('SiteMgmtCarouselCtrl#onCarouselEdit');
        console.dir(selectedRow.entity);
        var row = selectedRow.entity;
        $scope.isCarouselSave = false;
        $scope.isCarouseUpdate = true;
        $scope.carousel.name = row.name;
        $scope.carousel.title = row.title;
        $scope.carousel.desc = row.desc;
        $scope.carousel.creationDate = row.creationDate;
        $scope.carousel.updationDate = row.updationDate;
        $scope.carousel.imagePath = row.image_path;
        $scope.carousel._id = row._id;
    };
    
    // Called when the user clicks on the Delete button in the grid
    $scope.onCarouselDelete = function(selectedRow){
        console.log('SiteMgmtCarouselCtrl#onCarouselDelete');
        var carouselID = selectedRow.entity._id;
        var isDeleted = carouselService.deleteCarousel(carouselID);
        isDeleted.then(function(data){
            $scope.carouselList = data;
            $scope.carousel = {
                name:"",
                desc:"",
                creationDate:"",
                updationDate:"",
                imagePath:"",
                _id:""
            };
            $scope.isCarouselSave = true;
            $scope.isCarouseUpdate = false;
            $scope.isImageUpdated = false;
        });
    };
    
});
