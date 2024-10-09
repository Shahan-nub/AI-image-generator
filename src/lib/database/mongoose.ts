import mongoose , {Mongoose} from 'mongoose';

const MONGODB_URL : string | any = process.env.MONGODB_URL ;

interface MongooseConnection {
    conn: Mongoose |null;
    promise : Promise<Mongoose> | null;
}

let catched: MongooseConnection = (global as any).mongoose

export async function connectDB() {
    try {
        mongoose.connect(MONGODB_URL);
        const connection = mongoose.connection;

        connection.on("connected",() => {
            console.log("mongoDB connected")
        })

        connection.on("error",(err) => {
            console.log("mongoDB connection error",err);
            process.exit();
        })
    } catch (error) {
        console.log("something went wrong while connecting to DB: ",error)
    }
}