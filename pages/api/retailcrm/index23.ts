import axios, { Method } from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
var FormData = require("form-data");
type Data = {
  data: any;
};

interface Request extends NextApiRequest {
  body: {
    methodFetch: Method;
    method: string;
    query: string;
    body: Object;
  };
}

const API_KEY = "wEdfH8sQ8VyugnjbuGPfDhKyhfjBINz8";

const createFetchUrl = (method: string, query: string): string => {
  return (
    `https://fancrm.retailcrm.ru/api/v5/` +
    method +
    query +
    "?apiKey=" +
    API_KEY
  );
};
interface ServerResponse {
  data: any;
}
export default async (req: any, res: NextApiResponse<Data>) => {
  console.log(req.body);
  const { methodFetch = "GET", method, query = "", body = {} } = req.body;

  const fetchURL = createFetchUrl(method, query);

  
  

  const params = new URLSearchParams();
  for (let key in body) {
    params.append(key, JSON.stringify(body[key]));
  }
console.log(params, 'PARAMS')
  const data = await axios({
    method: methodFetch,
    url: fetchURL,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data: params,
  })
    

  
  res.status(200).json({ data: "data" });
};
