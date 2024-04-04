import  bcrypt from 'bcrypt';

export const hasPassword= async (password)=>{
    try{
    const saltRounds=10;
      const hashedPassword= await bcrypt.hash(password, saltRounds)
        return hashedPassword
        }catch(error){
        console.log(`Erro`);}
        };
export const comparePasssword = async (password,hashedPassword)=>{
return bcrypt.compare(password,hashedPassword);
};