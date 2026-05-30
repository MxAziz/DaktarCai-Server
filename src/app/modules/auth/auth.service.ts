const login = async(payload: {email: string, password: string}) => {
    console.log(payload);
}

export const AuthService = {
    login,
};