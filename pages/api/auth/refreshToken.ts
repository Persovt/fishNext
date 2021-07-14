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
  const oldRefreshToken = cookies.get("refreshToken");
  let authData = null;
  const refreshTokenFind: any = RefreshModel.find({
    refreshToken: oldRefreshToken,
  });
  if (refreshTokenFind) {
    const userResponse = await ms.GET("entity/counterparty", {
      filter: {
        id: refreshTokenFind.userId,
      },
    });

    if (userResponse.meta.size) authData = userResponse.rows[0];

    const newRefreshToken: string = uuidv4();

    const refreshTokenShema = new RefreshModel({
      userId: authData.id,
      refreshToken: newRefreshToken,
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
      JWT_SECRET_KEY,
      {
        expiresIn: "30m",
      }
    ); //30m
    await cookies.set("accesToken", accesToken, {
      maxAge: 30 * 60 * 1000,
    });
    await cookies.set("refreshToken", newRefreshToken, {
      maxAge: 60 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
  }

  res.status(200).json({
    succes: Boolean(authData),
  });
};
