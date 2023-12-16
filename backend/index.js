import express from 'express';
import mongoose from 'mongoose';
import multer from 'multer'
import cors from 'cors'

import isAuth from './utils/checkAuth.js';
import { registerValidation, loginValidation } from './validations/auth.js';


import * as userController from './controllers/UserController.js';
import * as uploadController from './controllers/UploadController.js';

mongoose
.connect('mongodb+srv://admin:12345@cluster0.6bps6sv.mongodb.net/x-partners?retryWrites=true&w=majority')
.then(() =>  console.log('database connection established'))
.catch((err) =>  console.log('Db error', err) )

const app = express();
app.use(cors());

const storage = multer.diskStorage({
    destination: (_, __, cb) => {
        cb(null, 'uploads')
    },
    filename: function(req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const originalExtension = file.originalname.split('.').pop();
        cb(null, file.fieldname + '-' + uniqueSuffix + '.' + originalExtension);
      }
});

const upload = multer({ storage })

app.use(express.json());
app.use('/uploads', express.static('uploads'))


app.post('/auth/register', registerValidation, userController.register);

app.post('/auth/login', loginValidation, userController.login)

app.get('/auth/me', isAuth, userController.getMe)

app.post('/upload', upload.single('image'), uploadController.uploader);


app.listen(4444, (err) => {
    if (err) {
        return console.log(err);
    }
    console.log('listening on http://localhost:4444');
});