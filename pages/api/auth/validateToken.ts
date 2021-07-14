//https://online.moysklad.ru/api/remap/1.2/download/78009d58-bf0e-49b1-a41a-b4d86c8c6e6a

import axios from "axios";
import Moysklad, { Instance } from "moysklad";
import type { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose";
import sendCodeSchema from "../../../models/sendCode.models";
import authModelSchema from "../../../models/auth.models";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import RefreshModel from "../../../models/refreshToken.models";
import Cookies from "cookies";
const { Schema } = mongoose;
const uri =
  "mongodb+srv://Persovt:mi260376@cluster0.dcebf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const ms: any = Moysklad({ token: "1fc2be4c99979988e91573bd0f27a1cb1dacc958" });

interface Request extends NextApiRequest {
  body: {
    phone: string;
    email: string;
    code: number;
    visitorId: string;
  };
}

export default async (req: Request, res: NextApiResponse<any>) => {
  const { phone, code, email, visitorId } = req.body;
  const cookies = new Cookies(req, res);
  const JWT_SECRET_KEY: string = process.env.JWT_SECRET_KEY || "jss";
  const accesToken = cookies.get("accesToken");
  let authData = null;
  if (accesToken) {
    authData = await jwt.verify(accesToken, JWT_SECRET_KEY);
  }
  res.status(200).json({
    succes: Boolean(authData),
    data: authData,
  });
};
