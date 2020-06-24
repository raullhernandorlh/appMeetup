
//Imports
const Joi = require('@hapi/joi'); // Validations

async function registerValidation(register) {


    const schema = Joi.object().keys({
        firstName: Joi.string().min(3).max(30).required(),
        lastName: Joi.string().min(3).max(30).required(),
        userAutonomousCommunity: Joi.string().min(3).max(30).required(),
        userProvince: Joi.string().min(3).max(30).required(),
        userCity: Joi.string().min(3).max(30).required(),
        phone: Joi.number().min(9),
        email: Joi.string().pattern(/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/),
        password: Joi.string().pattern(/^(?=^.{6,}$)(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[^A-Za-z0-9]).*/),
        natureAndAdventure: Joi.boolean(),
        socialLife: Joi.boolean(),
        languages: Joi.boolean(),
        beliefs: Joi.boolean(),
        careersAndBusiness: Joi.boolean(),
        sportsAndPhisycalCondition: Joi.boolean(),
        travels: Joi.boolean(),
        role: Joi.string().min(3).max(30).required(),
        organizerName: Joi.string().min(3).max(60),
        organizerAutonomousCommunity: Joi.string().min(3).max(30),
        organizerProvince: Joi.string().min(3).max(30),
        organizerCity: Joi.string().min(3).max(30),
        description: Joi.string().min(3).max(250),
    })

    try{
        const value = await schema.validateAsync(register);

    }catch (e) {
        console.log(e);
    }
    

}

async function meetupValidation(meetup) {

    const schema = Joi.object({
        title: Joi.string().min(3).max(50).required(),
        dateAndHour:Joi.string().required(),
        duration: Joi.number().max(24).required(),
        category: Joi.string().min(3).max(50).required(),
        meetupImage: Joi.string().min(3).max(50).required(),
        idOrganizer: Joi.number(),
        emailOrganizer:Joi.string().pattern(/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/),
        organizerName: Joi.string().min(3).max(30).required(),
        organizerImage: Joi.string().pattern(/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+(?:png|jpg|jpeg|gif|svg)+$/),
        organizerAutonomousCommunity: Joi.string().min(3).max(50).required(),
        organizerProvince: Joi.string().min(3).max(50).required(),
        organizerCity: Joi.string().min(3).max(50).required(),
        description: Joi.string().min(30).max(250).required(),
        price: Joi.string().required(),
        comments: Joi.array(),
        updates: Joi.array(),
        rating:Joi.array(),
    })

    const value = await schema.validateAsync(meetup);
}


async function userProfileValidation(userProfile) {

    const schema = Joi.object({
        firstName: Joi.string().min(3).max(50).required(),
        lastName: Joi.string().min(3).max(50).required(),
        userAutonomousCommunity: Joi.string().min(3).max(50).required(),
        userProvince: Joi.string().min(3).max(50).required(),
        userCity: Joi.string().min(3).max(50).required(),
        phone: Joi.number().min(9),
        email: Joi.string().pattern(/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/),
        natureAndAdventure: Joi.boolean(),
        socialLife: Joi.boolean(),
        languages: Joi.boolean(),
        beliefs: Joi.boolean(),
        careersAndBusiness: Joi.boolean(),
        sportsAndPhisycalCondition:Joi.boolean(),
        travels: Joi.boolean(),
    })

    const value = await schema.validateAsync(userProfile);

}


async function organizerProfileValidation(organizerProfile) {

    const schema = Joi.object().keys({
        firstName: Joi.string().min(3).max(30).required(),
        lastName: Joi.string().min(3).max(30).required(),
        userAutonomousCommunity: Joi.string().min(3).max(30).required(),
        userProvince: Joi.string().min(3).max(30).required(),
        userCity: Joi.string().min(3).max(30).required(),
        phone: Joi.number().min(9),
        email: Joi.string().pattern(/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/),
        natureAndAdventure: Joi.boolean(),
        socialLife: Joi.boolean(),
        languages: Joi.boolean(),
        beliefs: Joi.boolean(),
        careersAndBusiness: Joi.boolean(),
        sportsAndPhisycalCondition: Joi.boolean(),
        travels: Joi.boolean(),
        organizerName: Joi.string().min(3).max(60),
        organizerAutonomousCommunity: Joi.string().min(3).max(30),
        organizerProvince: Joi.string().min(3).max(30),
        organizerCity: Joi.string().min(3).max(30),
        description: Joi.string().min(3).max(250),
    })

    const value = await schema.validateAsync(organizerProfile);

}
 
async function reservationValidation(reservation){

    const schema = Joi.object().keys({


    })

    const value = await schema.validateAsync(reservation)
}


async function paymentValidator (payment){
    

    const schema = Joi.object().keys({
        creditCardNumber: Joi.number().min(1234564378915672).max(9999999999999999), 
        expirationMonth:Joi.number().min(1).max(12),
        expirationYear:Joi.number().min(2020).max(2028),
        securityCode:Joi.number().min(100).max(999)

    })

    const value = await schema.validateAsync(payment);


}





module.exports = {
    registerValidation,
    meetupValidation,
    organizerProfileValidation,
    userProfileValidation
}




