app
.service('testShare',function(){

        var idk = [], direction = ''
        var shared = {}
        //this.shrd = new String()

        var words = []

        this.testQuestions = idk

        this.direction = direction

        this.getWords = function(){
                //console.log(";;;;;;;;;   this.shared words to send", shared.words)

                return shared.words
                //'mama tata'//this.
                
        }
        this.setWords = function(array){
                //this.
                shared.words = array

                //console.log(";;;;;;;;;   this.shared words", shared.words)
        }
        this.setVal = function(val){
                idk = val
        }
        this.getVal = function(){
                return idk
        }
        this.endTest = function(){
                alert('end test')
        }

        this.updateWord = function(i, newWord){
                //console.log('updateWord')
                //this.words[ind] = newWord
                //console.log(this.words)
                //console.log('was', this.words[i])

                //console.log('now', newWord)
        }
})
.controller('teacherCtr',['$scope','$timeout',
                        '$window',
                        //'fileReader',
                        //'teacherService',
                        'exam', 'vocabfile', 'testShare',

function($scope, $timeout, 
                $window,//fileReader//,teacherService,
        exam,vocabfile, testShare){

                // add dropbox get file and upload file functionality to show off
                // use localstorage!! to store file
                //console.log($window.localStorage)


                //let t = angular.toJson({name: 'marko', age: 32})
                //console.log('to', typeof t)
    
                //$window.localStorage.setItem("userFileNames", 
                        //angular.toJson([{name: "_words_en_-_est"}, {name: "__ test.txt"}] ))

                //  ["_words_en_-_est", "__ test.txt"]
                //$window.localStorage.removeItem("test")
                //$window.localStorage.removeItem("_words_en_-_est")
                //$window.localStorage.removeItem("userFileNames")
                //$window.localStorage.removeItem("__ test.txt")  
                //console.log($window.localStorage.getItem("_words_cz_-_de"))


                //*/

                setTimeout(function(){
                        //let xx= 
                        //console.log(  $window.localStorage.getItem("test")            )
                        //console.log(  $window.localStorage.getItem("userFileNames")   )
                        //console.log(  $window.localStorage.getItem("__ test.txt")     )
                        //console.log(  angular.fromJson($window.localStorage.getItem("_words_en_-_est") ))
                        //console.log(     )

                },1000)

                $scope.$timeout = $timeout

                //$scope.test='halohalo222'
                /*$scope.hideThis = false
                $scope.testclick = function(){
                        console.log("click")
                        $scope.hideThis = !$scope.hideThis
                }*/



            var synth = window.speechSynthesis;
            var voices = []
            setTimeout(function(){
                voices = synth.getVoices();    
                //console.log(voices)

                var utterThis = new SpeechSynthesisUtterance('grüss gott grüss gott');
                utterThis.voice = voices[6];
                utterThis.lang = "de-DE"
                utterThis.onend = function(){
                        console.log('end speech')
                }
                //console.log(utterThis)
                //synth.speak(utterThis);
            }, 1000)
            //console.log('digest check')

            var userFile = {}
            $scope.chooseNew = false


            $scope.hasLocalStorage = function(){

                // let previousFilesNames
                // get all previously used vocab names (storage/filenames)
                // let user choose which last session to open

                let fns = $window.localStorage.getItem("userFileNames")        // userFileNames
                return  fns !== null && fns !== undefined
            }
            
            //$scope.
            var loadLocalStorage = function(){
                "use strict"
                        
                        let names = angular.fromJson(

                                        $window.localStorage.getItem("userFileNames")

                                )
                        if (names!== null && names!== undefined)

                        names = names.map(function(item){

                                                return item.name
                                        })

                        
                        $timeout(function(){

                                $scope.storedDicts = names
                                $scope.mainScreen = true
                                
                                console.log("storage dicts\n",$scope.storedDicts)
                                //console.log('dict names', names)
                        })

                        
            }
            loadLocalStorage()
            $scope.loadLSDict = function(dict){
                        "use strict"

                        console.log("dict to load", dict)

                        userFile.currentFilename = dict.toString()

                        let data = angular.fromJson( $window.localStorage.getItem(dict) )
                                        .map(function(item) {

                                                item[0] = item[0].toString().trim()
                                                item[1] = item[1].toString().trim()
                                                if (item[2]) item[2] = parseInt(item[2])

                                                //console.log(item)
                                                return item
                                        });

                        //console.log("data", data)
                        

                        $timeout(function(){
                                $scope.lang1 = data[0][0], $scope.lang2 = data[0][1]
                                $scope.words = data.slice(1)
                                $scope.mainScreen = true
                                $scope.screen = "main"
                                
                                $scope.setWords(data.slice(1))

                                console.log("userFile.", userFile)
                        })

            } 
            

            //$scope.
            var saveLocSto = function(newName,lang1, lang2,tosave){
                        "use strict"

                        
                        console.log("\n\n||||||| saving to local",newName, lang1, lang2)
                        //   look for this name in filenames storage
                        //      if its not there set it
                        //      if its there..
                if (newName && lang1 && lang2 && Array.isArray(tosave) && tosave.length>0){

                        console.log(" can save, have all data")
                        //console.log("is array?", Array.isArray(WORDS))
                        let savedFilenames = $window.localStorage.getItem("userFileNames")
                        

                        const WORDS = mergeToSave([lang1, lang2], tosave)

                        //x.splice(0,0, [lang1, lang2] )
                        //const WORDS = x
                        console.log('data to save \n\n', WORDS)

                        if (!savedFilenames){

                                console.log("no stored filenames", savedFilenames)

                                let names = [  {name: newName}  ]
                                
                                $window.localStorage.setItem("userFileNames", angular.toJson(names))
                                console.log(  angular.toJson(names)  )

                                $window.localStorage.setItem(newName.toString(),
                                        angular.toJson( WORDS )
                                )
                                // $scope.words.unshift( [lang1, lang2] )
                                // angular.toJson()
                                console.log("saving, words" , WORDS)
                                //console.log("saving, words" , $scope.words)
                                //console.log(  WORDS  )


                        } else if (savedFilenames){

                                // is this filename already there?
                                savedFilenames = angular.fromJson(savedFilenames)
                                let isThere = false

                                for (let i=0; i< savedFilenames.length; i++){
                                        console.log(savedFilenames[i].name ,"vs", newName)


                                        if (savedFilenames[i].name === newName
                                                ) { 
                                                        isThere = true; break  }

                                }
                                console.log("is this file there?", isThere)

                                

                                //let contentToStore = $scope.words.unshift( [lang1, lang2] )
                                //console.log('$scope.words\n', $scope.words)
                                //console.log('$scope.words\n', [lang1, lang2] )
                                
                                //console.log('contentToStore\n', $scope.words.unshift([lang1, lang2]) )
                                //console.log('contentToStore\n', tosave )
                                

                               

                                if (!isThere) {


                                        savedFilenames.push({
                                                                name: newName.toString()
                                                            }
                                                           )

                                        $window.localStorage.setItem("userFileNames", angular.toJson(savedFilenames))
                                        console.log("new filename saved to local storage", newName.toString() )

                                        $window.localStorage.setItem(newName.toString(),
                                                angular.toJson( WORDS )
                                        )

                                        console.log("local storage file updated",

                                                newName.toString(),WORDS.length)


                                } else if (isThere)
                                
                                        $window.localStorage.setItem(newName.toString(),
                                                angular.toJson( WORDS )
                                        )
                                        console.log("local storage file updated")//,$scope.words.length)



                        }
                }

            }


            // when copy pasting
            $scope.uploadPasted =  function(txt){  //vocabfile.upload
                        "use strict"

                        console.log("pasting")
                        // for local storage: create new generic file name 
                        //      from langs in first line
                        //      + add current date

                        //$scope.
                        //const newwords = parseText(txt)
                        
                        
                        //

                        let langs = getLangs(txt)
                        $scope.lang1 = langs.a
                        $scope.lang2 = langs.b
                        
                                userFile.currentFilename = "_words_" + langs.a.toString() + "_-_" + langs.b.toString()

                        const WORDS = //mergeToSave([ $scope.lang1, $scope.lang2 ],                          
                             parseText(txt) //)

                        console.log("WORDS", WORDS)
                        console.log("uploading words fun:", userFile.currentFilename)//,"langs:", langs)


                        $scope.idk = "1 4 2 3"
                        //$scope.$broadcast('newDict', parseText(txt))
                        
                        $timeout(function(){
                                        
                                        $scope.words = WORDS//parseText(txt)
                                        $scope.setWords(WORDS)

                                        $scope.mainScreen = true
                                        $scope.screen = "main"
                                        //console.log($scope.words)
                                        
                        },0)
                        //$scope.
                        saveLocSto(userFile.currentFilename, $scope.lang1, $scope.lang2, //WORDS
                                mergeToSave([ $scope.lang1, $scope.lang2 ],                               parseText(txt) )
                        )
            }


            // when using fileReader
            let evCounter
            $scope.$on('newDict', function(e,d){
                    "use strict"

                    if (evCounter !== undefined){
                                //evCounter = 0 
                                return
                    } else {//evCounter++

                        console.log("new data")
                        console.log('evCounter', evCounter)
                        // get fileName and store it into local storage under key userFileNames

                        //alert('oh ma')
                        //,e, "\ndata\n", "is array?",Array.isArray(d.words))

                        
                        let ts2 = d.words.map(function(el){

                                return el.join(". ")
                        })
                        let toStore = '- - - (do not remove this line) - - -' + 
                                        '\n' + 
                                        ts2.join("\n")

                        const WORDS = d.words
                        //$timeout
                        //(function(){

                                userFile.currentFilename = d.filename
                                //console.log('userFile', userFile)
                                //$scope.idk = ".. 1 4 2 3 .."
                                
                        //})
                        $scope.$apply(function(){
                                $scope.words = d.words
                                $scope.lang1 = d.langs.a
                                $scope.lang2 = d.langs.b
                                $scope.screen = "main"

                                $scope.setWords(d.words)
                        })

                        //$scope.
                        saveLocSto(userFile.currentFilename, $scope.lang1, $scope.lang2, WORDS)
                    }
            })

            $scope.screenChange = function(screen){

                        console.log('to screen', screen)
                        if (screen ==='test') {
                                screen = 'main'
                                $scope.$parent.$broadcast('endOfTest')
                        }
                        $timeout(function(){
                                $scope.screen = screen;        
                        })

                        //if (screen ==='test') $scope.$parent.$broadcast('testScreen')
            }
            


            $scope.onSelect = function(ev){
                
                        console.log('ev', ev)
            }

            $scope.parseText = vocabfile.parseText

            $scope.loadDictWay = ""

            //$scope.screen = "initial"
            //console.log('$scope.screen', $scope.screen)

            $scope.mainScreen = true

            $scope.slct = [],  
            $scope.p1

            $scope.direction = 'ab',
                //$scope.lang1 = 'cz', 
                //$scope.lang2 = 'de'
            $scope.dir = testShare.direction
            $scope.showWords = false

            $scope.zen = false

            $scope.lengths = [1,3,5,10,15,20,30,40,50]
            $scope.defaultLength = $scope.lengths[1]
            $scope.testLength = $scope.lengths[1]

            $scope.testTypes = ['repeat previous','checked ones','all words','unknown','newest']
            $scope.defaultType = $scope.testTypes[2]
            $scope.testType = $scope.testTypes[2]

            $scope.updateWord = testShare.updateWord
            $scope.prepareExam = exam.prepareExam

            

            $scope.getWords = testShare.getWords
            $scope.setWords = testShare.setWords

                $scope.wAscen = true    
                $scope.$watch('wAscen', function(){

                                //alert('ascen')
                })
                $scope.example = [
                        {fr:'ahoj',   to:'hallo', lev: 4},
                        {fr:'neděle', to:'sontag',lev:2},
                        {fr:'já',     to:'ich',   lev:5},
                        {fr:'nůž',    to: 'Messer',lev:3},
                        {fr:'ostře',  to:'scharf'},
                        {fr:'salát',  to:'Salat',lev:3},
                        {fr:'sladký', to:'süß'},
                        {fr:'kyselý', to:'sauer',lev:6}
                ]

                $scope.example2 = [
                        ['hi','hallo',1],
                        ['sunday','sontag',2],
                        ['já','ich',1],
                        ['nůž', 'Messer',0],
                        ['ostře', 'scharf'],
                        ['salát', 'Salat',3],
                        ['sladký', 'süß'],
                        ['kyselý', 'sauer',6],
                        ['poledne', 'mittag'],
                        ['slaný', 'salzig',4],
                        ['snídaně', 'Frühstück',5],
                        ['džem', 'Marmelade'],
                        ['jak', 'wie']
                        ]
                //$scope.words = ["a","b","c"] //$scope.example




                $scope.loadExample = function(){ 
                        $timeout(function(){
                                $scope.words = $scope.example
                                $scope.lang1 = 'en'
                                $scope.lang2 = 'de'
                                $scope.screen = "main"

                                $scope.setWords(d.words)
                        })
                        

                                userFile.currentFilename = "_words_en_-_de"
                }

                $scope.zenSwitch = function(){
                        console.log('zenSwitched')
                        $timeout(function(){
                                $scope.zen = !$scope.zen
                                $scope.$parent.$broadcast('zenSwitch', $scope.zen)
                                console.log("scope1.zen", $scope.zen)
                        })
                        
                }
                $scope.showVocab = function(show){
                        
                        //if ($scope.screen === "words") $scope.screen = "main"
                        //else if ($scope.screen ==="main") $scope.screen = "words"
                        
                        //$parent.
                        $scope.$broadcast('screen', 'words')
                        
                        $timeout(function(){
                                $scope.showWords = !$scope.showWords
                                if (show) $scope.screen = "words"
                                else if (!show) $scope.screen = "main"
        
                                //console.log("screen", show, $scope.screen)
                                
                        })
                        //$scope.$apply(function(){})
                        
                }
                $scope.$on('screen', function(e,d){
                        //console.log("event, data", e, d)
                        $timeout(function(){
                                //$scope.screen = d
                        },100)
                        
                })

                $scope.al = true
                $scope.sorter = this.lev
                $scope.reverse = function(){
                        $scope.wAscen = !$scope.wAscen
                        console.log('$scope.wAscen', $scope.wAscen)
                }

                $scope.changeDir = function changeDir(){
                        let helper = $scope.lang1
                        $scope.lang1 = $scope.lang2
                        $scope.lang2 = helper

                        if ($scope.direction ==='ab') $scope.direction = 'ba'
                        else if ($scope.direction ==='ba') $scope.direction = 'ab'

                        $scope.$parent.$broadcast('dirChange',$scope.direction)
                }
                $scope.typeSelection = function(type){
                        $scope.testType = type
                        //console.log($scope.testType)
                        //return type
                }
                
                $scope.shared = testShare.testQuestions
                $scope.setTest = testShare.setVal

                setInterval(function(){
                        //console.log($scope.screen)
                },2000)


                $scope.practice = function practice(){
                        
                        //let p1 = 
                        
                        $scope.showWords = false
                        

                        new Promise(function(resolve,rej){
                                var rslt = $scope.prepareExam($scope.testType, $scope.testLength, $scope.words)

                                resolve(rslt)

                        })
                        .then(function(test){
                                console.log('- - - - - - - - - - - - - -')
                                console.log('new test questions arrived')
                                //console.log(test[0], test[1])
                                //console.log($scope.shared)
                                
                                $scope.shared = test
                                $scope.setTest(test)

                                $scope.mainScreen = false
                                

                                $scope.$parent.$broadcast('newTest')
                                //console.log('$scope.screen', $scope.screen)
                                $scope.$apply()
                                $timeout(function(){
                                        $scope.screen = "test"
                                })
                                /*$scope.$on('newTest',function(ev,data){
                                        console.log('ooooooooo o o o o o o oooooo')
                                })*/
                                //testShare.testQuestions
                                //testShare.testQuestions = test
                                //console.log('$scope.shared')
                                //console.log(testShare.testQuestions)

                        })
                }
                $scope.$on('endOfTest', function(){

                        console.log('end of test main ctrl')                        
                        //$scope.$apply()
                        $timeout(function(){
                                $scope.mainScreen = true
                                $scope.screen = "main"

                                
                        })

                        saveLocSto(userFile.currentFilename,
                                        $scope.lang1, $scope.lang2,
                                        $scope.words)
                        console.log("to save into local storage\n", userFile, $scope.lang1, $scope.lang2)
                        //console.log($scope.words)
                })


                $scope.$on('updateWord', function(ev,data){
                        console.log('broadcast')
                        console.log(ev, data)

                        $scope.updateWord(data.ind, data.word)
                })
                


                $scope.lengthSelect = function(x){
                        console.log('length',x)
                        //$scope.prepareExam($scope.words, x)
                        $scope.testLength = x
                }

                $scope.change = function(id,sectionMark){
                        
                        console.log('check change', sectionMark,". id", id)
                        

                        if (!sectionMark){

                                //console.log('id',id)
                                if ($scope.slct.indexOf(id)===-1) {

                                        $timeout(function(){
                                                $scope.slct.push(id)
                                        })
                                        


                                } else {
                                        console.log('||||| remove')

                                        $timeout(function(){
                                                $scope.slct.splice($scope.slct.indexOf(id),1 )
                                        })
                                }

                        } else {
                                console.log('group selection:', id, id+10)
                                console.log('sclt', $scope.slct)

                                // find if all positions indicated have words
                                
                                // is froup one checked?
                                // if yes, then uncheck all even itself
                                if ($scope.slct.indexOf(id)>-1){
                                        console.log('group', id,"-",id+10,"is checked ==> UNCHECK em" )
                                        //  ==> uncheck em all

                                        for (let i=id; i<id+10; i++){
                                                if ($scope.words[i]!== undefined){

                                                        //if ($scope.slct.indexOf(i)===-1) 
                                                        //$timeout(function(){
                                                        //        $scope.slct.push(i)
                                                        //})

                                                        //else 
                                                $timeout(function(){

                                                        $scope.slct.splice($scope.slct.indexOf(i),1 )
                                                })
                                                }
                                        }
                                } else {
                                        console.log('group', id,"-",id+10,"NOT checked ==> check em" )

                                        for (let i=id; i<id+10; i++){
                                                if ($scope.words[i]!== undefined){

                                                        $timeout(function(){
                                                                $scope.slct.push(i)
                                                        })

                                                }

                                        }

                                }


                                /*for (let i=id; i<id+10; i++){

                                        if ($scope.words[i]!== undefined){

                                                if ($scope.slct.indexOf(i)===-1) 
                                                $timeout(function(){
                                                        $scope.slct.push(i)
                                                })

                                                else $timeout(function(){

                                                $scope.slct.splice($scope.slct.indexOf(i),1 )
                                                })
                                        }
                                }*/
                        }
                        
                        $scope.$parent.$broadcast('slct')
    
                }
                $scope.$on('checkBoxChange', function(ev, data){

                })
                $scope.allchecked = function(from){
                        let till

                        //console.log('all check' + from," : ", till, " .")

                        
                        // find if there are all posible cheboxes/ words
                        for (let i=from; i<from+10; i++){
                                if ($scope.words[i]=== undefined) {
                                        till = i-1
                                        break
                                }
                        }
                        if (!till) till = from + 10

                        //console.log("till", till)

                        let allChecked = true;

                        for (let i=from; i <= till; i++){
                                if ($scope.slct.indexOf(i) === -1) { allChecked = false; break
                                }
                        }

                        //$scope.$timeout(function(){
                                return allChecked
                        //},)
                        
                }
                $scope.submit = function(){
                        console.log('subm')
                        
                        $scope.xx = teacherService.makeTest($scope.words, $scope.slct)
                    
                }
                
                
                //$scope.shared = exam.shared
                //$scope.shared = testShare.shrd
                //console.log($scope.shared)

        }])
