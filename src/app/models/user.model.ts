export class User {
    constructor(
        public uid: string,
        public name: string,
        public email: string,
    ) {}

    static fromFirebase( {uid, name, email}:{uid: string, name: string, email: string}) {
        return new User(uid, name, email);
    }
}