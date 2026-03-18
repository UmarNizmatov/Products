import mongoose from "mongoose";

const dbConnect = async ()=>{
    try {
        await mongoose.connect(process.env.MONGO_DB_URL).then(()=>console.log("Database connected")).catch((err)=>{throw err})
    } catch (error) {
        console.log(error)
        throw error
    }
}
export default dbConnect