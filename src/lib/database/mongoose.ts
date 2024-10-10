import mongoose, { Mongoose }  from 'mongoose';

const MONGODB_URL : string = process.env.MONGODB_URL! ;

interface MongooseConnection {
    conn: Mongoose | null;
    promise : Promise<Mongoose> | null;
}

let cached: MongooseConnection = global.mongoose;

if(!cached){
    cached = global.mongoose = {
        conn:null,
        promise:null
    }
}

export async function connectDB(){
    try {
        
        if(cached.conn) return cached.conn;
    
        cached.promise = cached.promise || 
        mongoose.connect(MONGODB_URL,{
            dbName:"clerk-image-generator",
            bufferCommands:false,
            connectTimeoutMS:30000,
        });
    
        cached.conn = await cached.promise;
    
        return cached.conn;
    } catch (error) {
        console.log("ERROR CONNECING TO DB: ",error);
    }
}




// export async function connectDB() {
//     try {
//         mongoose.connect(MONGODB_URL);
//         const connection = mongoose.connection;

//         connection.on("connected",() => {
//             console.log("mongoDB connected")
//         })

//         connection.on("error",(err) => {
//             console.log("mongoDB connection error",err);
//             process.exit();
//         })
//     } catch (error) {
//         console.log("something went wrong while connecting to DB: ",error)
//     }
// }