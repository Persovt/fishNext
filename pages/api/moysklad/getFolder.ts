//https://online.moysklad.ru/api/remap/1.2/download/78009d58-bf0e-49b1-a41a-b4d86c8c6e6a

import axios from "axios";
import Moysklad, { Instance } from "moysklad";
import type { NextApiRequest, NextApiResponse } from "next";

const ms: any = Moysklad({ token: "1fc2be4c99979988e91573bd0f27a1cb1dacc958" });

type Data = {
  succes: boolean;
  data: {
    id: string;
    name: string;
  };
};

interface Request extends NextApiRequest {
  body: {
    requestBody: Object;
  };
}



export default async (req: Request, res: NextApiResponse<Data>) => {
  const { requestBody = {} } = req.body;

  const response = await ms.GET("entity/productfolder", requestBody);

  const data = response.rows.map((item: any) => {
    return {
      id: item.id,
      name: item.name,
    };
  });
  res.status(200).json({ succes: true, data: data });
};
