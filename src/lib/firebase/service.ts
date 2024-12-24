import {addDoc, collection, doc, getDoc, getDocs, getFirestore, query, where} from 'firebase/firestore'
import firebaseApp from './init'
import bcrypt from 'bcrypt'

const firestore = getFirestore(firebaseApp)

export async function retriveData(collectionName: string){
  const snapshot = await getDocs(collection(firestore, collectionName))
  const data = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data()
  }))
  
  return data
}

export async function retriveDataById(collectionName: string, id: string){
  const snapshot = await getDoc(doc(firestore, collectionName, id))
  const data = snapshot.data()
  return data
}

export async function retriveDataByField(collectionName: string, field:string, value:string){
  const q = query(collection(firestore, collectionName), where(field, '==', value))
  const snapshot = await getDocs(q)
  const data = snapshot.docs.map((doc) => 
    ({id: doc.id,...doc.data()})
  )
  return data
}

export async function addData(collectionName: string, data:any, callback: Function){
  await addDoc(collection(firestore, collectionName), data)
  .then(() => {
    callback(true)
  }).catch((error) => {
    callback(false)
  })
}