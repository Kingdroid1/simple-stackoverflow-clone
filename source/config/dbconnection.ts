import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
import { secrets } from './secrets';

//connecting to the Mongo DB Server
mongoose.Promise;
function db_connection() {
    mongoose
        .connect(secrets.MONGODB, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        })
        .then(() => {
            console.log('Successfully connected to Mongo DB!');
        })
        .catch((err) => {
            console.log('Could not connect to MongoDB ' + err.message);
        });

}
export default db_connection;
