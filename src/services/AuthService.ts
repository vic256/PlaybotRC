import User from "../models/User";
import * as argon2 from "argon2";
import {v4} from "uuid";
import * as jwt from 'jsonwebtoken';
import {JwtPayload} from "jsonwebtoken";

export default class AuthService {
    async register(email: string, password: string) {
        const hashedPassword = await argon2.hash(password);
        return User.create({
            id: v4(),
            password: hashedPassword,
            email,
            isAdmin: false
        })
    }

    async login(email: string, password: string): Promise<string | null> {
        const user = await User.findBy('email', email);
        if(!user) return null;

        if(await argon2.verify(user.password, password)) return await this.generateJwt(user.id);
        return null
    }

    async generateJwt(id: string): Promise<string> {
        return jwt.sign({id}, process.env.JWT_SECRET!)
    }

    async verifyJwt(secret: string): Promise<JwtPayload | string> {
        try {
            return jwt.verify(secret, process.env.JWT_SECRET!);
        } catch (e) {return ''}
    }
}