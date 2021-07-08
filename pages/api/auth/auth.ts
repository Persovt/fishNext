//https://online.moysklad.ru/api/remap/1.2/download/78009d58-bf0e-49b1-a41a-b4d86c8c6e6a

import axios from "axios";
import Moysklad, { Instance } from "moysklad";
import type { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose";
import sendCodeSchema from "../../../models/sendCode.models";
const { Schema } = mongoose;
const uri =
  "mongodb+srv://Persovt:mi260376@cluster0.dcebf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const ms: any = Moysklad({ token: "1fc2be4c99979988e91573bd0f27a1cb1dacc958" });

type Data = {
  succes: boolean;
  data: Object;
};

interface Request extends NextApiRequest {
  body: {
    phone: string;
    email: string;
    code: number;
  };
}

export default async (req: Request, res: NextApiResponse<Data>) => {
  const { phone, code, email } = req.body;
  const response = await ms.GET("entity/counterparty", {
    filter: {
      phone,
      email,
    },
  });
  console.log(response.meta.size);
  let authData: any = {};

  const checkCode = 1;
  // const checkCode = await sendCodeSchema.findOneAndDelete({
  //   phone,
  //   email,
  //   code,
  // });
  if (checkCode) {
    if (response.meta.size) authData = response.rows[0];
    else {
      authData = await ms.POST("entity/counterparty", {
        name: "Новый пользователь",
        phone,
        email,
      }, { expand: "meta", limit: 100 });
    }
  }
  console.log(authData)
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
