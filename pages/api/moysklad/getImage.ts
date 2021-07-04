//https://online.moysklad.ru/api/remap/1.2/download/78009d58-bf0e-49b1-a41a-b4d86c8c6e6a

import axios from "axios";
import Moysklad, { Instance } from "moysklad";
import type { NextApiRequest, NextApiResponse } from "next";

const ms: any = Moysklad({ token: "1fc2be4c99979988e91573bd0f27a1cb1dacc958" });

type Data = {
  data: any;
};

interface Request extends NextApiRequest {
  body: {
    methodType: any;
    requestBody: Object;
    method: string | string[];
  };
  query: {
    imageUrl: string;
    imageId: string;
  }
}

interface ServerResponse {
  data: any;
}
export default async (req: Request, res: NextApiResponse<Data>) => {
  const { imageId,imageUrl } = req.query;

  const data = await axios.get(
    imageId ? `https://online.moysklad.ru/api/remap/1.2/download/${imageId}` : imageUrl,
    {
      responseType: "arraybuffer",
      headers: {
        Authorization: "1fc2be4c99979988e91573bd0f27a1cb1dacc958",
      },
    }
  );
  res.setHeader("Content-Type", "image/png");
  res.status(200).send(data.data);
};
