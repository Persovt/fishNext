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
  data: {};
};

interface Request extends NextApiRequest {
  body: {
    phone: string;
  };
}

export default async (req: Request, res: NextApiResponse<Data>) => {
  const { phone } = req.body;
  const uuid = uuidv4();
  const kitty = new sendCodeSchema({ id: uuid, phone });
  kitty.save().then(() => console.log("meow"));

  //   const response = await ms.GET("entity/counterparty", requestBody);
  //   console.log(response);
  //   const data = response.rows.map((item: any) => {
  //     return {
  //       id: item.id,
  //       name: item.name,
  //       //   href:
  //     };
  //   });
  res.status(200).json({ succes: true, data: {} });
};
