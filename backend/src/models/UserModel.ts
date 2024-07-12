import mongoose, { Schema, model, Document } from 'mongoose';
import bcrypt from 'bcrypt'
import validator from 'validator'

export interface UserDocument extends Document {
    email: string;
    password: string;
    username: string;
    avatarCloudinaryId?: string;
  }


interface UserModel extends mongoose.Model<UserDocument> {
    signup(email: string, password: string, username: string): Promise<UserDocument>;
    login(email: string, password: string): Promise<UserDocument>;
}


const userSchema = new Schema<UserDocument>({
    email: {
        type: String,
        require: [true, 'Please add an email'],
        unique:true
    },
    password: {
        type: String,
        require: [true, 'Please add a password']
    },
    username: {
        type: String,
        require: [true, 'Please add an username'],
        unique:true
    },
    avatarCloudinaryId: {
        type: String,
        required:false
    },
}, {timestamps: true})  //timestamps adds createdAt and lastUpdate

// static signup method
userSchema.statics.signup = async function(
    email: string,
    password: string,
    username: string
): Promise<UserDocument> {

        // validation
        if (!email || !password || !username) {
        throw Error('All fields must be filled')
        }
        if (!validator.isEmail(email)) {
        throw Error('Email not valid')
        }
        if (!validator.isStrongPassword(password)) {
        throw Error('Password not strong enough')
        }

        const exists = await this.findOne({ email })

        if (exists) {
        throw Error('Email already in use')
        }

        const salt = await bcrypt.genSalt(10) //a generated suffix to be added to the password
        const hash = await bcrypt.hash(password, salt) //hashing the password

        const user = await this.create({ email, password: hash, username})

        return user
  }

  // static login method
  userSchema.statics.login = async function (
    email: string,
    password: string
  ): Promise<UserDocument> {

        if (!email || !password) {
        throw Error('All fields must be filled')
        }

        const user = await this.findOne({ email })

        if (!user) {
        throw Error('Incorrect email')
        }

        const match = await bcrypt.compare(password, user.password)

        if (!match) {
        throw Error('Incorrect password')
        }

        return user
  }


  const User = model<UserDocument, UserModel>('User', userSchema);

  export default User;