const logger = require('../utilities/logger.js')
const moment = require("moment");
moment.locale('es');
const reservationFullDate = moment();
let id = 0;

let reservations = [];


const createReservation = (reservation, id) => {


    reservations.push({
        id: id,
        meetupTitle: reservation.title,
        idUser: reservation.idUser,
        idMeetup: reservation.idMeetup,
        meetupDateAndHour: reservation.meetupDateAndHour,
        meetupDuration: reservation.duration,
        paidOut: reservation.paidOut,
        meetupPrice: reservation.price,
        reservation: reservationFullDate

    })


    logger.info(`The reservation ${id}  has been created`)
}


const deleteReservation = (id) => {

    if (reservations === undefined) {
        logger.error('The reservations table was not found in the database')
        throw new Error('The reservations table was not found in the database');
        return
    }

    if (reservations.length < 1) {
        logger.error('There is no reservation in the database. Impossible to remove')
        throw new Error('There are no reservations to delete in the database');
        return
    }

    try {
        reservations = reservations.filter(reservation => reservation.id !== parseInt(id));
        console.log(reservations);
    }
    catch (e) {
        console.log(e);
        throw new Error('Error deleting the reservation', e)

    }



}



const detailReservation = (idReservation) => {

    const reservationInfo = reservations.find(reservation => reservation.id === parseInt(idReservation));
    console.log(reservationInfo)
    return reservationInfo;

}

const listReservations = (id) => {

    if (id === undefined) {
        logger.error(`This user ${id} does not exist in the database`);
    }


    if (reservations === undefined) {
        throw new Error(`The reservation array is undefined`)
    }


    try {
        reservations.filter(reservation => reservation.idUser == id);
    } catch (e) {
        throw Error(`No reservation associated with the ${id} was found`);
    }


    logger.info(`The search for user ${id} reservations has been successful`)

    console.log(reservations);

    return reservations

}

const payReservation = (id) => {

    console.log("Estamos en la parte de pago de la reserva");
    console.log(id)

    const reservation = reservations.find(reservation => reservation.id === id)

    // Si la propiedad que indica que la reserva esta pagada esta a false ponerla a true

    if (!(reservation.payOut)) {

        reservation.payOut = true;

        logger.info(`The reservation ${reservation.id}  with an amount ${reservation.price} has been paid`)
        return
    }

    // Si el precio es igual a 0 la daremos como pagada
    if (reservation.price == 0) {
        reservation.payOut = true;
        logger.info(`The reservation has been confirmed and being free you do not need to pay any money`)
        return
    }

    console.log(reservation);
}




module.exports = {
    createReservation,
    deleteReservation,
    detailReservation,
    listReservations,
    payReservation,
    reservations
}