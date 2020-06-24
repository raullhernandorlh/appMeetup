const bdMeetup = require("../mock_bd/mock_bd_meetup");
const bdUser = require ("../mock_bd/mock_bd_user");
const bdReservation = require ("../mock_bd/mock_bd_reservation");



require('dotenv').config();

const jwt = require('jsonwebtoken');
const meetup = require("../controllers/meetup");


//ALL REGISTER USER (NO ANONYMOUS USERS)
// Verify that to perform an action the user (user or organizer) must be logged in

const isAuthenticated = (req, res, next) => {
    const { authorization } = req.headers;

    try {
        const decodedToken = jwt.verify(authorization, process.env.SECRET);
        req.auth = decodedToken;
    } catch (e) {
        const authError = new Error('Invalid Token!!. The user has not');
        authError.status = 401;
        return next(authError);
    }
    next();
}

// ADMIN -- Authentication for administrative tasks of the database
const isAdmin = (req, res, next) => {
    if (!req.auth || req.auth.role !== 'admin') {
        const authError = new Error('Only the administrator user is enabled for this operation');
        authError.status = 403;
        return next(authError);
    }
    next();
}

//Organizer - You can act on the creation, modification and deletion of meetups and you can also reserve them

const isOrganizer = (req, res, next) => {

    if (!req.auth || req.auth.role !== 'organizer') {
        const authError = new Error('Only the organizer is enabled for this operation');
        authError.status = 403;
        return next(authError);
    }
    next();
}


//Verify that the organizer is the owner of a meetup to prevent other organizers 
//from removing, modifying, or listing the meetups from this


const isOrganizerOfThisMeetup = (req, res, next) => {
    const id = req.params.id;
    const meetup = bdMeetup.meetups.find(meetup => meetup.id === parseInt(id))
 
    const organizerId = meetup.organizerId;
 
    if (!req.auth || req.auth.id !== organizerId) {
        const authError = new Error(`Unauthorized This user cannot perform this action`);
        authError.status = 403;
        return next(authError);
    }

    next();
}

// Metodo para verificar si un perfil es de un usuario en concreto. 

const isUserOfThisProfile = (req, res, next) => {

    const id = parseInt(req.params.id);
    const profile = bdUser.users.find(user =>user.id === parseInt(id))
    const userId = profile.id;

    if (!req.auth || req.auth.id !== userId) {
        const authError = new Error(`Unauthorized This user cannot perform this action`);
        authError.status = 403;
        return next(authError);
    }

    next();
}


const isUserOfThisReservation = (req,res,next) => {
    const id = parseInt(req.params.id);
    const reservation = bdReservation.reservations.find(reservation => reservation.id === parseInt(id));
    const idUser = reservation.idUser;

    if (!req.auth || req.auth.id !== idUser) {
        const authError = new Error(`Unauthorized This user cannot perform this action`);
        authError.status = 403;
        return next(authError);
    }

    next();
}


// User - You can book meetups and manage your profile

const isUser = (req, res, next) => {
    if (!req.auth || req.auth.role !== 'user') {
        const authError = new Error('Only the user is enabled for this operation');
        authError.status = 403;
        return next(authError);
    }
    next();
}



module.exports = {
    isAuthenticated,
    isOrganizer,
    isAdmin,
    isUser,
    isOrganizerOfThisMeetup,
    isUserOfThisProfile,
    isUserOfThisReservation
}
