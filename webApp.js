
 

// ################################################
 
// Partijen toevoegen aan partijen array

// ################################################

var partijen = [];


for (let x in parties) {
    partijen.push(parties[x].name);
}

 


// ################################################
 
//  Statments telen

// ################################################

var statements = [];

let num = 1;

for (let x in subjects ) {
    statements.push(num);
    num++;
}
 
 

// ################################################

// Hier slag ik op partijen positions bij elke statment

// ################################################


var proPartijen     =   [];
var contraPartijen  =   [];
var nonePartijen    =   [];


function partijenPostion(){

    
    for(let x in subjects){

        let pro = [];
        let contra = [];
        let none = [];

       
        for(let i in  subjects[x].parties ){

            let meaning = subjects[x].parties[i].position;


            if(meaning == "pro"){
                pro.push(subjects[x].parties[i].name);
            }

            
            if(meaning == "contra"){
                contra.push(subjects[x].parties[i].name);
            }


            
            if(meaning == "none"){
                none.push(subjects[x].parties[i].name);
            }

           
        }

        proPartijen.push(pro);
        contraPartijen.push(contra);
        nonePartijen.push(none);
    }
}

// ################################################

// Find the most party

// ################################################




// ################################################


var  resultatPartijen = []

function resultatenBereknen(){

    
    let num = 0;

    for(let x in antworden){

        if(antworden[num] == "eens"){
            resultatPartijen.push(proPartijen[num]);
        }

        if(antworden[num] == "oneens"){
            resultatPartijen.push(contraPartijen[num]);
        }

        if(antworden[num] == "geen"){
            resultatPartijen.push(nonePartijen[num]);
        }

        num++;

    }

    let counts = {};
    let partijen = resultatPartijen.flat(1);
    partijen.forEach(function (x) { counts[x] = (counts[x] || 0) + 1; });

    return Object.entries(counts).sort((a,b) => b[1]-a[1]);
     
}


// ################################################


var antworden = [];

var vragenNummer = 0;

function hideTheStart(){

    document.getElementById('start').style.display='none'

    var statmentNummer = statements[vragenNummer];

    if(statmentNummer < 31){


        
        var title = subjects[vragenNummer].title;
        var statment = subjects[vragenNummer].statement;


        // satments nummer
        document.getElementById('statmentNum').innerHTML =  statmentNummer + " / " + statements.slice(-1);

        document.getElementById('1').style.display='block'

        document.getElementById('title').innerHTML    = title
        document.getElementById('statment').innerHTML = statment

    }else{

        document.getElementById('1').style.display='none'
        document.getElementById('statmentNum').style.display='none'
        document.getElementById('resultButton').style.display='block'
        partijenPostion();
        
         
        console.log(resultatenBereknen());
         

        
        
    }
    
    vragenNummer++;

}


function answerEens(){
    antworden.push("eens");
    return hideTheStart();
    
}

function answerOnEens(){
    antworden.push("oneens");
    return hideTheStart();
}

function answerGeen(){
    antworden.push("geen");
    return hideTheStart();
    
}

var proParies = [];

function stemmerParies(){


     

}





 
 
 


  
 
