const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
var app = express();
const port = process.env.PORT || 3000;

hbs.registerPartials(__dirname+'/views/partials');
hbs.registerHelper('getCurrentYear', ()=>{
   return new Date().getFullYear();
});
hbs.registerHelper('appName', (name)=>{
  return name;
});
app.set('view_engine' , 'hbs');
app.use(express.static(__dirname+'/public'));


app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
  
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err)=>{
        console.log("failed to write log into server.log")
    });
    next();
  });
  
  // app.use((req, res, next) => {
  //   res.render('maintenance.hbs');
  // });
  
  app.use(express.static(__dirname + '/public'));





app.get('/', (req, res)=>{
    res.render('home.hbs',{
        pageTitle:'home',
        pageHeading:'Home',
        paragraph:'i am aj paragraph',
        
    });
});

app.get('/about', (req, res)=>{
    res.render('about.hbs',{
        pageTitle:'about',
        pageHeading:'About',
        paragraph:'i am a paragraph',
        
    });
});


app.listen(port, (err)=>{
    if(err){
        console.log(err);
    }else{
    console.log(`server started at ${port}`);
    }
});
