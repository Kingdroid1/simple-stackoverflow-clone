import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../../models/User';
import { secrets } from '../../config/secrets';

/**
 * @POST /api/v1/auth/signup
 * @name User Signup
 * @param {Object} req
 * @param {Object} res
 */
const signup = async (req: any, res: any) => {
    const { displayName, email, password } = req.body;
    const hashed = await bcrypt.hash(password, 10);

    //check that password string contains Alphanumeric and Uppercase letters
    let regex = (/^(?=.*\d)(?=.*[A-Z0-9]).{8,}$/)
    let check = regex.test(password);

    try {
        // check if user account exists
        const existingUser: any = await User.findOne({ email: email });
        if (existingUser) {
            return res.send({ message: 'A user with this email already exist' })
        }
        if (check) {
            new User({
                displayName: displayName.toLowerCase().trim(),
                email: email.toLowerCase().trim(),
                password: hashed
            }).save().then((result: any) => {
                return res.status(201).send({
                    success: true,
                    data: result,
                    message: 'You signed up successfully'
                })
            });
        } else {
            return res.send({ message: 'Password must be at least eight characters, and must use a combination of alpha-numeric characters' })
        }
    } catch (err) {
        return res.status(500).send({ message: 'Could not signup new user', error: err.message });
    }
}

/**
 * @POST /api/v1/auth/login
 * @name User Login
 * @param {Object} req
 * @param {Object} res
 */
const login = async (req: any, res: any) => {

    try {
        const email = req.body.email.toLowerCase().trim();
        const password = req.body.password.trim();

        if (email && password) {
            const user: any = await User.findOne({ email: email });
            if (!user) return res.status(404).send({ success: false, message: 'User does not exist.' });

            //compare user password against user document password
            let compared = bcrypt.compareSync(password, user.password);
            
            if (compared) {
                jwt.sign({ userId: user._id, userEmail: user.email }, secrets.JWT_SECRET, { expiresIn: "24h" }, (err, token) => {
                    return res.status(200).send({
                        success: true,
                        authUser: user,
                        userToken: token,
                        message: "login successful"
                    });
                })
            } else if (!compared) {
                return res.status(403).send({ success: false, message: "incorrect password" });
            }

        } else {
            res.send({ message: 'Email or password might be wrong' })
        }
    } catch (err) {
        return res.status(500).send({ message: 'Could not login user', error: err.message });
    }
}

export { signup, login };
