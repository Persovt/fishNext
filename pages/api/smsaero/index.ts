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

const API_KEY = "DFzMxO61tvbPDrZTsRPeVXIrBJbq";
const EMAIL = "mza200339@gmail.com";

interface ServerResponse {
  data: any;
}
export default async (req: Request, res: NextApiResponse<Data>) => {
  const { randomCode, inputPhone } = req.query;

  const data = await axios(
    `https://${EMAIL}:${API_KEY}@gate.smsaero.ru/v2/sms/send?numbers[]=8${inputPhone}&text=${encodeURIComponent(
      "Код для авторизации: " + randomCode
    )}&sign=SMS+Aero`
  );

  res.status(200).json({ data: data.data });
};
