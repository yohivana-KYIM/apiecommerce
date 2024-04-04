import mongoose from 'mongoose';
import colors from 'colors';
//connection nosql

const connectDB= async ()=>{
try{
const conn= await mongoose.connect(process.env.MONGO_URL)
console.log(`Connect To Mongodb Database ${conn.connection.host}`.bgMagenta.white);
}catch(error){
console.log(`Erro in Mongodb ${error}`.bgRed.white);}};
export default connectDB;