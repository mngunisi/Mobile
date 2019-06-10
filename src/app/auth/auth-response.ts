export interface AuthResponse {
    user: {
        id: number,
        name: string,
        phoneNumber: string,
        access_token: string,
        expires_in: number
    }
}
