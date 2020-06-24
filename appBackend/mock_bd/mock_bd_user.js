//Import - Logger (Winston)

const logger = require('../utilities/logger.js');
const { info } = require('../utilities/logger.js');


// Users , usersProfile, organizersProfile (Objects Arrays)
let users = []
let usersProfile = [];
let organizersProfile = [];

// Create users

const saveUser = (password, register, id) => {

    const role = register.role;

    try {
        users.push({
            id: id,
            firstName: register.firstName,
            lastName: register.lastName,
            userAutonomousCommunity: register.userAutonomousCommunity,
            userProvince: register.userProvince,
            userCity: register.userCity,
            phone: register.phone,
            email: register.email,
            password: password,
            natureAndAdventure: register.natureAndAdventure,
            socialLife: register.socialLife,
            languages: register.languages,
            beliefs: register.beliefs,
            careersAndBusiness: register.careersAndBusiness,
            sportsAndPhisycalCondition: register.sportsAndPhisycalCondition,
            travels: register.travels,
            role: register.role,
            organizerName: register.organizerName,
            organizerAutonomousCommunity: register.organizerAutonomousCommunity,
            organizerProvince: register.organizerProvince,
            organizerCity: register.organizerCity,
            description: register.description,
        })
    } catch (e) {
        logger.error(`The user ${id} has not been created`);
        console.log(`The user ${id} has not been created`, e);
    }

    logger.info(`The user ${id} has been created`);

    if (role === 'organizer') {

        try {
            organizersProfile.push({
                id: id,
                organizerName: register.organizerName,
                organizerAutonomousCommunity: register.organizerAutonomousCommunity,
                organizerProvince: register.organizerProvince,
                organizerCity: register.organizerCity,
                description: register.description

            })
            logger.info(`The organizer profile ${id} has been created`);

        } catch (e) {
            logger.error(`The organizer profile ${id} has not been created`);
            console.log(`The organizer profile ${id} has not been created`, e);
        }

        try {
            usersProfile.push({
                id: id,
                firstName: register.firstName,
                lastName: register.lastName,
                userAutonomousCommunity: register.userAutonomousCommunity,
                userProvince: register.userProvince,
                userCity: register.userCity,
                phone: register.phone,
                email: register.email,
                password: password,
                natureAndAdventure: register.natureAndAdventure,
                socialLife: register.socialLife,
                languages: register.languages,
                beliefs: register.beliefs,
                careersAndBusiness: register.careersAndBusiness,
                sportsAndPhisycalCondition: register.sportsAndPhisycalCondition,
                travels: register.travels,

            })
            logger.info(`The user profile ${id} has been created`);

        } catch (e) {
            logger.error(`The user profile ${id} has not been created`);
            console.log(`The user profile ${id} has not been created`, e);
        }

    }

    if (role === 'user') {
        try {

            usersProfile.push({
                id: id,
                firstName: register.firstName,
                lastName: register.lastName,
                userAutonomousCommunity: register.userAutonomousCommunity,
                userProvince: register.userProvince,
                userCity: register.userCity,
                phone: register.phone,
                email: register.email,
                natureAndAdventure: register.natureAndAdventure,
                socialLife: register.socialLife,
                languages: register.languages,
                beliefs: register.beliefs,
                careersAndBusiness: register.careersAndBusiness,
                sportsAndPhisycalCondition: register.sportsAndPhisycalCondition,
                travels: register.travels,

            })
        } catch (e) {
            logger.error(`The user profile ${id} has not been created`);
            console.log(`The user profile ${id} has not been created`, e);
        }

        logger.info(`The user profile ${id} has been created`);
    }
}

