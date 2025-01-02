import { retriveData, updateData, deleteData } from "@/lib/firebase/service";
import { NextApiRequest, NextApiResponse } from "next";
import jwt from 'jsonwebtoken';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const user = await retriveData('users')
  if(req.method === "GET"){
    res.status(200).json({    
      status: true,
      statusCode: 200,
      message: "Success",
      data: user
    })
  }else if(req.method === "PUT"){
    const {user}:any = req.query
    const {data} = req.body
    const token:string = req.headers.authorization?.split(' ')[1]!
    // console.log(token)
    // return
    jwt.verify(token, process.env.NEXTAUTH_SECRET || '', 
      async (err:any, decoded:any) => {
        if(decoded && decoded.role === 'admin'){
          await updateData('users', user[1], data, (result: boolean) => {
            if(result){
              res.status(200).json({
                status: true,
                statusCode: 200,
                message: "Success",
              })
            }else{
              res.status(400).json({
                status: false,
                statusCode: 400,
                message: "Failed",
              })
            }
          })
        }else{
          res.status(401).json({
            status: false,
            statusCode: 401,
            message: "Forbidden",
          })
        }
      }
    )
  }else if(req.method === "DELETE"){
    const {user}:any = req.query
    const token:string = req.headers.authorization?.split(' ')[1]!
    // console.log(token)
    // return
    jwt.verify(token, process.env.NEXTAUTH_SECRET || '', 
      async (err:any, decoded:any) => {
        if(decoded && decoded.role === 'admin'){
          await deleteData('users', user[1], (result: boolean) => {
            if(result){
              res.status(200).json({
                status: true,
                statusCode: 200,
                message: "Success",
              })
            }else{
              res.status(400).json({
                status: false,
                statusCode: 400,
                message: "Failed",
              })
            }
          })
        }else{
          res.status(403).json({
            status: false,
            statusCode: 400,
            message: "Forbidden",
          })
        }
      }
    )
    res.status(200).json({
      status: true,
    })

  }
}