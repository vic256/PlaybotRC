const MEMORY_STORAGE: User[] = [];

export interface IUser {
    id: string;
    email: string;
    password: string;
    isAdmin: boolean
}

export default class User implements IUser {
    id: string;
    email: string;
    password: string;
    isAdmin: boolean

    constructor(user: IUser) {
        this.id = user.id;
        this.email = user.email;
        this.password = user.password;
        this.isAdmin = user.isAdmin;
    }

    static serialize(user: User) {
        return {id: user.id, email: user.email, isAdmin: user.isAdmin}
    }

    static findOne(id: string): User|undefined {
        return MEMORY_STORAGE.find(user => user.id === id);
    }

    static findBy(field: 'id'|'email', value: any): User|undefined {
        return MEMORY_STORAGE.find(user => user[field] === value);
    }

    static create(user: IUser): User {
        MEMORY_STORAGE.push(new User(user));
        return user;
    }
}