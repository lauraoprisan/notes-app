import jwt from 'jsonwebtoken';
import User from '../models/UserModel.js';
const requireAuth = async (req, res, next) => {
    //verify authentication
    const { authorization } = req.headers;
    if (!authorization) {
        return res.status(401).json({ error: 'Authorization token required' });
    }
    const token = authorization.split(' ')[1];
    try {
        const JWT_SECRET = process.env.JWT_SECRET;
        const { _id } = jwt.verify(token, JWT_SECRET);
        req.user = await User.findOne({ _id }).select('_id');
        // console.log("req.user from requireauth: ", req.user)
        next();
    }
    catch (error) {
        console.log(error);
        res.status(401).json({ error: 'Request is not authorized' });
    }
};
export default requireAuth;
//# sourceMappingURL=requireAuth.js.map