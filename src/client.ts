import mongoose from "mongoose";

export default function connectDB(url: string | undefined, dbName: string | undefined) {
    
    if (!url) return null;
    if (!dbName) return null;

    return mongoose.connect(url, {dbName: dbName, bufferCommands: false})
    .then(() => {
        console.log("DB Connected successfully");
    })
    .catch(err => {
        console.log("Error: "+err);

    });

}