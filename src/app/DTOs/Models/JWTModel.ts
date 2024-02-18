export interface JWTModel {
    name: string;
    sub: string;
    fullname: string;
    email: string;
    username: string;
    roles: string[];
    exp: number;
    iss: string;
    aud: string;
}