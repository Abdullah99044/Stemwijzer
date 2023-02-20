


// ################################################

//   Deze functies slaan de antworden op

// ################################################


var antworden = []; // Hier worden de antworden opslaan 
var slaAntworden = [];

function antwordenGeven(value){

    let numIndex = vragenNummer   ;

    
    if(value == "eens"){
        

        delete_sla_antwoord("antworden");

        

        if(numIndex < antworden.length){
        
            antworden[numIndex] = "eens";
             
        }else{
            antworden.push("eens");
            
        }
        
         
    }

    if(value == "oneens"){

        delete_sla_antwoord("antworden");
 
        if(numIndex < antworden.length){
        
            antworden[numIndex] = "oneens";
             
        }else{

            antworden.push("oneens");
             
        }
        

    }


    if(value == "geen"){

        delete_sla_antwoord("antworden");

        if(numIndex < antworden.length){
        
            antworden[numIndex] = "geen";
             
        }else{


            antworden.push("geen");
        }
         

    }

    if(value == "sla"){

        if(numIndex < antworden.length){
        
            antworden.splice(numIndex, 1);
            slaAntworden.push(vragenNummer);
            window.sessionStorage.setItem("antworden" , JSON.stringify(antworden));
            
             
        }else{
         
            slaAntworden.push(vragenNummer);
        }

    }

   

    return nextOrback(false);

}


function delete_sla_antwoord(item){   //Dit functie gaat sla over antwoord verwijderen wanner je jouw antwoord veranderd

    if(item == 'antworden'){
    

        
        if(slaAntworden.includes(vragenNummer) == true){
            slaAntworden.splice(vragenNummer, 1);
        }

    }else{

        let antwoordenLength = antworden.length;

        if(slaAntworden.includes(antwoordenLength)){

            slaAntworden.splice(antwoordenLength , 1);

        }
    }
}

 


// ################################################

// Deze functions gaan de kleur van de kiezing knopen veranderen naar blauwe als de gebruiker komt weer bij vragen die hij heeft al geantwoord in dezelfde session 

// ################################################


function saveAntwordenSession(){   // Deze functie gaat de antworden array in een json onthouden wanner de gebruiker wordt klaar met de verkiezing

    let session = JSON.parse(sessionStorage.getItem("antworden"));

    return session;

}

function slaAntwordenSession(){   // Deze functie gaat de antworden array in een json onthouden wanner de gebruiker wordt klaar met de verkiezing

    let slaSession = JSON.parse(sessionStorage.getItem("slaAntworden"));

    return slaSession;

}

 

function knopVeranderen(){ // Deze functie gaat de session antworden lezen en de knopen veranderen naar blauw 


     
        let sessionAntwroden = JSON.parse(sessionStorage.getItem("antworden")); // De antworden worden in JSON format opgeslagen

        let sessionSlaAntworden =  [];
        
        
        if(JSON.parse(sessionStorage.getItem("slaAntworden")) > 0 ){

            sessionSlaAntworden  = JSON.parse(sessionStorage.getItem("slaAntworden"));

        }

    

    // let formerSessionAntwoorden =   JSON.parse(sessionStorage.getItem("enDantworden")); 
    // let formerSessionSlaAntworden =   JSON.parse(sessionStorage.getItem("enDslaAntworden")); 


    

    let html = " ";


    console.log("ANTWORDEN LENGTH" , antworden.length);
    console.log("NUMMER INDEX" ,  vragenNummer);
        



    if( antworden[vragenNummer] == "eens"    ){

        html +=  document.getElementById("eens").classList = 'w3-button w3-blue';

    
    
    }else{

        html +=  document.getElementById("eens").classList = 'w3-button  w3-indigo';

    }


    if(   antworden[vragenNummer] == "oneens"){

        html +=  document.getElementById("oneens").classList = 'w3-button w3-blue';

    
    
    }else{

        html +=  document.getElementById("oneens").classList = 'w3-button  w3-indigo';

    }



    if(  antworden[vragenNummer] == "geen" ){


        html +=  document.getElementById("geen").classList = 'w3-button w3-blue';

    
    
    }else{
        
        html +=  document.getElementById("geen").classList = 'w3-button  w3-indigo';

    }


    if(sessionAntwroden.length > 0 &&  antworden.length <= vragenNummer ){


        if(sessionAntwroden[vragenNummer] == "eens"  ){
            
            html +=  document.getElementById("eens").classList = 'w3-button w3-blue';

        }else{

            html +=  document.getElementById("eens").classList = 'w3-button  w3-indigo';

        }


        if(sessionAntwroden[vragenNummer] == "oneens"    ){
        
            html +=  document.getElementById("oneens").classList = 'w3-button w3-blue';

        }else{

            html +=  document.getElementById("oneens").classList = 'w3-button  w3-indigo';

        }

        if(sessionAntwroden[vragenNummer] == "geen" ){
        
            html +=  document.getElementById("geen").classList = 'w3-button w3-blue';

        }else{
            
            html +=  document.getElementById("geen").classList = 'w3-button  w3-indigo';

        }
    }

    
   

        


    
  
    return html;
    

   
}

