import jwt from 'jsonwebtoken';
import { secrets } from '../config/secrets';

const authorizeUser = (req: any, res: any, next: any) => {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
        return res.status(401).send('Access Denied!');
    } else {
        //verify token in header
        jwt.verify(token, secrets.JWT_SECRET, (err: any, verified: any) => {
            if (!err) {
                //set
                req.user = verified;
                next();
            } else {
                return res.status(403).send({ message: err });
            }
        });
    }
}

export default authorizeUser