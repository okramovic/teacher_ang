app/*.directive('checkB',function(){
    return {
            restrict: 'AE',
            replace: true,
            scope:{
                    ch: '&'
            },
            template: '<input type="checkbox" ng-change="change(111)">',
            link: function(scope, el, att){
                    

            }
    }
    
}])*/.directive('vocabulary',function($timeout){
    return {
            restrict: 'EA',
            replace: true,
            controller: 'teacherCtr',
            /*scope:{
                    wo: '=',
                    ch: '&',
                    ascen: '=',
                    al:'=',
                    slct: '=',
                    len: '=',
                    max: '='
            },*/  // | orderBy:w.lev:ascen    track by $index 
            scope: {
                words: '='
                //,change: '&'
                ,ch: '&'
            },
            template: '<div ng-repeat="w in words ">'+


                                '<div  ng-if="lastGroup($index) === false && $index % 10 === 0" '+

                                        'style="display: flex; align-items:center; justify-content: center"> ' +
                                        '{{$index+1}}.-{{$index+10}}.   '+

                                        '<label >'+
                                        '<input  type="checkbox" class="browser-default" ng-model="idk"      ' +
                                        //'ng-checked="allchecked({{$index}}) == true"             ' +
                                        'ng-change="change({{$index}},1)  ">' +
                                        '</label>'  +

                                '</div>' + 

                                '<div ng-model="www" ng-if="lastGroup($index) === true && $index % 10 === 0"'+
                                        '> {{$index+1}}.-{{words.length}}.'+

                                        '<label >'+
                                        '<input  type="checkbox" class="browser-default" ng-model="www"      ' +
                                        //'ng-checked="allchecked({{$index}}) == true"             ' +
                                        'ng-change="change({{$index}},1)  ">' +
                                        '</label>'  +
                                '</div>' +

                                '<div  ng-model="wx"  '+
                                'ng-class="{0: &quot;zero&quot;, 1: &quot;one&quot;,'+
                                        ' 2: &quot;two&quot; , 3: &quot;three&quot;,'+
                                        ' 4: &quot;four&quot;, 5: &quot;five&quot;,'+
                                        ' 6: &quot;six&quot;}[w[2]]"'+
                                                '>' +
                                        '{{w[0]}} {{w[1]}} {{w[2]}}'+

                                               // '<br> max {{words.length}} - {{max}}..'   +
                        '</div></div>' ,
            /* 
                        '<input  type="checkbox"  smt="{{$index}}" ' +
                                ' ng-checked="slct.indexOf({{$index}}) > -1"    ' +        
                                'ng-model="smt"   ng-change="change({{$index}})"  >'+
            */
            /*template2: '<div ng-repeat="w in wo | orderBy:e:ascen  track by $index">'+
                           '<div  ng-if="$index % 10 ==0" > {{$index+1}}. </div>' + 
                           '<div  ng-model="wx"  '+
                            'ng-class="{0: &quot;zero&quot;, 1: &quot;one&quot;,'+
                                      ' 2: &quot;two&quot; , 3: &quot;three&quot;,'+
                                      ' 4: &quot;four&quot;, 5: &quot;five&quot;,'+
                                      ' 6: &quot;six&quot;}[w[2]]"'+
                                        '>' +
                                '{{w[0]}} {{w[1]}} {{w[2]}}, index: {{$index}}'+
                                '<input smt="{{$index}}"  ng-model="smt"  '+
                                    'type="checkbox" ng-change="change({{$index}})"  >'+
                      '</div></div>'    */    
            
            link: function(scope, el, att){
                //console.log("att", att)
                //console.log("change",scope.change)
                //scope.w[2] = scope.wo[2]
                scope.wx = true//scope.wo[2][2]
                scope.idk = 1
                scope.al = true
                $timeout(function(){
                scope.max = 9
                })
                //scope.len = 9
                //console.log("len",scope.len,"<<")
                //scope.change = change
                /*function(){
                        console.log('change');
                }*/

                scope.$watch('words', function(w){
                        //alert('al' + scope.al + ' .')
                        //console.log('w\n\n',w)
                })

                //scope.rev = false;
                scope.$watch('len', function(wo){
                        //console.log("wo", wo)
                        //scope.len = 
                        $timeout(function(){
                                scope.max = wo//.length
                        })
                        //scope.$apply(function(){
                                scope.max = wo
                        //})
                        
                })
                scope.$watch('max', function(fck){
                                /*console.log('pipi', fck,"<")
                                console.log("words",scope.wo,"<<")
                                console.log("scope.max", scope.max)
                                console.log("scope", scope)
                                */
                })

                scope.$watch( 'ascen'
                                //'wAscen'
                                , function(ascen){
                        //scope.rev = ascen
                        //scope.
                        //timeout(function(){
                               /* console.log('ascen ' +ascen + " : " + 
                                                scope.al 
                                                 +' 222')*/
                        //},0)
                        
                        
                })
                scope.$watch('slct', function(ddw){
                        //alert('slct ' + ddw + " --")
                })
                scope.$on('slct', function(){
                        //console.log('slct')
                })

                scope.$watch('al', function(){
                        //alert('al' + scope.al + ' .')
                        //console.log('al')      
                })
                //console.log(scope.wo[7][2])
                //console.log(att)
                //console.log($scope)
            }
    }
        //'<check-b   data-i="{{$index}}"  ng-model="{{$index}}" ch="change(222)"></check-b> </div>' +

})
.directive('testLength', function(){
        return {
                restrict: 'E',
                replace: true,
                scope: {
                        lengths: '=',
                        action: '&'
                },
                template: '<p></p>'/*'<select ng-model="lengthSel" '+
                                'ng-options="l + \' rounds\' for l in lengths" '+
                                ' ng-change="lengthSelect(3)">' +
                                '</select>' */        
                        //'<option>{{l}} rounds</option>' +
                        
                        
        }
  //       
  //    ng-change="lengthSelect()"
})
.directive('inpFocus', ['$timeout', function($timeout){
        return{
                restrict: 'A',
                controller: 'test',
                //scope:{
                        //blr: '='
                //},
                link: function(scope, el, attr){
                        //console.log('directive el', el)
                        //console.log(scope)

                        scope.blur = false
                        

                        
                        el[0].focus()
                        //el.focus()
                        //console.log(attr)
                        scope.$watch('blur', function(idk){
                                //alert('halo')

                                
                                if (scope.blur)
                                        //console.log("-- blur 111 ",scope.blur)
                                        //console.log("el0",el[0])
                                        $timeout(function(){
                                                el[0].focus()
                                        })

                                else if (!scope.blur) 
                                        $timeout(function(){
                                                console.log("-- blur 222 ",scope.blur)
        
                                                el[0].blur()
                                })
                                else alert('else')
                        },true)


                        /*scope.$watch(scope.blur, function(val){
                                
                                console.log('scope blur',scope.blur," mmm")
                        })*/
                        scope.$on('blurit', function(){
                                console.log('wwwwwwww   blurit wwww')

                                //el[0].focus() //blur()
                        })
                        
                }
        }


}])
.directive('fileSelect', ['$window',function($window){
        return{
                restrict: 'A',
                //require: 'ngModel',
                controller: 'teacherCtr',       // ng-change="upFile(file)"
                /*scope:{
                        //onSelect: '&',
                        //fileSelect: '@',
                        data: '@',
                },*/
                //template:'<input type="file" ng-model="file" >',
                link: function(scope, el, attr){
                        "use strict"
                        //console.log(scope)
                        //console.log(el)
                        //console.log(attr)

                        


                        el.bind("change", function(e){
                               //, e.target.files[0])
                               console.log("file change")

                               var r = new FileReader()

                               let filename = e.target.files[0].name

                               r.onloadend = function(e){

                                /*$timeout(function(){
                                })*/
                                        //let noNotes = clearNotes(e.target.result)
                                        //console.log("file content\n", noNotes)
                                        //scope.words = noNotes
                                        //console.log(scope)

                                        //scope.upload( clearNotes(e.target.result) )
                                        console.log('load end  -->  broadcast')
                                        scope./*$parent.*/$emit('newDict', 
                                                {
                                                        filename: filename, 
                                                        words: parseText( clearNotes(e.target.result) ),
                                                        langs: getLangs ( clearNotes(e.target.result) )
                                                }
                                        )
                                        //scope.words= parseText( clearNotes(e.target.result) )
                                        //console.log("words loaded\n", parseText( clearNotes(e.target.result)  ) )
                                        
                               }
                               r.onerror = function(e){
                                       alert("error reading file")
                               }
                               r.readAsText(e.target.files[0])

                               //console.log('event', e.target.files[0].name)
                        })
                }
        }
}])

function clearNotes(text){

        text = text.slice(

                text.indexOf("- - - (do not remove this line) - - -") + 
                "- - - (do not remove this line) - - -".length
        )
        return text

}