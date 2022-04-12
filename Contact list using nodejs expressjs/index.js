const express = require('express');
const fs = require('fs');
const path = require('path');

const port = 8000;

const db = require('./config/mongoose');

const Contact = require('./models/contact')
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded()); //Middelware

app.use(express.static('assets')); // Middleware to add static file in our webpage Like- CSS, images. asset is the folder name where we place all files

// Creating own middleware

// app.use(function(req, res, next){
//     req.My_name = 'Abhishek' // We can use middleware to manipulate data
//     next(); //To redirect next page
// });

// var contactList = [
//     {
//         name: "Abhi",
//         phone: "9821534500"
//     },
//     {
//         name: "Aman",
//         phone: "9821612345"
//     },
//     {
//         name: "Shubham",
//         phone: "9821543541"
//     },
//     {
//         name: "Samarth",
//         phone: "9821243499"
//     }

// ]

app.get('/temp', function (req, res) {
    return res.render('temp');
});

app.get('/', function (req, res) {

    Contact.find({}, function(err, contacts){
        if(err){
            console.log('error in fetching contacts from db');
            return;
        }
        return res.render('home', {
            title: 'Contact list',
            contact_List: contacts
        });
    })
});

app.post('/create_contact', function (req, res) {
    // return res.redirect('/temp')
    // contactList.push({
    //     name: req.body.name,
    //     phone: req.body.phone
    // });

    // console.log(req.My_name); // We can access data anywhere

    // contactList.push(req.body);
    Contact.create({
        name: req.body.name,
        phone: req.body.phone
    }, function (err, newContact) {
        if (err) {
            console.log('error in creating contatc');
            return;
        }
        console.log('*********',newContact);
        return res.redirect('back');
    });

    // // return res.redirect('/')
    // return res.redirect('back');
});

app.get('/delete_contact', function (req, res) {
    console.log(req.query);
    let id = req.query.id;
    
    Contact.findByIdAndDelete(id, function(err){
        if(err){
            console.log('Error');
            return;
        }
        return res.redirect('back');
    })
    // let contact_index = contactList.findIndex(contact => contact.phone == phone);

    // if (contact_index != -1) {
    //     contactList.splice(contact_index, 1);
    // }
    // return res.redirect('back');
});

app.listen(port, function (err) {
    if (err) {
        console.log('error');
    }
    console.log('good and port is : ', port);
});
