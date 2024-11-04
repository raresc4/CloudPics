const jwt = require('jsonwebtoken');
const logout = async (req, res) => {
    try {
    res.clearCookie('token');
    return res.status(200).send({ message: 'User logged out successfully' });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

const getUsername = async (req, res) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(200).send({ message: 'No token found' });
        }
        return res.status(200).send({ message: 'Username retrieved successfully', data: jwt.decode(token) });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

module.exports = { logout, getUsername };