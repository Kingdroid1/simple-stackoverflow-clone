import dotenv from 'dotenv';
dotenv.config();

const secrets = {
    MONGODB: "mongodb://localhost:27017/korapay",
    JWT_SECRET: <any>process.env.JWT_SECRET,
    SESSION_SECRET: <any>process.env.SESSION_SECRET,
    PORT: <any>process.env.PORT || 3000
}

const googleConfig = {
    ClientID: <any>process.env.GOOGLE_CLIENT_ID,
    ClientSecret: <any>process.env.GOOGLE_CLIENT_SECRET,
    CallBackURL: <any>"http://localhost:3000/api/v1/auth/auth/google/callback"
}

const githubConfig = {
    ClientID: <any>process.env.GITHUB_CLIENT_ID,
    ClientSecret: <any>process.env.GITHUB_CLIENT_SECRET,
    CallBackURL: <any>"http://localhost:3000/api/v1/auth/auth/github/callback"

}

export { secrets, googleConfig, githubConfig };