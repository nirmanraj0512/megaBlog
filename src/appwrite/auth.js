

import { Client, Account, ID } from "appwrite";
import conf from "../conf/conf";

export class AuthService{
    client =new Client();
    account;

    //Ye cosntructor isliye taki jab bhi object call ho naya client apne aap banjaye 
    constructor(){
        try{
                this.client
                .setEndpoint(conf.appwriteUrl)
                .setProject("67908be60028a8a4a8b5"); 
            this.account=new Account(this.client);
            console.log("Appwrite client initialized successfully.");
        }  
        catch(error){
            console.error("Appwrite client initialization error:", error.message);
        }
    }

    //Ye isliye kiye hai na ki ye jo createAccount hai ye alag hai appwrite yani ki indepent hai hai to jab bhi services change karna chahe tgab kar sake upar wala me change kare ke aur andar minir change karke ye producation grade me use hota hai




    //Ye jo code hai na future proof hai jab bhi appwrite ka authorzation ka code lihna hai isko directly ustha kar rajh sakte ho

    
    //Ye create Account hai
    async createAccount({email,password,name}){
        try {
            const userAccount=await this.account.create(ID.unique(),email,password);
            //Yaha par name hum add nhi kiye sab ke saath usko alg se dale hai kyuki create() metthod me support nhi karta hai .CHATGPT
            if(userAccount){
                await this.account.updatePrefs({ name });
                //call another Method----> agar phele se exsit karta hai to login bhi kardo ye soche hai baad me likhege
                return this.login({email,password});
            }
            else{
                return userAccount;
            }
        } catch (error) {
            console.error('AuthService::createAccount::error:', error);
            throw error;
        }
    }
    //ye login ka hai 
    async login({email,password}){
        try {
            //ye jo hai na ye dkocumentaiton se dekhe hai usme login ka diya hau ahi kya likh ahai
            return await this.account.createEmailPasswordSession(email,password);
        } catch (error) {
            throw error;
        }
    }

    //Current user
    async getCurrentUser(){
        try {
            //Ye CHATGPT SE DEKHE HAI Ki before calling getCurrentUser vlaidatge kare ki session exist karta hai ki nhi
            const session = await this.account.getSession('current');
            
        if (session) {
            return await this.account.get();
        }
        } catch (error) {
            // console.log("Appwrite Service::getCurrentUser::error:",error);
        }
        return null;
    }

    //Logout
    async logout(){
        try {
            //yaha par session bhi tha mtlb ki yaha se logout aur sessions bhi hai mtlb har jagah se logout 
            await this.account.deleteSessions();
        } catch (error) {
            console.log("Appwrite Service::logout::error:",error);
        }
    }
}

const authService=new AuthService();
//Dekho aise isliye kiye taki jaha bhi ye call ho waha par object bana na na pade so humlog hi object ko export kardiye.
export default authService




////////////////////YE Sab aaapwrite h=ka hai Backend ekj baar padoge comment to sab samajh aa jayega  arram se
const testSignup = async () => {
    try {
        const user = await authService.createAccount({
            email: 'test@example.com',
            password: 'password123',
            name: 'Test User',
        });
        console.log('Signup successful:', user);
    } catch (error) {
        console.error('Signup failed here:', error.message);
    }
};

// testSignup();
