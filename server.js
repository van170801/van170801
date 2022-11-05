const express = require('express');
var app = express();
const mongoose = require('mongoose');
const path = require('path');
const alert = require('alert');

// nhan du lieu body-parser
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
mongoose.connect('mongodb://localhost/KS-Nodemy', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
// mongoose database
var user = require('./models/user.model')

app.get('/van170801/register', (req, res, next)=>{
    res.sendFile(path.join(__dirname, 'register.html'))
});

app.get('/van170801/login', (req, res, next) => {
    res.sendFile(path.join(__dirname, 'login.html'))
});

app.get('/van170801/trangchu', (req, res, next)=>{
    res.sendFile(path.join(__dirname, 'trangchu.html'))
});

app.get('/van170801/', (req, res, next)=>{
    res.sendFile(path.join(__dirname, 'home.html'))
});


app.post('/van170801/register', urlencodedParser, async (req, res)=>{
    try{
        var username = req.body.username
        const use =  await user.findOne({
            username: username        })
        if(use){
            alert('Tài khoản này đã tồn tại')
            return console.log('tai khoan nay da ton tai')
        }
        const moi = new user({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        })

        const newDoc = await user.create(moi)
        alert('Tạo tài khoản thành công')
        console.log('tao tai khoan thanh cong')
    }
    catch(error) {
        console.log('loi server')
    }
    
});

app.post('/van170801/login', urlencodedParser, (req, res) => {
    
    var username = req.body.username
    var password = req.body.password

    user.findOne({
        username: username,
        password: password
    })
    .then(result=>{
        if(result.password == req.body.password && result.username == req.body.username){
            alert('Đăng nhập thành công')
            console.log('dang nhap thanh cong')
            res.redirect('/van170801/TrangChu')
        }
    })
    .catch(err=> {
        alert('Tài khoản không đúng')
        console.log('dang nhap that bai')
    })
});

app.listen(3000, () => {
    console.log('bat dau server thanh cong tai dia chi http://localhost:3000');
});