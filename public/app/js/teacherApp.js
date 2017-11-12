var app = angular.module('teacherApp',['ngAnimate','ui.materialize'])

app.config(['$compileProvider', function ($compileProvider) {
        $compileProvider.aHrefSanitizationWhitelist(/^\s*(|blob|):/);
}]);