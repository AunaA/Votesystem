// const express = require('express');
// const path = require('path');
// const bodyParser = require('body-parser');
// const cors = require('cors');

//    require('./config/db');
// const http = require("http").createServer(app);
// const io = require('socket.io')(http);
// const poll = require('./routes/poll')
// const app = express();
// app.use('/public', express.static(path.join(__dirname,'public')));
// /////////////////////////
// // const indexController =function(req, res) {
// //     res.sendFile(path.join(_dirname, 'index.html'));
// //     };
// //     const loginController =function(req, res) {
// //         res.sendFile(path.join(_dirname, 'login.html'));
// //         };
// //         const registerController =function(req, res) {
// //             res.sendFile(path.join(_dirname, 'register.html'));
// //             };
// //             const voteController =function(req, res) {
// //                 res.sendFile(path.join(_dirname, 'vote.html'));
// //                 };

// //     app.get('/',indexController);
// //     app.get('/login',loginController);
// //     app.get('/register',registerController);
// //     app.get('/vote',voteController)


// //////////////////////////////////////////////////////

// //Ortak Klasorleri Ayarlamak için "public folders"
// app.use(express.static(path.join(__dirname, 'public')));

// // Body-parser middleware.
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));

// // Enable CORS Cord izin verdik
// app.use(cors());

// app.use('/poll', poll);


// // Socket Ayarları
// io.on('connection', (socket) => {
//     socket.on("sendVote", (vote) => {
//         socket.broadcast.emit("getVote", vote);
//     });
// });


// const port = 3000;

// // Start server, server baslattık
// http.listen(port, () => console.log(`Server started on port ${port}`));

// ///////////////////////////////////// Login-system
// const LocalStrategy = require('passport-local').Strategy
// const bcrypt = require('bcrypt')


// function initialize(passport, getUserByEmail, getUserById) {
//     const authenticateUser = async (email, password, done) => {
//         const user = getUserByEmail(email)
//         if (user == null) {

//             return done(null, false, { message: 'No user with that email' })
//         }

//         try {
//             if (await bcrypt.compare(password, user.password)) {
//                 return done(null, user)
//             } else {
//                 return done(null, false, { message: 'password incorred' })
//             }
//         }
//         catch (e) {
//             return done(e)
//         }
//     }


//     passport.use(new LocalStrategy({ usernameField: 'email' }, authenticateUser))

//     passport.serializeUser((user, done) => done(null, user.id))
//     passport.deserializeUser((id, done) => {
//         done(null, getUserById(id))
//     })

// }

// module.exports = initialize 

// ///////////////main.js
