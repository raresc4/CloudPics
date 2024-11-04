const  User  = require('../../models/user-model.js');
const jwt = require('jsonwebtoken');

const createUser = async (req, res) => {
    try {
        const body = req.body;
        const { username, password } = body;
        if(!username || !password) {
            return res.status(200).send({ message : "Missing username or password" });
        }
        const user = await User.create(
            {
                username,
                password,
                numberOfPhotos: 0,
                dateOfLastPhoto: null,
                dateOfCreation: new Date()
            }
        );
        return res.status(200).send({ message : "User created successfully", data : user });
    }
    catch(error) {
        return res.status(500).json( { message : error.message});
    }
}

const getUserByUsername = async (req, res) => {
    try{
        const body = req.body;
        const { username, password } = body;
        if(!username) {
            return res.status(200).send({ message : "Missing username" });
        }
        if(!password) {
            return res.status(200).send({ message : "Missing password" });
        }
        if(!password && !username) {
            return res.status(200).send({ message : "Missing username and password" });
        }
        const user = await User.findOne({ username });
        if(!user){
            return res.status(200).send({message: 'Succes'});
        }
        return res.status(200).send({message: 'User already exists'});
    }
    catch(error){
        return res.status(500).json({message: error.message});
    }
};

const verifyUser = async (req, res) => {
    try {
        const body = req.body;
        const { username, password } = body;
        if (!username || !password) {
            return res.status(200).send({ message: "Missing username or password", data : false });
        }
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(200).send({ message: 'User not found', data: false});
        }
        if (user.password !== password) {
            return res.status(200).send({ message: 'Invalid password', data: false });
        }
        res.cookie('token', jwt.sign({ username }, process.env.JWT_SECRET), { httpOnly: true });
        return res.status(200).send({ message: 'Succes', data: true });
    } catch (error) {
        return res.status(500).json({ message: error.message , data : false});
    }
};

const incrementPhotoCount = async (req, res) => {
    try {
        const body = req.body;
        const { username } = body;
        if (!username) {
            return res.status(200).send({ message: "Missing username", data : false });
        }
        const user = await User.findOne({ username });
        if(!user) {
            return res.status(200).send({ message: 'User not found', data: false });
        }
        const updateDoc = {
            $set : {
                numberOfPhotos: user.numberOfPhotos + 1,
                dateOfLastPhoto: new Date()
            }
        };
        const options = { upsert: true };
        const filter = { username: username };
        await User.updateOne(filter, updateDoc, options);
        return res.status(200).send({ message: 'Succes', data: true });
    } catch (error) {
        return res.status(500).json({ message: error.message, data: false });
    }
};

const changePassword = async (req, res) => {
    try {
        const body = req.body;
        const { username, passwordOld, passwordNew } = body;
        if (!username) {
            return res.status(200).send({ message: "Missing username", data: false });
        }
        if(!passwordOld) {
            return res.status(200).send({ message: "Missing old password", data: false });
        }
        if(!passwordNew) {
            return res.status(200).send({ message: "Missing new password", data: false });
        }
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(200).send({ message: 'User not found', data: false });
        }
        if (user.password !== passwordOld) {
            return res.status(200).send({ message: 'Invalid old password', data: false });
        }
        const updateDoc = {
            $set : {
                password: passwordNew
            }
        };
        const options = { upsert: true };
        const filter = { username: username };
        await User.updateOne(filter, updateDoc, options);
        return res.status(200).send({ message: 'Succes', data: true });
    } catch (error) {
        return res.status(500).json({ message: error.message, data: false });
    }
};

const deleteUser = async (req, res) => {
    try {
        const body = req.body;
        const { username } = body;
        if (!username) {
            return res.status(200).send({ message: "Missing username", data: false });
        }
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(200).send({ message: 'User not found', data: false });
        }
        await User.deleteOne({ username });
        return res.status(200).send({ message: 'Succes', data: true });
    } catch (error) {
        return res.status(500).json({ message: error.message, data: false });
    }
};

const getUserAboutInfo = async (req, res) => {
    try {
        const body = req.body;
        const { username } = body;
        if (!username) {
            return res.status(200).send({ message: "Missing username", data: false });
        }
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(200).send({ message: 'User not found', data: false });
        }
        return res.status(200).send({ message: 'Succes', data: {
            nrOfPhotos : user.numberOfPhotos,
            lastPhoto : user.dateOfLastPhoto,
            accountCreationDate : user.dateOfCreation
        } });
    } catch (error) {
        return res.status(500).json({ message: error.message, data: false } );
    }
};

module.exports =  { createUser, getUserByUsername, verifyUser, incrementPhotoCount, changePassword, deleteUser, getUserAboutInfo };