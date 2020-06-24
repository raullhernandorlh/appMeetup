//Imports 

const bd = require('../mock_bd/mock_bd_meetup');
const moment = require("moment");
const logger = require('../utilities/logger.js')

moment.locale('es');
const validation = require('../validations/validations');

const fechaYHora = moment();

const categories = ["natureandadventure", "sociallife", "languages", "beliefs"
    , "sportsAndPhisycalCondition", "careersandbusiness", "travels"]


let id = 0;

const addMeetup = (req, res) => {

    const emailOrganizer = req.auth.email;
    const idOrganizer = req.auth.id;

    const { title, dateAndHour, duration, category, meetupImage, organizerName, organizerImage, organizerAutonomousCommunity
        , organizerProvince, organizerCity, price, description } = req.body;
  
    const meetup = {
        title: title,
        dateAndHour: dateAndHour,
        duration: duration,
        category: category,
        meetupImage: meetupImage,
        idOrganizer: idOrganizer,
        emailOrganizer:emailOrganizer,
        organizerName: organizerName,
        organizerImage: organizerImage,
        organizerAutonomousCommunity: organizerAutonomousCommunity,
        organizerProvince: organizerProvince,
        organizerCity: organizerCity,
        price: price,
        description: description,
        
        comments: [],
        updates: [],
        rating:[]
    }


    if (meetup.category === categories[0] || meetup.category === categories[1] || meetup.category === categories[2]
        || meetup.category === categories[3] || meetup.category === categories[4] || meetup.category === categories[5]
        || meetup.category === categories[6]) {
            
        try {
            validation.meetupValidation(meetup)
            logger.info("The validation of register fields was successful");
            meetup.id = ++id;

        } catch (e) {
            res.status(400).send();
            return
        }

        bd.createMeetup(meetup, id)


        res.send();
    }
    else {
        res.status(404).send()
    }
}

const removeMeetup = (req, res) => {
    
    
    const id = parseInt(req.params.id);


    if(id === undefined){
        res.status(404).send;
        return;
    }

    bd.deleteMeetup(id);
    
    res.send();
}

const updateMeetup = (req, res) => {


    let id = parseInt(req.params.id);

    if (isNaN(id)) {
        res.status(400).send();
        return;
    }


    const { title, dateAndHour, duration, category, meetupImage,organizerName, organizerImage, organizerAutonomousCommunity
        , organizerProvince, organizerCity, price, description } = req.body;


    const meetup = {
        title: title,
        dateAndHour: dateAndHour,
        duration: duration,
        category: category,
        meetupImage: meetupImage,
        organizerName: organizerName,
        organizerImage: organizerImage,
        organizerAutonomousCommunity: organizerAutonomousCommunity,
        organizerProvince: organizerProvince,
        organizerCity: organizerCity,
        price: price,
        description: description,
        comments: [],
        updates: [],
        rating:[]
    }
        
    

    // if (meetup.title === undefined || meetup.dateAndHour === undefined || meetup.duration === undefined
    //     || meetup.category === undefined || meetup.meetupImage === undefined || meetup.organizerName === undefined ||meetup.organizerImage ||meetup.organizerAutonomousCommunity === undefined
    //     || meetup.organizerProvince === undefined || meetup.organizerCity === undefined || meetup.price === undefined || meetup.description === undefined
    //     || meetup.comments || meetup.updates || meetup.rating
    //     ) {
    //     res.status(400).send();
    //     return;
    // }

    if (meetup.category === categories[0] || meetup.category === categories[1] || meetup.category === categories[2]
        || meetup.category === categories[3] || meetup.category === categories[4] || meetup.category === categories[5]
        || meetup.category === categories[6]) {


        try {
            validation.meetupValidation(meetup)
            meetup.id = id;

        } catch (e) {
            res.status(400).send();
            return
        }


        bd.updateMeetup(meetup, id);
        res.send();

    } else {
        res.status(404).send();
        return
    }

}


const listOrganizerMeetups = (req,res) =>{

    const id  = parseInt(req.params.id);

    if (id == undefined) {
        res.status(404).send();
        return
    }


    bd.listOrganizerMeetups(id);
    res.send();

}



const detailMeetup = (req, res) => {

    const { id } = req.params;

    if (id == undefined) {
        res.status(404).send();
        return
    }

    bd.detailMeetup(id);
    res.send();

}

const listMeetups = (req, res) => {

    const { category, autonomousCommunity, province, city, date, hour } = req.query;

    let filter = {
        category: category,
        autonomousCommunity: autonomousCommunity,
        province: province,
        city: city,
        date: date,
        hour: hour
    }

    bd.filterMeetups(filter);
    res.send();

}

const addComment = (req, res) => {

    const commentId = 1;
    const dateAndHour = fechaYHora.format();
    const id = parseInt(req.params.id);
    const { comment } = req.body

    const commentObject = {
        commentId: commentId,
        dateAndHour: dateAndHour,
        comment: comment
    }

    bd.createComment(commentObject, id)
    res.send()
}


const addUpdate = (req, res) => {
    const updateId = 1;
    const dateAndHour = fechaYHora.format();
    const id = parseInt(req.params.id);
    const { update } = req.body


    const updateObject = {
        updateId: updateId,
        dateAndHour: dateAndHour,
        update: update
    }

    bd.createUpdate(updateObject, id)
    res.send()
}

module.exports = {
    addMeetup,
    removeMeetup,
    updateMeetup,
    detailMeetup,
    listMeetups,
    listOrganizerMeetups,
    addComment,
    addUpdate
}
