import express from 'express';
import mongoose from 'mongoose';
import multer from 'multer'

import isAuth from './utils/checkAuth.js';
import { registerValidation, loginValidation } from './validations/auth.js';


import * as userController from './controllers/UserController.js';

mongoose
.connect('mongodb+srv://admin:12345@cluster0.6bps6sv.mongodb.net/x-partners?retryWrites=true&w=majority')
.then(() =>  console.log('database connection established'))
.catch((err) =>  console.log('Db error', err) )

const app = express();

const storage = multer.diskStorage({
    destination: (_, __, cb) => {
        cb(null, 'uploads')
    },
    filename: (_, file, cb) => {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage })

app.use(express.json());
app.use('/uploads', express.static('uploads'))


app.post('/auth/register', registerValidation, userController.register);

app.post('/auth/login', loginValidation, userController.login)

app.get('/auth/me', isAuth, userController.getMe)

app.post('/upload', upload.single('image'), (req, res) => {
    try {
        res.json({
            url: `/uploads/${req.file.originalname}`,
        }); 
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: 'Не удалось загрузить'
        })
    }
    
});


app.listen(4444, (err) => {
    if (err) {
        return console.log(err);
    }
    console.log('listening on http://localhost:4444');
});