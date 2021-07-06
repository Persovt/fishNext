import axios, { Method } from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  status: boolean;
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
  const balance = await axios(
    `https://${EMAIL}:${API_KEY}@gate.smsaero.ru/v2/balance`
  ).then((res) => res.data.data.balance);

  res.status(200).json({ status: balance > 3 });
};
