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
  const response = await ms.GET("entity/counterparty", {
    filter: {
      phone,
      email,
    },
  });
  console.log(response.meta.size);
  let authData: any = {};

  // const checkCode = 1;
  const checkCode = await sendCodeSchema.findOneAndDelete({
    phone,
    email,
    code,
    visitorId,
  });
  if (checkCode) {
    const date = new Date();

    if (response.meta.size) authData = response.rows[0];
    else {
      authData = await ms.POST(
        "entity/counterparty",
        {
          name: "Новый пользователь",
          phone,
          email,
        },
        { expand: "meta", limit: 100 }
      );
    }
    const userAuth = new authModelSchema({
      phone,
      email,
      visitorId,
      date,
    });
    await userAuth.save();
  }

  const refreshToken: string = uuidv4();

  const refreshTokenShema = new RefreshModel({
    userId: authData.id,
    refreshToken: refreshToken,
    fingerprint: visitorId,
    expiresIn: new Date().getTime() + 1000 * 60 * 60 * 24 * 30,
    createdAt: new Date().getTime(),
  });
  // console.log(refreshTokenShema)
  await refreshTokenShema.save();

  const accesToken: string = jwt.sign(
    {
      id: authData.id,
      name: authData.name,
      phone: authData.phone,
      email: authData.email,
      actualAddress: authData.actualAddress,
    },
    "shhhh",
    {
      expiresIn: "30m",
    }
  ); //30m
  await cookies.set("accesToken", accesToken, {
    maxAge: 30 * 60 * 1000,
  });
  await cookies.set("refreshToken", refreshToken, {
    maxAge: 60 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  });

  res.status(200).json({
    succes: Boolean(checkCode),
    data: {
      id: authData.id,
      name: authData.name,
      phone: authData.phone,
      email: authData.email,
      actualAddress: authData.actualAddress,
    },
  });
};
