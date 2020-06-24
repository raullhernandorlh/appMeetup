
const bd = require('../mock_bd/mock_bd_meetup');
const moment = require("moment");
const logger = require("../utilities/logger");
moment.locale('es');


const voteMeetup = (req, res) => {

    const idMeetup = parseInt(req.params.idMeetup)
    const vote = parseInt(req.body.vote);

    if(idMeetup === undefined || vote === undefined){
        res.status(404).send();
        return
    }

    bd.voteMeetupBd(idMeetup,vote);
    res.send()

}

const meetupRating = (req, res) => {

    const idMeetup = parseInt(req.params.idMeetup);
    console.log(idMeetup)

    bd.meetupAvg(idMeetup);

    res.send();

}



// // Si hacemos valoracion media de un evento hemos de suponer que el id de este meetup no cambia 
// // Podemos suponer que todo se mantiene intacto salvo la fecha que puede variar

// // Id del Meetup que necesito para saber el rating medio de ese meetup

// const idMeetup = req.params.meetup

// const hourAndDateMoment = moment();

//     // // Le añado la duracion a la fecha del meetup convertida a Moment
//     // let dateAndHourMomentPlusDuration = dateAndHourMoment.add(findMeetupDuration, 'Hours');

//     // Filtrando las meetups  previas a la fecha actual

//     const result =reservations.filter(function(reservation) {
//         const meetupReservationDate =parseInt(reservation.meetupDateAndHour);
//         const meetupDateAndHourTsToMoment= moment.unix(meetupReservationDate);

//         if (!(moment(meetupDateAndHourTsToMoment).isAfter(hourAndDateMoment))) {
//             const countReservations = reservations.length;

//             return;
//         }

//         if((moment(meetupDateAndHourTsToMoment).isAfter(hourAndDateMoment) && reservation.idMeetup === idMeetup)){
//             logger.error(`No existen eventos anteriores de este mismo meetup Esta es la primera
//             vez que se realiza`)
//             return;

//         }

//     })

//     res.send(result);

// && reservation.idMeetup === idMeetup


module.exports = {
    voteMeetup,
    meetupRating

}