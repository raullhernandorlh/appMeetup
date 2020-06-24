
//Imports
const bd = require('../mock_bd/mock_bd_user');
const validation = require('../validations/validations');
const utilities = require('../utilities/hashPassword');
const mailer = require('../utilities/sendEmail')
const bcrypt = require('bcrypt');
let jwt = require('jsonwebtoken');
const moment = require("moment");

// Logger (Winston)
const logger = require('../utilities/logger.js');
const { json } = require('express');

let id = 0;

const register = async (req, res) => {

    const { firstName, lastName, userAutonomousCommunity, userProvince, userCity, phone, email, password
        , natureAndAdventure, socialLife, languages, beliefs, sportsAndPhisycalCondition, careersAndBusiness
        , travels, role, organizerName, organizerAutonomousCommunity, organizerProvince, organizerCity
        , description } = req.body;

    const register = {
        firstName: firstName,
        lastName: lastName,
        userAutonomousCommunity: userAutonomousCommunity, // Select - Not validated
        userProvince: userProvince, // Select - Not validated
        userCity: userCity, // Select - Not Validated
        phone: phone,
        email: email,
        password: password,

        // meetupPreferences: {
        natureAndAdventure: natureAndAdventure, // Checkbox - Not validated
        socialLife: socialLife, // Checkbox - Not validated
        languages: languages, // Checkbox - Not validated
        beliefs: beliefs, // Creencias
        sportsAndPhisycalCondition: sportsAndPhisycalCondition, // Checkbox - Not validated
        careersAndBusiness: careersAndBusiness, // Checkbox - Not validated
        travels: travels, // Checkbox - Not validated
        // },

        role: role, // Select - Not validated - If you are a user you do not have the meetup options available if you are an organizer you have the user options plus the available meetup options
        organizerName: organizerName,
        organizerAutonomousCommunity: organizerAutonomousCommunity, // Select - Not validated
        organizerProvince: organizerProvince, // Select - Not validated
        organizerCity: organizerCity, // Select - Not validated
        description:description, 
    }

    // Comprobamos que el email todavia no existe en la base de datos
    if (!email || !password) {
        res.status(400).send();
        return;
    }

    if (bd.getUser(email)) {
        res.status(409).send();
        return;
    }

    const passwordBcrypt = await bcrypt.hash(password, 10);
    

    try {
        validation.registerValidation(register);
        register.id = ++id;

    } catch (e) {
        res.status(400).send();
        return
    }

    register.password = passwordBcrypt;

    bd.saveUser(passwordBcrypt, register, id);
    
    logger.info("The validation of register fields was successful");

    res.send(bd.users);

}



const login = async (req, res) => {

    const { email, password } = req.body;

    if (email === process.env.EMAIL) {

        const hashPassword = (await utilities.hashThePassword()).password;
        const passwordIsvalid = await bcrypt.compare(password, hashPassword);

        if (!passwordIsvalid) {
            res.status(401).send();
            return;
        }


        const tokenPayload = { role: 'admin' };
        const token = jwt.sign(tokenPayload, process.env.SECRET, {
            expiresIn: '1d'
        });

        res.json({
            token
        })

    } else {

        const user = bd.getUser(email);
        

        if (!user) {
            res.status(404).send();
            return;
        }

        const passwordIsvalid = await bcrypt.compare(password, user.password);

        if (!passwordIsvalid) {
            res.status(401).send();
            return;
        }

        const tokenPayload = {
            id: user.id,
            email: user.email,
            role: user.role
            
        };

        const token = jwt.sign(tokenPayload, process.env.SECRET, {
            expiresIn: '1d'
        });

        res.json({
            token
        })
    }
}

const sendConfirmationEmail = (req, res) => {

    let mailOptions = {
        from: process.env.EMAIL,
        to: process.env.EMAIL_RECEIVER,
        subject: 'Meetup - Registro Realizado con Exito',
        text: "Su registro se ha realizado con exito"
    }

    mailer.sendEmail(mailOptions)

}

const ratingOrganizer = (req,res) =>{


    const {id} = req.params;

// Necesito que me pasen el id del organizador 
}


module.exports = {
    register,
    login,
    sendConfirmationEmail,
    ratingOrganizer,
}
