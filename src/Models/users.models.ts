import { Model, model, Schema, Document } from "mongoose";
import bcryptjs from 'bcryptjs';

// Define the interface for the User document
interface User extends Document {
    username: string; // The username of the user
    password: string; // The hashed password of the user
    email: string; // The email of the user
    fullName: string; // The full name of the user
    HashPassword(Userpassword: string): Promise<string>; // Method to hash a given password
    ComparePassword(UserPass: string): Promise<Boolean>; // Method to compare passwords
}

// Define the schema for the User model
const UserSchema: Schema<User> = new Schema(
    {
        username: {
            type: String, // The username must be a string
            required: true, // This field is mandatory
            maxlength: 16, // Maximum length of the username is 16 characters
        },
        password: {
            type: String, // The password must be a string
            required: true, // This field is mandatory
            maxlength: 16, // Maximum length of the password is 16 characters
        },
        email: {
            type: String, // The email must be a string
            required: true, // This field is mandatory
            maxlength: 16, // Maximum length of the email is 16 characters
        },
        fullName: {
            type: String, // The full name must be a string
            required: true, // This field is mandatory
            maxlength: 16, // Maximum length of the full name is 16 characters
        }
    }
);

// Middleware to hash the password before saving the user
UserSchema.pre<User>('save', async function (next) {
    // Skip hashing if the password field is not modified
    if (!this.isModified('password')) return next();

    // Generate a salt for hashing
    const salt = await bcryptjs.genSalt(10);

    // Hash the password using the generated salt
    this.password = await bcryptjs.hash(this.password, salt);

    // Proceed to save the user
    next();
});

// Method to hash a given password
UserSchema.methods.HashPassword = async function (Userpassword: string): Promise<string> {
    const salt = await bcryptjs.genSalt(16); // Generate a stronger salt
    const HashPassword = await bcryptjs.hash(Userpassword, salt); // Hash the given password
    console.log('User Hashed Password', HashPassword); // Log the hashed password (for debugging purposes)
    return HashPassword;
};

// Method to compare a given password with the stored password
UserSchema.methods.ComparePassword = async function (Userpassword: string): Promise<Boolean> {
    const isPasswordCorrect: Boolean = await bcryptjs.compare(Userpassword, this.password); // Compare passwords
    return isPasswordCorrect;
};

// Create and export the User model
const UserModel = model<User>('User', UserSchema);
export default UserModel;
