import jwt from 'jsonwebtoken';
import User from '../models/UserModel.js';
import bcrypt from 'bcrypt';
import generator from 'generate-password';
const generateSecurePassword = () => {
    const password = generator.generate({
        length: 8,
        numbers: true,
        symbols: true,
        uppercase: true,
        lowercase: true,
        excludeSimilarCharacters: true,
        strict: true, //ensures that the password contains at least one character from each of the categories specified.
    });
    return password;
};
const createToken = (_id) => {
    if (!process.env.JWT_SECRET) {
        throw new Error('JWT_SECRET is not defined in the environment variables');
    }
    return jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: '3d' });
};
// login a user
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.login(email, password);
        const { username, _id } = user;
        // create a token
        const token = createToken(_id);
        res.status(200).json({
            email,
            username,
            token,
            _id
        });
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
};
// signup a user
const signupUser = async (req, res) => {
    const { email, password, username } = req.body;
    try {
        const user = await User.signup(email, password, username);
        const { _id } = user;
        // create a token
        const token = createToken(_id);
        res.status(200).json({
            email,
            username,
            token,
            _id
        });
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
};
const googleAuth = async (req, res) => {
    const { email, username, profileImageURL } = req.body;
    try {
        const user = await User.findOne({ email });
        if (user) {
            //Log in with Google
            const token = createToken(user._id);
            res.status(200).json({
                email,
                username,
                token,
                profileImageURL,
                _id: user._id
            });
        }
        else {
            //Sign up with Google
            //generatePassword because it must exist
            const generatedPassword = generateSecurePassword();
            //hash the password
            const salt = await bcrypt.genSalt(10); //a generated suffix to be added to the password
            const hash = await bcrypt.hash(generatedPassword, salt); //hashing the password
            const user = await User.create({ email, password: hash, username, profileImageURL });
            const token = createToken(user._id);
            res.status(200).json({
                email,
                username,
                token,
                profileImageURL,
                _id: user._id
            });
        }
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
};
export { signupUser, loginUser, googleAuth };
//# sourceMappingURL=userController.js.map