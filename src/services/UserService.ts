import User from "../models/User";

export default class UserService {
    show(id: string) {
        return User.findOne(id);
    }
}