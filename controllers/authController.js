import { compare } from 'bcrypt';
import userModel from '../models/userModel.js';
import { comparePasssword, hasPassword, } from  './../helpers/authHelper.js';
import JWT from 'jsonwebtoken'
export const registerController =  async (req,res) => {

    try{
       const { name,email,password,phone,address } = req.body
       //validations
       if(!name){
       return res.send({message:'Name is required' })
       }
       if(!email){
        return res.send({message:'email is required' })
        }
        if(!password){
            return res.send({message:'password is required' })
            }
            if(!phone){
                return res.send({message:'phoneis required' })
                }
                if(!address){
                    return res.send({message:'address is required' })
                    }
                   //check user
                    const existingUser =  await userModel.findOne({email})
         //existing user
         
         if(existingUser){
         return res.status(200).send({
            
            success:false,
            message:"Aldready Register please Login",
          
            
            }) 
         }
         
         //register user
         const hashedPassword= await hasPassword(password)
         //save 
         const user = new userModel({name,email,phone,address,password:hashedPassword }).save()
         
         res.status(201).send({
            
            success:true,
            message:" user Register successfully ",
            user,
              
                
            }) 
         
    } catch(error){
            console.log(`Erro`)
            res.status(500).send({
            
            success:false,
            message:"Erro in Registeration",
            error
            
            }) }


};

//POST LOGIN

export const loginController =  async (req,res) => {

try{
    const { email,password} = req.body
       //validations
       if(!email || !password){
       return   res.status(404).send({
            
        success:false,
        message:"Invalid email and password",
        error
            
        })
       }
       const user = await userModel.findOne({ email})
       if(!user){
       return res.status(404).send({
            
        success:false,
        message:" email is not registered",
       
            
        })
       }
       
       const match= await comparePasssword(password,user.password);
       
       if (!match) {
        // Utiliser le même message pour le mot de passe incorrect
        return res.status(404).send({
            success: false,
            message: "Invalid email or password",
            error: null
        });
    } 
    
 // Créer un token JWT sécurisé
 const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

 res.status(200).send({
     success: true,
     message: "Login successful",
     user: {
         name: user.name,
         email: user.email,
         phone: user.phone,
         address: user.address
     },
     token
 });

} catch (error) {
 console.log(`Error`);
 res.status(500).send({
     success: false,
     message: "Error in Login",
     error
 });
}
};


//test controllers

export const testController =(req, res)=>{
try {
    res.send('protected routes');  
} catch (error) {
console.log(error)
res.send({error});
    
}

};

