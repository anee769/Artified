const express = require('express');

const app=express();


app.set('view engine','ejs');
app.use(express.static('public'));

app.get('/', (req,res) => {
    res.render('index', { title:'Home'});
});

app.get('/explore', (req,res) => {
    res.render('explore',{title:'Explore'});
});

app.get('/explore/:id', (req,res) => {
    const id = req.params.id;
    res.render('style',{title:'Explore',id: id});
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