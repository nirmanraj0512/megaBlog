import conf from "../conf/conf";

import { Client, ID,Databases,Storage,Query } from "appwrite";

export class Service{
    client= new Client();
    databases;
    bucket;
    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId); 
        this.databases=new Databases(this.client);
        this.bucket=new Storage(this.client);    
    }

    //Create New Post
    async createPost({title,slug,content,featuredImage,status,userId}){
        try {
            
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId,
                }
            )
        } catch (error) {
            console.log("Appwrite Service::createPost::error:",error)
        }
    }

    //Update POst
    //Yaha par slug yani ki document id hai usko alg se isluiye liye hai taki humm ko du dna na pade object me se
    async updatePost(slug,{title,content,featuredImage,status}){
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                }
            )
        } catch (error) {
            console.log("Appwrite Service::updatePost::error:",error)
        }
    }

    //Delete karna ahi biradar
    async deletePost(slug){
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
            )
            return true;
        } catch (error) {
            console.log("Appwrite Service::deletePost::error:",error);
            return false;
        }
    }

    //Ab harmra ego document chahi la 
    async getPost(slug){
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
            )
        } catch (error) {
            console.log("Appwrite Service::getPost::error:",error)
            return false;
        }
    }
    
    //ab humhra yaisan document chahi jekar satus active hayi
    async getPosts(queries=[Query.equal("status","active")]){
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                // upar hum define kar chuke hai query yaha par bhi akr skate hai docuemnt dekho usme hai
                queries,

            )
        } catch (error) {
            console.log("Appwrite Service::getPosts::error:",error);
            return false;
        }
    }

    //File upload Service
    async uploadFile(file){
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                //File mat dena unique Id do
                ID.unique(),
                file
            ) 
        } catch (error) {
            console.log("Appwrite Service::uploadPost::error:",error)
            return false;
        }
    }

    //Ab delete karne ka hai
    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
        } catch (error) {
            console.log("Appwrite Service::deleteFile::error:",error)
            return false;
        }
    }

    //File preview
    getFilePreview(fileId){
        return this.bucket.getFilePreview(
            conf.appwriteBucketId,
            fileId
        )
    }

}


const  service=new Service()
export default service






/////////////YAha par bhi appwrite ka hi kaam ho rha ahai yaha par fuction hai ki aagr ye fucntion implemet hot ahai to kya hoga wahi hai BACKEND ME KAISE KAAM HOGA 