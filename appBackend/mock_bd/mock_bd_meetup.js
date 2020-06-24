// const meetup = require("../controllers/meetup");

const logger = require('../utilities/logger.js');
const moment = require('moment');



let meetups = [];


const createMeetup = (meetup, id) => {

    const result = meetups.push({

        id: id,
        title: meetup.title,
        dateAndHour: meetup.dateAndHour,
        duration: meetup.duration,
        category: meetup.category,
        meetupImage: meetup.meetupImage,
        organizerId: meetup.idOrganizer,
        organizerEmail: meetup.emailOrganizer,
        organizerName: meetup.organizerName,
        organizerAutonomousCommunity: meetup.organizerAutonomousCommunity,
        organizerProvince: meetup.organizerProvince,
        organizerCity: meetup.organizerCity,
        price: meetup.price,
        description: meetup.description,
        comments: meetup.comments,
        updates: meetup.updates,
        rating: meetup.rating
    })

    console.log(result);

    logger.info(`The meetup ${id} the meetup has been created`)
}



const updateMeetup = (meetup, id) => {

    if (meetups.length < 1) {
        throw new Error('There is no meetup in the database');
        return
    }

    searchMeetup = meetups.find(meetup => meetup.id === parseInt(id));

    if (searchMeetup === undefined) {
        throw new Error('No results were found when searching the meetup to update')
        logger.error('The search did not get any result')
        return
    }


    try {
        Object.keys(meetup).forEach(field => {
            searchMeetup[field] = meetup[field];
        });

    } catch (e) {
        throw new Error(`The update of the meetup was not successful`)
    }


    logger.info(`The meetup ${id} has been updated`);

}



const deleteMeetup = (id) => {

    if (meetups === undefined) {
        logger.error('The meetups table was not found in the database')
        throw new Error('The meetups table was not found in the database');
        return
    }

    if (meetups.length < 1) {
        logger.error('There is no meetup in the database. Impossible to remove')
        throw new Error('There are no meetups to delete in the database');
        return
    }

    try {
        meetups = meetups.filter(meetup => meetup.id !== parseInt(id));
    }
    catch (e) {
        throw new Error('Error deleting the meetup', e)
    }


}

const listOrganizerMeetups = (id) => {

    const searchMeetups = meetups.filter(meetup => meetup.organizerId == parseInt(id));

   console.log(searchMeetups);



}

const filterMeetups = (filter) => {

    const category = filter.category;
    const organizerAutonomousCommunity = filter.organizerAutonomousCommunity;;
    const organizerProvince = filter.organizerProvince;
    const organizerCity = filter.organizerCity;;
    const date = filter.date;
    const hour = filter.hour;;


    let result = [...meetups];

    const filterCategory = meetup => meetup.category.toLowerCase().indexOf(category.toLowerCase()) !== -1;

    const filterAutonomousCommunity = meetup => meetup.organizerAutonomousCommunity.toLowerCase()
        .indexOf(organizerAutonomousCommunity.toLowerCase()) !== -1;

    const filterOrganizerProvince = meetup => meetup.organizerProvince.toLowerCase().
        indexOf(organizerProvince.toLowerCase()) !== -1

    const filterOrganizerCity = meetup => meetup.organizerCity.toLowerCase().indexOf(organizerCity.toLowerCase()) !== -1
    const filterDate = meetup => meetup.date.toLowerCase().indexOf(date.toLowerCase()) !== -1
    const filterHour = meetup => meetup.hour.toLowerCase().indexOf(hour.toLowerCase()) !== -1

    if (category) {
        result = result.filter(filterCategory)
    }

    if (organizerAutonomousCommunity) {
        result = result.filter(filterAutonomousCommunity)
    }

    if (organizerProvince) {
        result = result.filter(filterOrganizerProvince)
    }

    if (organizerCity) {
        result = result.filter(filterOrganizerCity)
    }

    if (date) {
        result = result.filter(filterDate)
    }

    if (hour) {
        result = result.filter(filterHour)
    }

    console.log(result);

}

const detailMeetup = (id) => {


    const findMeetup = meetups.find(meetup => meetup.id === parseInt(id));

    if (findMeetup === undefined) {
        throw new Error(`Impossible to show the meetup detail. No meetup with this id was found ${id}`)
        return
    }
    console.log(findMeetup)



}


const createComment = (comment, id) => {

    const meetupToComment = meetups.find(meetup => meetup.id === parseInt(id));

    meetupToComment.comments.push({
        dateAndHour: comment.dateAndHour,
        comment: comment.comment
    })

    logger.info(`The comment has been created`);

}

const createUpdate = (update, id) => {

    const meetupToUpdate = meetups.find(meetup => meetup.id === parseInt(id));

    meetupToUpdate.updates.push({
        dateAndHour: update.dateAndHour,
        update: update.update
    })

    logger.info(`The update has been created`);

}

const voteMeetupBd = (idMeetup, vote) => {

    const findMeetup = meetups.find(meetup => parseInt(meetup.id) === idMeetup)

    const findMeetupDate = parseInt(findMeetup.dateAndHour);

    const findMeetupDuration = parseInt(findMeetup.duration);

    let dateAndHourMoment = moment.unix(findMeetupDate);

    let hourAndDateMomentNow = moment();

    let dateAndHourMomentPlusDuration = dateAndHourMoment.add(findMeetupDuration, 'Hours');

    if (!(moment(hourAndDateMomentNow).isAfter(dateAndHourMomentPlusDuration))) {

        logger.error(` The current date and time ${hourAndDateMomentNow} is before the meetup occurs 
                    ${dateAndHourMomentPlusDuration}`);
        return;
    }

    findMeetup.rating.push(parseInt(vote));

}

const meetupAvg = (idMeetup) => {

    const findMeetup = meetups.filter(meetup => meetup.id === idMeetup);

    const meetupRatings = findMeetup.map(meetup => {
        return (meetup.rating)
    })

    const arrayWithVotes = meetupRatings;
    console.log(arrayWithVotes)

    let sum = arrayWithVotes.reduce((previous, current) => current += previous);
    console.log(sum);
    let avg = sum / arrayWithVotes.length;
    console.log(`La media de los votos de este meetup es ${avg}`);

    return
}



module.exports = {
    createMeetup,
    deleteMeetup,
    updateMeetup,
    detailMeetup,
    listOrganizerMeetups,
    filterMeetups,
    createComment,
    createUpdate,
    voteMeetupBd,
    meetupAvg,
    meetups

}

