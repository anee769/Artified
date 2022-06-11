const express = require('express');

const app=express();


app.set('view engine','ejs');
app.use(express.static('public'));

app.get('/', (req,res) => {
    res.render('index', { title:'Home'});
});

app.get('/styles', (req,res) => {
    res.render('styles',{title:'Explore'});
});

app.get('/convert', (req,res) => {
    res.render('convert',{title:'Artify your images'});
});

app.get('/download', (req,res) => {
    res.render('download',{title:'Download'});
});

app.use( (req,res) => {
    res.status(404).render('404',{title:'404'});
});

app.listen(3000);