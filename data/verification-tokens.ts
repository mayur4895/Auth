import { db } from "@/lib/db";

export const verifyTokenById = async(id: string)=>{
    try {
        const  verifytoken = await db.verificationToken.findUnique({ where: { id } });

        if(verifytoken) return verifytoken;
    } catch (err) {
    return null;
    }
}


export const  verifyTokenByEmail = async(email: string)=>{
    try {
        const  verifytoken = await db.verificationToken.findFirst({ where: { email } });

        if(verifytoken) return verifytoken;
    } catch (err) {
    return null;
    }
}

export default {verifyTokenById, verifyTokenByEmail}