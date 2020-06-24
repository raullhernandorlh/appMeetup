// Libraries
require('dotenv').config()

const bodyParser = require('body-parser');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');


const app = express();



// Imports

const {voteMeetup,meetupRating} = require('./controllers/rating');
const {createReservation,removeReservation,listReservations,detailReservation,payReservation} = require('./controllers/reservation');
const { register, login, ratingOrganizer,sendConfirmationEmail } = require('./controllers/user')
const { removeUser, listUsers, detailUser } = require('./controllers/admin')
const { updateUserProfile,updateOrganizerProfile,detailProfile} = require ('./controllers/profile')
const { addMeetup, removeMeetup, updateMeetup, detailMeetup, listMeetups,addComment,addUpdate,listOrganizerMeetups } = require('./controllers/meetup')
const { isAuthenticated, isAdmin, isOrganizer , isOrganizerOfThisMeetup,isUserOfThisProfile, isUserOfThisReservation} = require('./middlewares/auth');
const logger = require('./utilities/logger');

// Middlewares

app.use(cors());
app.use(morgan('dev'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ENDPOINTS PARA USER ////////////////////////////////////////////////////////////////////////////////////////

app.post('/user/', register)
app.post('/user/login', login)


//ENDPOINTS PARA ADMIN///////////////////////////////////////////////////////////////////////////////////////

app.delete('/user/:role/:id', isAuthenticated, isAdmin, removeUser)
app.get('/user/', isAuthenticated, isAdmin, listUsers)
app.get('/user/:id', isAuthenticated, isAdmin, detailUser)
app.post('/user/:id',isAuthenticated,ratingOrganizer);



// ENDPOINTS PARA ORGANIZER /////////////////////////////////////////////////////////////////////////////////

app.post('/meetup/', isAuthenticated, isOrganizer, addMeetup),
app.delete('/meetup/:id', isAuthenticated, isOrganizer,isOrganizerOfThisMeetup, removeMeetup),
app.put('/meetup/:id', isAuthenticated, isOrganizer,isOrganizerOfThisMeetup, updateMeetup);
app.get('/meetup/:id', isAuthenticated, isOrganizer, isOrganizerOfThisMeetup,detailMeetup);
app.post('/comment/meetup/:id',isAuthenticated,isOrganizer,isOrganizerOfThisMeetup,addComment);
app.post('/update/meetup/:id', isAuthenticated,isOrganizer,isOrganizerOfThisMeetup,addUpdate);



// ENDPOINTS GENERALES (PUEDEN SER UTILIZADOS por  "user" y "organizer")
app.get('/meetup/', listMeetups);
app.get('/listmeetup/organizer/:id',listOrganizerMeetups);
app.get('/profile/:role/:id' ,isAuthenticated,isUserOfThisProfile,detailProfile)
app.put('/profile/user/:id',isAuthenticated,isUserOfThisProfile,updateUserProfile);
app.put('/profile/organizer/:id',isAuthenticated,isUserOfThisProfile,updateOrganizerProfile);

app.get('/email',sendConfirmationEmail)

// ENDPOINTS PARA RESERVAS

app.post('/reservation/:idUser/:idMeetup',isAuthenticated,createReservation);
app.delete('/reservation/:id',isAuthenticated,isUserOfThisReservation,removeReservation);
app.get('/reservation/:reservationId',isAuthenticated,detailReservation)
app.get('/reservation/list/:id',isAuthenticated,listReservations)

// ENDPOINTS RATING MEETUP

app.post('/rating/:idMeetup',isAuthenticated,voteMeetup)
app.get('/rating/:idMeetup',isAuthenticated,meetupRating)

//ENDPOINT PARA REALIZAR PAGO

app.post('/reservation/pay/:reservationId',isAuthenticated,payReservation)

const port = process.env.PORT;

app.listen(port, () => logger.info('Server Running'));


