import { UserDocument } from './models/UserModel'; // Adjust the path as per your project structure
import 'custom'; // Importing 'express' module to extend its types

declare module 'express' {
  interface Request {
    user?: UserDocument; // Custom property to hold user information
  }
}
