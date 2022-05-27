import { db } from "../firebase";
import firebase from "firebase";
import slugify from 'react-slugify';

export const createProduct = async ({title, description, price, category, quantity, shipping, images}) => {
    let slug = slugify(title);
    let newTitle = title.toLowerCase()
    let newQuantity = parseInt(quantity)
    return await db.collection("Product").add({
        title:newTitle,
        slug,
        sold:0,
        description,
        price,
        category,
        quantity:newQuantity,
        shipping,
        images,
        createdAt:firebase.firestore.FieldValue.serverTimestamp(),
        updatedAt:firebase.firestore.FieldValue.serverTimestamp()
    })
}

export const updateProduct = async (id,{title, description, price, category, quantity, shipping, images}) => {
    let slug = slugify(title);

    return await db.collection("Product").doc(id)
    .update({
        title,
        slug,
        sold:0,
        description,
        price,
        category,
        quantity,
        shipping,
        images,
        updatedAt:firebase.firestore.FieldValue.serverTimestamp()
    })
    
}

export const getProductTotal = () =>{
   
    let total = 0;

    db.collection("Product").onSnapshot((snap) =>{
       total =  snap.docs.length;
    //    alert(snap.docs.length)
    })

    return total;
}

export const fetchProducts = ({query}) => {
    if(query){
        return db.collection("Product")
        .where('title', '>=', query)
        .where('title', '<=', query+ '\uf8ff')
        .limit(5)
    }
    // return db.collection("Product")
}
