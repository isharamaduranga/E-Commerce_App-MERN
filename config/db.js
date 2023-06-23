import mongoose from 'mongoose';
import colors from 'colors';

const connectDB = async () =>{
    try{
        //connect mongo database
        const conn = await mongoose.connect(process.env.MONGO_URL);
        console.log(`Connected to Mongodb Database ${conn.connection.host}`.bgGreen.yellow)

    }catch (error) {
        console.log(`Error in MongoDb ${error}`.bgRed.white);
    }
}

export default connectDB;