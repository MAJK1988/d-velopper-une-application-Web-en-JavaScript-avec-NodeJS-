
const express = require('express');  
const app = express();  

const alert = require('alert');
const bodyParser = require('body-parser');  
// Create application/x-www-form-urlencoded parser 
app.use(express.static('./')); 
const urlencodedParser = bodyParser.urlencoded({ extended: false })  

app.get('/', function (req, res) {  
   res.sendFile( __dirname + "/" + "index.html" );  
})  
var taille;
app.post('/add', urlencodedParser, function (req, res) {  
   // Prepare output in JSON format 
   taille =Number(req.body.leNomDuChamp);
   
   console.log(taille);  
   if(taille>10){
    alert("Veuillez saisir la taille du tab (<100)");
   }else {
    alert("Good job");
    res.redirect('/home');
    
   }
   res.end();  
})  
var server = app.listen(8080, function () {  
  var host = server.address().address  
  var port = server.address().port  
  console.log("Example app listening at http://%s:%s", host, port)  
})  

const tableLine=(index)=>{
   return '<label> TAB['+index+']= </label>'+'<input type ="number" name="'+index+'" required>'+
          '<br><br></br>';
}

const html1 =(tableLength)=>{
     var body='';
    for (i =0;i<tableLength;i++){
      body+=tableLine(i);   
    }
    return '<body>'+'<form action="/traitement" method="POST">'+
    '<fieldset>'+
    '<h3>Saisie dse tab données du tab</h3>'+ 
    '<p>Veuillez saisir les '+ tableLength +' nombres (<10)</p>'+
        body+
    ' <button type ="reset">Reset</button>'+
    ' <button type ="submit">Submit</button>'+
    '</fieldset>'+
    '</form>'+'</body>';
}
app.get('/home', function(request, response) {
	console.log(taille);
    response.send(html1(taille));
	//response.end();
});
var ht2;
app.post('/traitement', urlencodedParser, function (req, res) {  
    // Prepare output in JSON format 
    var name='TAB['+1+']';
    dataTab1 =req.body[0];
    ht2=html2(req.body);
    res.redirect('/resultat');
    res.end();
     
 }) 

 app.get('/resultat', function(request, response) {
	//console.log(ht2);
    response.send(ht2);
	//response.end();
});

 const html2=(jsonData)=>{
    var body='';
    var sum=0;
    for (i =0;i<Object.keys(jsonData).length;i++){
      sum +=parseInt(jsonData[i]);
      body+=tableLine2(i,sum,jsonData[i]);   
    }
    return '<body>'+'<form action="/resultat" >'+
    '<fieldset>'+
    '<h2>Affichage du résultat</h2>'+ 
        body+
    '</fieldset>'+
    '</form>'+'</body>';
 }

 const tableLine2=(index,sum,tabValue)=>{
    return '<label> TAB['+index+']= '+ tabValue+'  =>  RES['+index+']= '+ sum+ ' </label>' +
           '<br></br>';
 }


/*var http =require('http');
const express=require('express')

const app =express();

const employess=[
    {id:1, fullName:'Mahmoud KADDOUR'},
    {id:2, fullName:'Taha KADDOUR'},
    {id:3, fullName:'Alaa KADDOUR'}
];

app.get('/',(req,res)=>{
    res.send('mahmoud kaddour')

})

app.get('/:id',(req,res)=>{
    const emp=employess.find(element=>element.id==req.params.id);
    res.send(emp)

})
app.post('AZ/:id/:fullName',(req,res)=>{
    var emp={id:req.params.id, fullName:req.params.fullName};
    employess.push(emp);
    console.log(employess)
})



app.get('/:id/:fullName',(req,res)=>{
    res.send([req.params])
    var emp={id:req.params.id, fullName:req.params.fullName};
    employess.push(emp);
    console.log(employess)

})
const port=888||process.env.port
app.listen(port,()=>console.log('App working on port '+port));


var monServeur=function(req,res){
    res.writeHead(200);
    res.end('HELL');
}

var serveur=http.createServer(monServeur);
serveur.listen(888);

/********************* */
/*
var http = require('http');
var fs = require('fs');

function onRequest(req, res) {

    if(req.method === 'GET' && req.url === '/'){
    res.writeHead(200, {'Content-Type': 'text/html'});
    setHtml(res)
}

    else if(req.method === 'POST'&& req.url ==="/add")
{ var body;

   
	req.on('data', (data) => {
        console.log(data);
		body += data;

	});
    

	req.on('end', () => {
        console.log(body);
        setHtml(res);
	});
}



}



http.createServer(onRequest).listen(8080);

function setHtml(res){
    res.writeHead(200, {'Content-Type': 'text/html'});
    fs.readFile('./index.html', null, function(error, data) {
        if (error) {
            res.writeHead(404);
            res.write('File not found!');
        } else {
            res.write(data);
        }
        res.end();
    });
}
*/