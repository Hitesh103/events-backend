import bcrypt from 'bcrypt'
import userModel from "../model/user.js";
import jwt from 'jsonwebtoken';
import axios from 'axios';


export const createUser = async (req, res) => {
    if (req.body.googleAccessToken) {
        const { googleAccessToken } = req.body;
        axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
            headers: {
                "Authorization": `Bearer ${googleAccessToken}`
            }
        })
            .then(async response => {
                const firstname = response.data.given_name;
                const lastname = response.data.family_name;
                const email = response.data.email;

                const existingUser = await userModel.findOne({ "email": email })
                if (existingUser) {
                    const token = jwt.sign({
                        email: existingUser.email,
                        id: existingUser._id
                    }, process.env.JWT_SCREATE_KEY, { expiresIn: '720h' })

                    return res.status(200).json(
                        { "user": existingUser, "token": token }
                    );
                } else {
                    const salt = await bcrypt.genSalt(10);
                    const user = new userModel({
                        "firstname": firstname,
                        "lastname": lastname,
                        "email": email,
                    })

                    await user.save();
                    const token = jwt.sign({
                        email: email,
                        id: user._id
                    }, process.env.JWT_SCREATE_KEY, { expiresIn: '720h' })
                    res.status(200).json(
                        { "user": user, "token": token }
                    );
                }
            }).catch(err => {
                res.status(400).json({ message: "Invalid access token!" });
            })
    }
}