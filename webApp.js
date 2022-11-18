
 

// ################################################
 
// Partijen toevoegen aan partijen array

// ################################################

var partijen = [];


for (let x in parties) {
    partijen.push(parties[x].name);
}

console.log(partijen);


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

console.log(antworden);






  
 
