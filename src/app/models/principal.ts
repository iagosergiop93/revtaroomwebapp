export class Principal {

    id: number;
    email: string;
    role: string;
    jwt: string;

    constructor(id: number, email: string, role: string, token: string) {
        this.id = id;
        this.email = email;
        this.role = role;
        this.jwt = token;
    }
}