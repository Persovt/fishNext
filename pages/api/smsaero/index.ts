import axios, { Method } from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  data: any;
};

interface Request extends NextApiRequest {
  body: {
    randomCode: string;
    inputPhone: string;
  };
}

const API_KEY = process.env.SMSAERO_API_KEY;
const EMAIL = process.env.SMSAERO_API_EMAIL;

interface ServerResponse {
  data: any;
}
export default async (req: Request, res: NextApiResponse<Data>) => {
  const { randomCode, inputPhone } = req.query;

  const data = await axios(
    `https://${EMAIL}:${API_KEY}@gate.smsaero.ru/v2/sms/testsend?numbers[]=8${inputPhone}&text=${encodeURIComponent(
      "Код для авторизации: " + randomCode
    )}&sign=SMS+Aero`
  );

  res.status(200).json({ data: data.data });
};