// ################################################

// Dit functie vertelt de gebruiker over wat de partijen vinden over de statment

// ################################################

function partijStandPunten(value){  // Dit functie tonet de partijen meening over de statment wanner de gbruiker drukt  op de partij knop 

    for(let x in subjects[vragenNummer].parties){
        if(subjects[vragenNummer].parties[x].name == value){
            let html = " ";
            html += document.getElementById('\'' + value + '\'').style.display='block' ;
            html += document.getElementById('\'' + value + '\'').innerHTML = subjects[vragenNummer].parties[x].opinion ;
            return html;
        }
    }
    
}


function parijenPositionTonen(list){ // Dit functie tonet de partijen in een html list

    let str = '<ul>';

    list[vragenNummer].forEach(function(x) {
    
     
    str += ' <li> <button onclick="partijStandPunten(\'' + x + '\')" class="w3-button  w3-indigo  w3-margin  "  > ' +   x + ' </button> </li> ';
    str += ' <p id="\'' + x + '\'" style="display:none">lkk </p> ';
    }); 

    str += '</ul>';

    return str;
}


function watVindDePartijen(){  // Dit functie tonet de partijen positie   
    
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

// Dit gewicht Vragen functies tonet aan het einde van de app voordat de resultaat tonet. dit functie laat de gebruiker extra gewicht geven 
// aan de vragen die hij heeft beantwoord

// ################################################

var  gewichtVragenAntworden = []; // hier slaan we de gewicht vragen op

function gewichtVragenlijstMaken(){ // Dit functie tonet de gewicht vragen aan de gebruiker

    let extra = [];
    let num = 0;
     
    for(let x in subjects){
        
        extra.push('  <li> <input   type="checkbox" name" \'' +  num + '\'" onclick="extraGewichtVragenTellen(\'' + num + '\')" >   ' +  subjects[num].title  +  '   </li> ' );
        num++;
         
    }
    
    return document.getElementById("extraGewichtVragen").innerHTML = extra  ;
}   


function extraGewichtVragenTellen(value){ // dit functie slaat de gewicht vragen op de gewichtVragenAntworden lijst

    let num = value.replaceAll('"', '');
    num = parseInt(num);
    console.log(num);
    gewichtVragenAntworden.push(num);

    console.log(gewichtVragenAntworden);

    return;

}

// ################################################

//   Partijen filter function zodat de gebruiker kunt kiezen welk partijen wilt hij tonennen bij de resultaat

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

// Hier bereken ik de resultaat door de gebruiker antwroden te lezen en toevoeg aan een lijst alle partijen die hebben dezelfde antwoord
// als de gebruiker bij elke statment

// ################################################

function resultatenBereknen(list){

    let proPartijen      = partijenPostion("pro");
    let contraPartijen   = partijenPostion("contra");
    let nonePartijen     = partijenPostion("none");

    let resultatPartijen = [];

    let num = 0;

    for(let x in antworden){

        if(gewichtVragenAntworden.includes(num)){  // Als de gebruiker heeft de extra gewicht vragen gekeuze dan toevogt dit loop de Antworden de antworden  
           
            for(let i = 0; i < 2; i++){

                if(antworden[num] == "eens"){
                    resultatPartijen.push(proPartijen[num]);
                }
        
                if(antworden[num] == "oneens"){
                    resultatPartijen.push(contraPartijen[num]);
                }
        
                if(antworden[num] == "geen"){
                    resultatPartijen.push(nonePartijen[num]);
                }
            }

            console.log("yes");

        }else{

            if(antworden[num] == "eens"){
                resultatPartijen.push(proPartijen[num]);
            }
    
            if(antworden[num] == "oneens"){
                resultatPartijen.push(contraPartijen[num]);
            }
    
            if(antworden[num] == "geen"){
                resultatPartijen.push(nonePartijen[num]);
            }
        }

        num++;

    }


    // Hier maak ik van alle antworden een object  en tel ik bij elke obiject hoveel keer is de naam van de partij herhaald

    let counts = {};
    let partijen = resultatPartijen.flat(1);
    partijen.forEach(function (x) { counts[x] = (counts[x] || 0) + 1; });

    let resultaten =  Object.entries(counts).sort((a,b) => b[1]-a[1]);

    let num2 = 0;
    
    // Hier filter ik de partijen 

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
    
    
    // Hier maak ik de gewicht van de vragen lijst leeg zodat de gebruiker kan treug naar de lijst van de gewicht van de vrgaen 
    // en verander zijn antworden

    gewichtVragenAntworden = [];

    console.log(resultaten);

    return resultaten;
     
}


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

        
        // window.sessionStorage.setItem("enDantworden" , JSON.stringify(antworden));
        // window.sessionStorage.setItem("enDslaAntworden" , JSON.stringify(slaAntworden));

        window.sessionStorage.setItem("antworden" , JSON.stringify(antworden));
        window.sessionStorage.setItem("slaAntworden" , JSON.stringify(slaAntworden));
        
        

        return html;
    } 
}




