
 

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

var vragenNummer = -1;


 

function nextOrback(value){

    if(value == true){
        return hideAndDisplay(true);
    }
    
    if(value == false){
        return hideAndDisplay(false);
        
    }
     

    

}


function hideAndDisplay(value){

    if(value == false){
        
        vragenNummer++;
    }else{
        vragenNummer--;
    }

    var statmentNummer = statements[vragenNummer];

    document.getElementById('start').style.display='none'


    if(statmentNummer < 31){

       
        
        var title = subjects[vragenNummer].title;
        var statment = subjects[vragenNummer].statement;

        if(vragenNummer  > 0){
            document.getElementById('Treug').style.display='block'
        }
        
        if(vragenNummer == 0) {
            document.getElementById('Treug').style.display='none'
        }  

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
    
    console.log(vragenNummer);

    
}



function answerEens(){
    
    antworden.push("eens");
    return nextOrback(false);
    
}

function answerOnEens(){
    antworden.push("oneens");
    return nextOrback(false);
}

function answerGeen(){
    antworden.push("geen");
    return nextOrback(false);
    
}

var proParies = [];

function stemmerParies(){


     

}





 
 
 


  
 
