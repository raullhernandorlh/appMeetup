const bd = require('../mock_bd/mock_bd_user');
const validation = require('../validations/validations');


let id = 0;

// Update Profiles

const updateUserProfile = (req, res) => {

    const paramsId = parseInt(req.params.id);

    if (paramsId === undefined) {
        res.status(404).send();
        return
    }

    const { firstName, lastName, userAutonomousCommunity, userProvince, userCity, phone, email, natureAndAdventure
        , socialLife, languages, beliefs, careersAndBusiness, sportsAndPhisycalCondition, travels } = req.body;

    const userProfile = {
        firstName: firstName,
        lastName: lastName,
        userAutonomousCommunity: userAutonomousCommunity,
        userProvince: userProvince,
        userCity: userCity,
        phone: phone,
        email: email,
        natureAndAdventure: natureAndAdventure,
        socialLife: socialLife,
        languages: languages,
        beliefs: beliefs,
        careersAndBusiness: careersAndBusiness,
        sportsAndPhisycalCondition: sportsAndPhisycalCondition,
        travels: travels
    }

    if (userProfile.firstName === undefined || userProfile.lastName === undefined || userProfile.userAutonomousCommunity === undefined
        || userProfile.userProvince === undefined || userProfile.userCity === undefined || userProfile.phone === undefined || userProfile.email === undefined
        || userProfile.natureAndAdventure === undefined || userProfile.socialLife === undefined || userProfile.languages === undefined
        || userProfile.beliefs === undefined || userProfile.careersAndBusiness === undefined || userProfile.sportsAndPhisycalCondition === undefined
        || userProfile.travels === undefined) {
        res.status(400).send();
        return
    }

    try {
        validation.userProfileValidation(userProfile)

    } catch (e) {
        res.status(400).send();
        userProfile.id = id++;
        return
    }

    bd.updateUserProfile(userProfile, paramsId);
    res.send();
}

const updateOrganizerProfile = (req, res) => {

    const paramsId = parseInt(req.params.id);

    if (paramsId === undefined) {
        res.status(404).send();
        return
    }

    const { firstName, lastName, userAutonomousCommunity, userProvince, userCity, phone, email, natureAndAdventure
        , socialLife, languages, beliefs, careersAndBusiness, sportsAndPhisycalCondition, travels
        , organizerName, organizerAutonomousCommunity, organizerProvince, organizerCity, description } = req.body;


    const organizerProfile = {
        firstName: firstName,
        lastName: lastName,
        userAutonomousCommunity: userAutonomousCommunity,
        userProvince: userProvince,
        userCity: userCity,
        phone: phone,
        email: email,
        natureAndAdventure: natureAndAdventure,
        socialLife: socialLife,
        languages: languages,
        beliefs: beliefs,
        careersAndBusiness: careersAndBusiness,
        sportsAndPhisycalCondition: sportsAndPhisycalCondition,
        travels: travels,
        organizerName: organizerName,
        organizerAutonomousCommunity: organizerAutonomousCommunity,
        organizerProvince: organizerProvince,
        organizerCity: organizerCity,
        description: description
    }

    if (organizerProfile.firstName === undefined || organizerProfile.lastName === undefined || organizerProfile.userAutonomousCommunity === undefined
        || organizerProfile.userProvince === undefined || organizerProfile.userCity === undefined || organizerProfile.phone === undefined
        || organizerProfile.email === undefined || organizerProfile.natureAndAdventure === undefined || organizerProfile.socialLife === undefined
        || organizerProfile.languages === undefined || organizerProfile.beliefs === undefined || organizerProfile.careersAndBusiness === undefined
        || organizerProfile.sportsAndPhisycalCondition === undefined || organizerProfile.travels === undefined || organizerProfile.organizerName === undefined
        || organizerProfile.organizerAutonomousCommunity === undefined || organizerProfile.organizerProvince === undefined
        || organizerProfile.organizerCity === undefined || organizerProfile.description === undefined) {
        res.status(400).send();
        return;
    }

    try {
        validation.organizerProfileValidation(organizerProfile)
        organizerProfile.id = id++;

    } catch (e) {
        console.log(e)
        res.status(400).send();
        return

    }

    bd.updateOrganizerProfile(paramsId, organizerProfile);
    res.send();
}


const detailProfile = (req, res) => {

    const { role } = req.params;
    const { id } = req.params;

    if (id === undefined || role === undefined) {
        res.status(404).send();
        return
    }

    bd.detailProfile(id, role);
    res.send();
    return
}


module.exports = {
    updateUserProfile,
    updateOrganizerProfile,
    detailProfile
}
