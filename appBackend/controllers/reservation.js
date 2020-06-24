
//Imports
const bd = require("../mock_bd/mock_bd_reservation");
const moment = require("moment");
const { meetups } = require("../mock_bd/mock_bd_meetup");
const logger = require("../utilities/logger");
const { reservations } = require("../mock_bd/mock_bd_reservation");
moment.locale('es');


let id = 0;
const createReservation = (req, res) => {

    const idUser = parseInt(req.params.idUser);

    const idMeetup = parseInt(req.params.idMeetup);


    if (idUser === undefined) {
        res.status(404).send();
    }

    if (idMeetup === undefined) {
        res.status(404).send();
    }


    const meetup = meetups.find(meetup => parseInt(meetup.id) === idMeetup);

    let reservation = {

        idMeetup: idMeetup,
        idUser: idUser,
        title: meetup.title,
        meetupDateAndHour: meetup.dateAndHour,
        price: meetup.price,
        duration: meetup.duration,
    }

    reservation.id = ++id;
    reservation.paidOut = false;
    if(reservations.find(bdreservation => bdreservation.idUser === reservation.idUser 
         && bdreservation.idMeetup === reservation.idMeetup)){
        throw Error(`Error. Duplicate Reserve. Reservation already added by this user to the database`);
        return
    }
    bd.createReservation(reservation, id)
    res.send(bd.reservations);

}


const removeReservation = (req, res) => {

    const id = parseInt(req.params.id);

    if (id === undefined) {
        res.status(400).send();
    }


    bd.deleteReservation(id);
    res.send();

}


const listReservations = (req, res) => {

    const id = parseInt(req.params.id);

    if (id === undefined) {
        res.status(400).send()
    }

    bd.listReservations(id);
    res.send();
}

const detailReservation = (req, res) => {

    const reservationId = parseInt(req.params.reservationId);

    if (reservationId === undefined) {
        res.status(400).send();
    }

    bd.detailReservation(reservationId);
    res.send();
}

const payReservation = (req, res) => {

    const reservationId = parseInt(req.params.reservationId);
    console.log(reservationId)

    if (reservationId === undefined) {
        res.status(400).send();
    }

    bd.payReservation(reservationId);
    res.send();
}


module.exports = {

    createReservation,
    removeReservation,
    listReservations,
    detailReservation,
    payReservation
}
