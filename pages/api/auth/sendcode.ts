//https://online.moysklad.ru/api/remap/1.2/download/78009d58-bf0e-49b1-a41a-b4d86c8c6e6a

import axios from "axios";
import Moysklad, { Instance } from "moysklad";
import type { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";
import sendCodeSchema from "../../../models/sendCode.models";

import nodemailer from "nodemailer";
const { Schema } = mongoose;
const uri =
  "mongodb+srv://Persovt:mi260376@cluster0.dcebf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

type Data = {
  success: boolean;
  data: {};
};

interface Request extends NextApiRequest {
  body: {
    type: string;
    phone: string;
    email: string;
  };
}

export default async (req: Request, res: NextApiResponse<Data>) => {
  const { phone, email, type } = req.body;
console.log(req.body)
  const uuid = uuidv4();
  const code = Math.trunc(Math.random() * 10000);
  const date = new Date();

  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "feofishshop@gmail.com",
      pass: "Mi260376",
    },
  });

  if (type === "email") {
    const sendCode = new sendCodeSchema({ id: uuid, email, code, date, type });

    let result = await transporter.sendMail({
      from: '"FeoFish" <feofish@example.com>',
      to: email,
      subject: "Код авторизации: " + code,
      text: "Код авторизации:" + code,
      html: `<h1>Код авторизации: ${code} </h1>`,
    });

    await sendCode.save();
    res
      .status(200)
      .json({ success: result.accepted.includes(email).length, data: {} });
  } else if (type === "phone") {
    const sendCode = new sendCodeSchema({ id: uuid, phone, code, date, type });
    const data = await axios(
      `http://localhost:3000/api/smsaero?randomCode=${code}&inputPhone=${phone}`
    ).then(({ data }) => data.data);

    await sendCode.save();
    res.status(200).json({ success: data.success, data: data.data });
  }
};
