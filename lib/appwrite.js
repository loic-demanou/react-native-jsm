import { Account, Avatars, Client, Databases, ID, Query } from 'react-native-appwrite';

export const config = {
    endpoint: 'https://cloud.appwrite.io/v1',
    platform: "com.jsm.aoramedium",
    projectId: "665e2db200012f4fa82c",
    databaseId: "665e31740031bc14211b",
    userCollectionId: "665e31aa000f8935dc85",
    videoCollectionId: "665e31e6002bf224c112",
    storageId: "665e35e3003c957b1284",
}

const {
    endpoint,
    platform,
    projectId,
    databaseId,
    userCollectionId,
    videoCollectionId,
    storageId
} = config;

// Init your React Native SDK
const client = new Client();

client
    .setEndpoint(config.endpoint) // Your Appwrite Endpoint
    .setProject(config.projectId) // Your project ID
    .setPlatform(config.platform) // Your application ID or bundle ID.

    const account = new Account(client);
    const avatars = new Avatars(client);
    const databases = new Databases(client);

    // Register User

    export const createUser = async (email, password, username) => {
        try {
            const newAccount = await account.create(
                ID.unique(),
                email,
                password,
                username
            )
            if(!newAccount) throw Error
            
            const avatarUrl = avatars.getInitials(username)
            await signIn(email, password);

            const newUser = await databases.createDocument(
                config.databaseId,
                config.userCollectionId,
                ID.unique(),
                {
                    accountId: newAccount.$id,
                    email,
                    username,
                    avatar: avatarUrl,
                }
            )

            return newUser;


        } catch (error) {
            console.log(error);
            throw new Error(error);
        }
    }

    export const signIn = async (email, password) => {
    // export async function signIn(email, password) {
        try {
            const session = await account.createEmailPasswordSession(email, password)
            // const session = await account.CreateEmailSession(email, password)
            return session;
        } catch (error) {
            console.log(error);
            throw new Error(error);
        }
    }


    export const getCurrentUser = async () => {
        try {
            const currentAccount = await account.get();

            if(!currentAccount) throw Error;

            const currentUser = await databases.listDocuments(
                config.databaseId,
                config.userCollectionId,
                [Query.equal('accountId', currentAccount.$id)]
            )

            if(!currentUser) throw Error;

            return currentUser.documents[0];

        } catch (error) {
            console.log(error);
        }
    }

    export const getAllPosts = async () => {
        try {
            const posts = await databases.listDocuments(
                databaseId,
                videoCollectionId,
            )

            return posts.documents;
        } catch (error) {
            console.log(error);
            throw new Error(error);
        }
    }



    // export const createUser = () => {
    //     account.create(ID.unique(), 'me@example.com', 'password', 'Jane Doe')
    //     .then(function (response) {
    //         console.log(response);
    //     }, function (error) {
    //         console.log(error);
    //     });
    // }

;