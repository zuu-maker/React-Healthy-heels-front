import { db } from "../firebase";
import firebase from "firebase";
import slugify from 'react-slugify';

export const createCategory = async (name) => {
    let slug = slugify(name);

    return await db.collection("Category").add({
        name:name,
        slug:slug,
        timeStamp: firebase.firestore.FieldValue.serverTimestamp()
    })
} 

export const updateCategory = async (id,name) => {
        let slug = slugify(name);
        
        return await db.collection("Category").doc(id)
        .update({
            name: name,
            slug: slug,
            timeStamp: firebase.firestore.FieldValue.serverTimestamp()
        })
}