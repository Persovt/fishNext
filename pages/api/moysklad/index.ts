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
}

interface ServerResponse {
  data: any;
}
export default async (req: Request, res: NextApiResponse<Data>) => {
  const { methodType, method, requestBody } = req.body;
  console.log(typeof requestBody)
  const data = await ms[methodType](method, requestBody);

  res.status(200).json({ data: data });
};
