const express = require('express');
const bodyParser = require('body-parser');
const formidable = require('formidable');
const spawn = require("child_process").spawn;
const path = require('path');
const fs= require('fs');

const app=express();


app.set('view engine','ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

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
    const id=req.query.id?req.query.id:1;
    res.render('convert',{title:'Artify your images',id,err:''});
});

app.get('/download', (req,res) => {
    res.render('download',{title:'Download'});
});

app.post('/download', (req,res) => {
    var file_path="";
    var style=0;
    var form = new formidable.IncomingForm();
    var output_filepath="";
    const script_path = path.join(__dirname,'neural_style','train.py');
    form.on('file', (field, file) => {
        if(file.mimetype.startsWith('image/')) {
            form.uploadDir = path.join(__dirname,'public','uploads');
            fs.rename(file.filepath, path.join(form.uploadDir, file.originalFilename), (err) => {
                if (err) throw err;
                file_path = path.join(__dirname,'public','uploads',file.originalFilename);
                const python = spawn('python',[script_path,'--content-image',file_path,'--style-id',style]);
                python.stdout.on('data', (data) => {
                    output_filepath=data.toString();
                });
            });

            res.render('download',{title:'Download'});
        } else {
             return res.render('convert',{title:'Artify your images',id:1,err:'The file specified is not an image. Please try Again.'});
        }
    });
    form.parse(req,(err,fields,files) => {
        style=parseInt(fields.style)-1;
    });
});

app.use( (req,res) => {
    res.status(404).render('404',{title:'404'});
});

app.listen(3000);