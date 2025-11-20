import mongoose from "mongoose"


const connectDB = async () => {
    try {
        const connectionString = await mongoose.connect(`${process.env.MONGODB_URI}/${process.env.MONGODB_DB_NAME}`)

        console.log(`DB connected to successfully ${connectionString.connection.host}`);
    } catch (error) {
        console.log(`DB Failed to connect ${error}`);
    }
}

export { connectDB }