const deleteUser = (id, role) => {

    if (users === undefined) {
        throw new Error('The user array is empty. There is nothing to remove')
    }
    console.log(users);

    if (role === 'user') {

        try {
            usersFilter = users.filter(user => user.id !== parseInt(id));
            users = usersFilter;
            console.log(usersFilter)
            logger.info(`User ${id} has been deleted`)

            userProfileFilter = usersProfile.find(profile => profile.id !== parseInt(id));
            usersProfile = userProfileFilter;
            logger.info(`User Profile for user ${id} has been deleted`);

        } catch (e) {

            logger.error(`User ${id} has not been deleted`);
            console.log(`User  ${id} has not been deleted`, e)

            logger.error(`User Profile for user ${id} has not been deleted`);
            console.log(`User Profile for user ${id} has not been deleted`, e);

        }
    }

    if (role === 'organizer') {
        try {
            usersFilter = users.filter(user => user.id !== parseInt(id));
            users = usersFilter;
            console.log(usersFilter)
            logger.info(`User ${id} has been deleted`)

            userProfileFilter = usersProfile.filter(profile => profile.id !== parseInt(id));
            usersProfile = userProfileFilter;
            logger.info(`User Profile for user ${id} has been deleted`);

            organizerProfileFilter = organizersProfile.filter(profile => profile.id !== parseInt(id));
            organizersProfile = organizerProfileFilter;
            logger.info(`Organizer Profile for user ${id} has been deleted`);

        } catch (e) {
            logger.error(`User ${id} has not been deleted`);
            console.log(`User ${id} has not been deleted`, e);

            logger.error(`User Profile for user ${id} has not been deleted`);
            console.log(`User Profile for user ${id} has not been deleted`, e);

            logger.info(`Organizer Profile for user ${id} has been deleted`);
            console.log(`Organizer Profile for user ${id} has been deleted`, e);

        }

    }

}

const listUsers = (filter) => {

    const userAutonomousCommunity = filter.autonomousCommunity;
    const userProvince = filter.userProvince;
    const userCity = filter.userCity;
    const role = filter.role;

    let result = [...users];

    const filterAutComm = user => user.userAutonomousCommunity.toLowerCase().indexOf(userAutonomousCommunity.toLowerCase()) !== -1;
    const filterUserProvince = user => user.userProvince.toLowerCase().indexOf(userProvince.toLowerCase()) !== -1;
    const filterUserCity = user => user.userCity.toLowerCase().indexOf(userCity.toLowerCase()) !== -1
    const filterRole = user => user.role.toLowerCase().indexOf(role.toLowerCase()) !== -1

    if (userAutonomousCommunity) {
        result = result.filter(filterAutComm)
    }

    if (userProvince) {
        result = result.filter(filterUserProvince)
    }

    if (userCity) {
        result = result.filter(filterUserCity)
    }

    if (role) {
        result = result.filter(filterRole)
    }

    result = result.map(user => {
        return ({
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            role: user.role,
            organizerName: user.organizerName

        })
    })

}

const getUser = (email) => {

    if (email === undefined) {
        res.status(404).send();
        return;
    }

    try {
        const matchEmail = user => user.email === email;
        return users.find(matchEmail);
    } catch (e) {
        logger.error(`The email entered  ${email}has not been previously registered`);
        console.log(`The email entered  ${email}has not been previously registered`, e);
    }
}


const detailUser = (id) => {
    try {
        const result = users.find(user => user.id === parseInt(id));
        console.log(result);
    } catch (e) {
        logger.error(`The id of the user registered in the database does not match the id entered`);
        console.log(`The id of the user registered in the database does not match the id entered`, e);
    }

}


const detailProfile = (id, role) => {

    try {
        if (role === 'user') {
            const detail = usersProfile.find(user => user.id === parseInt(id));
            console.log(detail);
        }

        if (role === 'organizer') {
            const detail = organizersProfile.find(organizer => organizer.id === parseInt(id));
            console.log(detail);
        }
    } catch (e) {
        logger.error("The role you entered is not contemplated in the profile roles");
        console.log("The role you entered is not contemplated in the profile roles", e);
    }

}

const updateUserProfile = (userProfile, id) => {

    try {

        searchUserProfile = usersProfile.find(userProfile => userProfile.id === parseInt(id));

        Object.keys(userProfile).forEach(field => {
            searchUserProfile[field] = userProfile[field];
        });

        logger.info(`The userProfile ${id} has been updated`);

    } catch (e) {

        logger.error("The entered id does not match the user id found in the database")
        console.log("The entered id does not match the user id found in the database", e)
    }


}

const updateOrganizerProfile = (id, organizerProfile) => {

    searchOrganizerProfile = organizersProfile.find(organizerProfile => organizerProfile.id === parseInt(id));

    if (searchOrganizerProfile === undefined) {
        throw new Error(`The search of the organizer profile to update it did not return any results`)
    }

    try {

        Object.keys(organizerProfile).forEach(field => {
            searchOrganizerProfile[field] = organizerProfile[field];
        });

        logger.info(`The userProfile ${id} has been updated`);

    } catch (e) {
        logger.error("The entered id does not match the organizer id found in the database");
        console.log("The entered id does not match the organizer id found in the database", e)
    }

}


module.exports = {
    getUser,
    saveUser,
    deleteUser,
    listUsers,
    detailUser,
    detailProfile,
    updateUserProfile,
    updateOrganizerProfile,
    users
}
