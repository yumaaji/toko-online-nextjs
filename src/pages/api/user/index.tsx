import { retriveData, updateData, deleteData } from "@/lib/firebase/service";
import { NextApiRequest, NextApiResponse } from "next";

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
    const {id, data} = req.body
    await updateData('users', id, data, (result: boolean) => {
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
  }else if(req.method === "DELETE"){
    const {id} = req.body
    await deleteData('users', id, (result: boolean) => {
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
  }
}