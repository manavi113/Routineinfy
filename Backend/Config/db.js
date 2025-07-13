const mongoose = require('mongoose');
 

const connectDB = async ()=> {
    try{
        await mongoose.connect(process.env.URI,{
            
        })
        console.log('Database connected');
    } catch(error){
        console.log('An error Occurred', error);
        process.exit(1);
    }


}

module.exports = connectDB;