// ################################################

//  Deze functies zorgen dat de web applicatie werk als "slide" waarbij de gebruiker kan treug of verder met zijn vragen   

// ################################################


var vragenNummer = -1;


function nextOrback(value){

    if(value == true){  // Als de gebruiker drukt op een antwoord knop dat betekent true en zo hij kan verder gaan met zijn vragen 
        return hideAndDisplay(true);
    }
    
    if(value == false){ // Als de gebruiker drukt op treug knop dat betekent false en zo hij kan treug gaan naar de vorge vrage en en de laatste antwoord wordt verwijdert
        return hideAndDisplay(false);
        
    }

   



}




function hideAndDisplay(value){

    if(value == false){
        
        vragenNummer++;
    }else{


        
        if(vragenNummer <  30){ //Als de gebruiker alle statments geantwoordet dan hij kan ze niet verwijderen wanner hij op treug knop gedrukt

            if(vragenNummer == antworden.length){ 

                // Als de gebruiker heeft op "sla deze vraag" knop gedrukt dan wordt deze antwoord niet opgeslaaen
                // Dus als de gebruiker op de treug knop heeft gedrukt wordt de antworden die hebben opgeslagen niet verwijderet

                // Bijvoorbeeld :

                // Als de gebruiker was bij vraagnummer 5 (statment 5) maar hij heeft "Sla deze vraag over" knop gedrukt bij vraagnummer 4
                // dan heeft hij allen maar 3 antworden opgeslagen in de antworden lijst, Dus als hij wilt treug naar vragnummer 4 
                // en hij heeft 3 antworden opgeslagen  in de antworden lijst dat betkent 3 is niet gelijk met 4 dus geen antwoord wordt verwijdert!
                // want wanner de gebruiker drukt op treug knop  wordt de vorge statment antwoord verwijdert.


                //antworden.pop()

            }
        }
        
        vragenNummer--;
    }

 

    let statments =  statementTelen();
    

    let html = " ";

    html += document.getElementById('start').style.display='none';
    html += document.getElementById('partijenPosition').style.display='none';

    if(vragenNummer < 0 ){
        
        html += document.getElementById('start').style.display='block';
        html += document.getElementById('Treug').style.display='none';

        html += document.getElementById('statments').style.display='none';
        html += document.getElementById('statmentNum').style.display='none';
        html += document.getElementById('partijenPosition').style.display='none';

        

    }
    
    if(vragenNummer < 30){

       
        
        let title = subjects[vragenNummer].title;
        let statment = subjects[vragenNummer].statement;

         
        html += document.getElementById('Treug').style.display='block';
    
        
        
        

        // satments nummer
        html += document.getElementById('statmentNum').style.display='block';
        html += document.getElementById('statmentNum').innerHTML = vragenNummer  + " / " + statments.slice(-1);

        html += document.getElementById('statments').style.display='block';

        html += document.getElementById('title').innerHTML    = title ;
        html += document.getElementById('statment').innerHTML = statment;

        html += document.getElementById('partijenFilteren').style.display='none';


        

    }else if(vragenNummer == 30){

        
        html += document.getElementById('statments').style.display='none';
        html += document.getElementById('statmentNum').style.display='none';
        html += document.getElementById('partijenFilteren').style.display='none';

        
        html +=  document.getElementById('extraGewichtVragenList').style.display='block' ;

        html += gewichtVragenlijstMaken();

        
        
    }else if(vragenNummer == 31){  

        html += document.getElementById('partijenFilteren').style.display='block';
        html += document.getElementById('reultaten').style.display='none';
        html +=  document.getElementById('extraGewichtVragenList').style.display='none';

    }


    
    
    
    // window.sessionStorage.setItem("antworden" , JSON.stringify(antworden));
    // window.sessionStorage.setItem("slaAntworden" , JSON.stringify(slaAntworden));

       
    console.log("antwoorden " , antworden);
    console.log("session antwoorden" , JSON.parse(sessionStorage.getItem("antworden")));
  
    console.log("vragen nummer : " , vragenNummer);
    console.log("slaantworden" , slaAntworden);
    console.log("session slaantworden " , JSON.parse(sessionStorage.getItem("slaAntworden")));
    
    html += knopVeranderen();
    

    return html;
    

    
}




 

 


 
 
 


  
 
