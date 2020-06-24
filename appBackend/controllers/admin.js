//Imports 

const bd = require('../mock_bd/mock_bd_user');


const removeUser = (req, res) => {

    const id = parseInt(req.params.id);
   
    const role = req.params.role

    if( id === undefined || role === undefined){
        res.status(402).send();
        return
    }

    bd.deleteUser(id,role);

    res.send();

}


const listUsers = (req, res) => {

    const { userAutonomousCommunity, userProvince, userCity, role } = req.query;

    let filter = {
        userAutonomousCommunity: userAutonomousCommunity,
        userProvince: userProvince,
        userCity: userCity,
        role: role,
    }

    bd.listUsers(filter);
    res.send();

    
}


const detailUser = (req, res) => {

    const id = parseInt(req.params.id);
    console.log(id);

    if(id == undefined){
        res.status(404).send();
        return
    }

    bd.detailUser(id);
    res.send()
}

module.exports = {
    removeUser,
    listUsers,
    detailUser
}




