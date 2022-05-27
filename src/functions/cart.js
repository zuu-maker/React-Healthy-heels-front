import { db } from "../firebase";

const addCart = (cart, email, total) => {
   return db.collection("Cart").add({
            orderedBy: email,
            cartTotal:total,
            cart
        })
}

export {addCart}

 

