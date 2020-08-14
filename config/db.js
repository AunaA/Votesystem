const mongoose = require('mongoose');
const keys = require('./keys');

//Map global promises
mongoose.Promise = global.Promise;

//Mongoose Connect

//mongoose.connect('mongodb://Auna:auna123.@cluster0.e8hi1.mongodb.net/pusherpoll')  ek kullanılacaklar
//mongoose.connect('mongodb://Auna:auna123.@cluster0.e8hi1.mongodb.net/pusherpoll?retryWrites=true&w=majority')
//('mongodb+srv://Auna:auna123.@cluster0.e8hi1.mongodb.net/pusherpoll?retryWrites=true&w=majority')
mongoose.connect(keys.mongoURI)
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err));