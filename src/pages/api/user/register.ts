import type { NextApiRequest, NextApiResponse } from "next";
import { signUp } from "@/services/auth/services";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if(req.method === "POST"){
    await signUp(req.body, (status: boolean) => {
      if(status){
        res.status(200).json({
          status: true,
          message: "Success",
        })
      }else{
        res.status(400).json({
          status: false,
          message: "Email already exists",
        })
      }
    })
  }else{
    res.status(405).json({
      status: false,
      message: "Method not allowed",
    })
  }
} 