export class Token {
    jti: number;
    sub: string;
    authorities: string[];
    iat: number;
    exp: number
}