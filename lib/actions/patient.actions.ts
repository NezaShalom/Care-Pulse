'use server';

import { Query, ID } from "node-appwrite"
import { users } from "../appwrite.config"
import { parseStringify } from "../utils";
//import { parseStringify } from "../utils"

//CREATE(Register)<<PATIENTFORM>> USER THAT LOGS IN TO THE FIRST PAGE OF OUR SITE
export const createUser = async (user: CreateUserParams) => {

    try {
        const newUser = await users.create(
            ID.unique(),
            user.email,
            user.phone,
            undefined,
            user.name
        );
        console.log({newUser})
        
     return parseStringify(newUser);

    } catch (error: any){
        if (error && error?.code === 409) {
            const documents = await users.list([
                Query.equal('email', [user.email])
            ])

            return documents?.users[0]
        }
    }

}

//Get authenticated user information to use it.

export const getUser = async(userId: string) => {

        try {
            const user = await users.get(userId);
        return parseStringify(user);
        } catch (error) {
            console.log(error);
        }
}