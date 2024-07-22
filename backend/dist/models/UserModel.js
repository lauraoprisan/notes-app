import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';
import validator from 'validator';
const userSchema = new Schema({
    email: {
        type: String,
        require: [true, 'Please add an email'],
        unique: true
    },
    password: {
        type: String,
        require: [true, 'Please add a password']
    },
    username: {
        type: String,
        require: [true, 'Please add an username'],
        unique: true
    },
    profileImageURL: {
        type: String,
        required: false
    },
}, { timestamps: true }); //timestamps adds createdAt and lastUpdate
// static signup method
userSchema.statics.signup = async function (email, password, username) {
    // validation
    if (!email || !password || !username) {
        throw Error('All fields must be filled');
    }
    if (!validator.isEmail(email)) {
        throw Error('Email not valid');
    }
    const exists = await this.findOne({ email });
    if (exists) {
        throw Error('Email already in use');
    }
    if (!validator.isStrongPassword(password)) {
        throw Error('Password not strong enough');
    }
    const salt = await bcrypt.genSalt(10); //a generated suffix to be added to the password
    const hash = await bcrypt.hash(password, salt); //hashing the password
    const user = await this.create({ email, password: hash, username });
    return user;
};
// static login method
userSchema.statics.login = async function (email, password) {
    if (!email || !password) {
        throw Error('All fields must be filled');
    }
    const user = await this.findOne({ email });
    if (!user) {
        throw Error('Incorrect email');
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
        throw Error('Incorrect password');
    }
    return user;
};
const User = model('User', userSchema);
export default User;
//# sourceMappingURL=UserModel.js.map