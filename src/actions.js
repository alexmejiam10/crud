import { firebaseApp } from './firebase'
import firebase from 'firebase'
require('firebase/firestore')

const db = firebase.firestore(firebaseApp)

export const getCollection = async(collection) => {
    const result = { statusResponse : false, data: null, error: null }
    try {
        const data = await db.collection(collection).get()
        const arrayData = data.docs.map(doc => ({ id: doc.id, ...doc.data()}))
        result.statusResponse = true
        result.data = arrayData
    } catch (error) {
        result.error = error
    }
    return result
}
//funsion generica que nos permite traer la informaion de las tareas


export const addDocument = async(collection, data) => {
    const result = { statusResponse : false, data: null, error: null }// asumios que no hay datos
    try {
      const response = await db.collection(collection).add(data)// adicionele a la coleccion la nueva data
      result.data = { id: response.id }
      result.statusResponse = true   
    } catch (error) {
        result.error = error
    }
    return result
}

export const getDocument = async(collection, id) => { //para obtener un documento de la db
    const result = { statusResponse : false, data: null, error: null }// asumios que no hay datos
    try {
     const response = await db.collection(collection).doc(id).get()
     result.data = {id: response.id, ...response.data() }
     result.statusResponse =true   
    } catch (error) {
    result.error = error
    }
    return result
}

export const updateDocument = async(collection, id, data) => { //para poder actualizar documentos en el db
    const result = { statusResponse : false, error: null }// asumios que no hay datos
    try {
     await db.collection(collection).doc(id).update(data)
     result.statusResponse =true   
    } catch (error) {
    result.error = error
    }
    return result
}
export const deleteDocument = async(collection, id) => { //para poder actualizar documentos en el db
    const result = { statusResponse : false, error: null }// asumios que no hay datos
    try {
     await db.collection(collection).doc(id).delete()
     result.statusResponse = true   
    } catch (error) {
    result.error = error
    }
    return result
}