.controller('test',['$scope','$timeout', 'exam','testShare',
                function($scope,$timeout,exam,testShare){
        
        
        $scope.synth = window.speechSynthesis;
        $scope.voices = []
        setTimeout(function(){
                $scope.voices = $scope.synth.getVoices();    
        },1000)

        $scope.zen = false, $scope.showTest = false
        
        $scope.dir = testShare.direction
        $scope.direction = 'ab'
        $scope.from = 0; $scope.to = 1

        $timeout(function(){
                //console.log('------ check - - ----- ')
        },1000)
        $scope.timeout = $timeout

        $scope.anim_Bads = 'anim-bad', $scope.anim_Oks = 'anim-ok'

        $scope.oks = 0, $scope.bads = 0, $scope.feedback = []
        //$scope.testQuestions = testShare.testQuestions
        $scope.getQuestions = testShare.getVal
        $scope.testQuestions = "", $scope.answerHide = true
        $scope.inpVal = "", $scope.user = {}

        $scope.newRound = exam.newRound
        $scope.submit = exam.submit

        $scope.next = exam.next, $scope.nextGo = 'go',
        $scope.home = home


        $scope.$on('dirChange', function(ev,string){
                $scope.direction = string
                console.log('ctrl2 dir:',$scope.direction)

                if ($scope.direction ==='ab') { 
                                        $scope.from = 0; $scope.to = 1
                } else if ($scope.direction === 'ba'){
                                        $scope.from = 1; $scope.to = 0
                }
        })
        $scope.$on('zenSwitch', function(ev,data){
                $timeout(function(){
                        $scope.zen = data

                        console.log('$scope.zen',$scope.zen)
                })
                

        })
        $scope.$on('testScreen', function(){
                        console.log('test screen on')
                        //$scope.screen = 'test'
                        //$scope.$apply()
        })
        $scope.$on('endOfTest', function(){
                console.log('endoftest')
                $scope.screen = ''     
                                   
        })

        
        $scope.$on('newTest',function(ev, data){
                 
                $scope.localWords = $scope.getWords()
                $timeout(function(){
                        //console.log('localWords', $scope.localWords)
                },000)
                
                console.log('|||||    zen? ',$scope.zen)
                $scope.oks = 0, $scope.bads = 0, $scope.feedback = []
                $scope.round = 0

                $scope.blur = true
                $scope.changeNextGo('go')
                //alert(JSON.stringify(data))
                $scope.testQuestions = $scope.getQuestions()
                //console.log('|||||||||| scope 2:')
                //console.log('dir',$scope.direction)
                $scope.screen = 'test'
                $scope.showTest = true
                //$scope.$apply()
                //  
                $scope.currIndex = $scope.testQuestions[$scope.round].ind
                //console.log('$scope.currIndex',$scope.currIndex)
                //$scope.curr = $scope.testQuestions
                console.log($scope.round+1, " vs ", $scope.testQuestions.length)

                $scope.newRound('first')

                //console.log("---round now1>>>", $scope.round)
                /*setTimeout(function(){
                        console.log("---round now2>>> ", $scope.round)
                },10000)*/
        })
        
        $scope.changeNextGo = exam.changeNextGo
        $scope.getNextGo = exam.getNextGo

        $timeout(function(){
                    //console.log("||||||||||||",$scope.changeNextGo,"<<<")
        },2000)
        
        //new Promise(
        $scope.endCheck = function(/*resolve, reject*/ cb ){


                console.log($scope.round, " vs ", $scope.testQuestions.length-1)

                if ($scope.round > $scope.testQuestions.length-1){
                                
                                //alert('end test - ')
                                //$scope.$parent.$broadcast('endOfTest')
                                cb(true)

                } else cb(false)

        }//)
        $scope.changeLevel = changeLevel
        $scope.updateWord = testShare.updateWord
        $scope.getWords = testShare.getWords
        //console.log('$scope.getWords', $scope.getWords)
        //var t = setInterval(function(){

                //        $scope.testQuestions = $scope.getQuestions()
                //        console.log(bbb)//$scope.testQuestions)
                //},1000)
                //$scope.shared = exam.shared
                //$scope.shared = testShare.shrd
}])

function startTest(){
        console.log(' ---- -  test started - ---- ')
}