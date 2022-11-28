

// ################################################

//   Partijen filter function

// ################################################


function filterPartijen(value){

    let secularPartijen = [];
    let grotePartijen = [];


    let num = 0;
    for (let x in parties) {
        
        let partijName = parties[num].name;

        if(parties[num].secular == true){
            secularPartijen.push(partijName);
        }

        if(parties[num].size >= 14){
            grotePartijen.push(partijName);
        }

        num++;
    }

    if(value == "grote"){

        return grotePartijen;

    }else{

        return secularPartijen;

    }
}


// ################################################
 
//  Statments telen

// ################################################


function statementTelen(){

    let statements = [];

    let num = 1;

    for (let x in subjects ) {
        statements.push(num);
        num++;
    }
    
    return statements;
}


// ################################################

// Hier bij deze functie slag ik op partijen positions bij elke statment  zodat ik toevoeg ze in een lijst bij elke antwoord
// Dus als de gebruiker kiest "eens" bij een statment , deze functie toevoegt aan een lijst andere lijst met alle partijen die zijn mee eens bij dezelfde statment. 
// en door deze lijsten index weet ik  welke lijst behoort tot de statment antword die heeft de gebruiker gekuezed 
 

// ################################################


function partijenPostion(value){

    let proPartijen     =   [];
    let contraPartijen  =   [];
    let nonePartijen    =   [];


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


    if(value == "pro"){
        return proPartijen;
    }

    if(value == "contra"){
        return contraPartijen;
    }

    if(value == "none"){
        return nonePartijen;
    }
}


// ################################################

// Hier bereken ik de resultaat door de gebruiker antwroden te lezen en toevoeg aan een lijst alle partijen die hebben dezelfde antwoord
// als de gebruiker bij elke statment

// ################################################

function resultatenBereknen(){

    let proPartijen      = partijenPostion("pro");
    let contraPartijen   = partijenPostion("contra");
    let nonePartijen     = partijenPostion("none");

    let resultatPartijen = [];

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

    let resultaten =  Object.entries(counts).sort((a,b) => b[1]-a[1]);

    let num2 = 0;
    

    if(document.getElementById("secularePartijen").checked){

        for(let x in resultaten){
            if(filterPartijen("seculare").includes(resultaten[num2][0]) == false){
                resultaten.splice(num2 , 1);
            }
            num2++;
        }
    }

    let num3 = 0;

    if(document.getElementById("grotestePartijen").checked){

        for(let x in resultaten){
            if(filterPartijen("grote").includes(resultaten[num3][0]) == false){
                resultaten.splice(num3 , 1);
            }
            num3++;
        }
    }
    
    

    return resultaten;
     
}


var antworden = [];

var vragenNummer = -1;


function resultatenTonen(){

    vragenNummer++;

    if(vragenNummer > 30 ){

        document.getElementById('partijenFilteren').style.display='none'

        let partijen = resultatenBereknen();

        
        let title = "   Je resultaat voor de verkiezingen ";
        let list  = " ";


        let num = 0 ;
        for(let x in partijen){

            
            list +=  ' <li> ' + partijen[num][0] +   "  " +   partijen[num][1] +  '</li> ';

            num++;
        }

        
        let html = " ";

        html += document.getElementById("reultaten").style.display='block' ;
        html += document.getElementById("reultaatTitle").innerHTML = title ;
        html += document.getElementById("reultaatPartijen").innerHTML = list ;

        
        return html;
    } 
}

// ################################################


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


    let statments =  statementTelen();
    let statmentNum =  vragenNummer + 1;

    document.getElementById('start').style.display='none'
    document.getElementById('partijenPosition').style.display='none'

    if(vragenNummer < 0 ){
        document.getElementById('start').style.display='block'
        document.getElementById('Treug').style.display='none'

        document.getElementById('1').style.display='none'
        document.getElementById('statmentNum').style.display='none'
        document.getElementById('partijenPosition').style.display='none'
        

    }
    
    if(vragenNummer < 30){

       
        
        let title = subjects[vragenNummer].title;
        let statment = subjects[vragenNummer].statement;

         
        document.getElementById('Treug').style.display='block'
    
        
        
        

        // satments nummer
        document.getElementById('statmentNum').innerHTML = statmentNum  + " / " + statments.slice(-1);

        document.getElementById('1').style.display='block'

        document.getElementById('title').innerHTML    = title
        document.getElementById('statment').innerHTML = statment

        document.getElementById('partijenFilteren').style.display='none'


        

    }else if(vragenNummer == 30){

        document.getElementById('1').style.display='none'
        document.getElementById('statmentNum').style.display='none'
        document.getElementById('partijenFilteren').style.display='block'
        document.getElementById('reultaten').style.display='none'

        
    }
    
    console.log(vragenNummer);

    
}

// ################################################

// Wat vind de partijen functie

// ################################################

function parijenPositionTonen(list){

    let str = '<ul>';

    list[vragenNummer].forEach(function(x) {
    
     
    str += ' <li> <button onclick="partijStandPunten(\'' + x + '\')" class="w3-button  w3-indigo  w3-margin  "  > ' +   x + ' </button> </li> ';
    str += ' <p id="\'' + x + '\'" style="display:none">lkk </p> ';
    }); 

    str += '</ul>';

    return str;
}

function partijStandPunten(value){

    for(let x in subjects[vragenNummer].parties){
        if(subjects[vragenNummer].parties[x].name == value){
            let html = " ";
            html += document.getElementById('\'' + value + '\'').style.display='block' ;
            html += document.getElementById('\'' + value + '\'').innerHTML = subjects[vragenNummer].parties[x].opinion ;
            return html;
        }
    }
    
}

function watVindDePartijen(){
    
    document.getElementById('partijenPosition').style.display='block'


    let proPartijen      = partijenPostion("pro");
    let contraPartijen   = partijenPostion("contra");
    let nonePartijen     = partijenPostion("none");

    
    let pro = parijenPositionTonen(proPartijen);
    let contra = parijenPositionTonen(contraPartijen);
    let none = parijenPositionTonen(nonePartijen);

    let html = " ";

    html += document.getElementById("proParijenList").innerHTML =   pro ;
    html += document.getElementById("contraParijenList").innerHTML = contra ;
    html += document.getElementById("nonePartijenList").innerHTML = none; 

    return html;

}


// ################################################

// Partijen filteren

// ################################################



// ################################################

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

 


 
 
 


  
 
