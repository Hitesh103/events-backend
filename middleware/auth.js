import jwt from 'jsonwebtoken';
import userModel from '../model/user.js';


const authMiddleware = async (req, res, next) => {
    try {
        const token = req.body.authorization;
        if (token) {
            const decode =  jwt.verify(token, 'alleventassignment');
            const user_id = decode.id;
            const user = await userModel.findById(user_id);
            if (user) {
                req.body.userId = user_id;
                next();
            } else {
                res.status(500).send('Internal server Error');
            }
        }
    } catch (error) {
        res.status(403).send('access denied');
    }
}

export default authMiddleware;