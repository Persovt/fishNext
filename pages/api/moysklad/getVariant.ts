//https://online.moysklad.ru/api/remap/1.2/download/78009d58-bf0e-49b1-a41a-b4d86c8c6e6a

import axios from "axios";
import Moysklad, { Instance } from "moysklad";
import type { NextApiRequest, NextApiResponse } from "next";

const ms: any = Moysklad({ token: "1fc2be4c99979988e91573bd0f27a1cb1dacc958" });
interface Comment {
  rate: number;
  title: string;
  content: string;
}
interface Variants {
  id: number;
  name: string;
  description: string;
  price: number;
  images: Array<string>;
  quantity: number;
  productHref: string;
}
type Data = {
  succes: boolean;
  data: {
    comment: Array<Comment>;
    variants: Array<Variants>;
  };
};

interface Request extends NextApiRequest {
  body: {
    requestBody: string;
  };
}

export default async (req: Request, res: NextApiResponse<Data>) => {
  const { requestBody = {} } = req.body;
  const { idProduct } = req.query;

  const response = await ms.GET(
    "entity/variant",
    Object.assign({}, requestBody, { expand: "images", limit: 100 })
  );

  let variants: Array<Variants> = [];

  response.rows.forEach((item: any, index: number) => {
    if (
      item.product.meta.href ===
      "https://online.moysklad.ru/api/remap/1.2/entity/product/" + idProduct
    )
      variants.push({
        id: item.id,
        name: item.name,
        description: item.description,
        quantity: 1,
        productHref: item.product.meta.href,
        price:
          item.salePrices.reduce(
            (acc: number, next: { value: number }) => acc + next.value,
            0
          ) / item.salePrices.length,
        images: item.images.rows.map((item: any) => {
          return (
            "http://localhost:3000/api/moysklad/getImage?imageUrl=" +
            item.meta.downloadHref
          );
        }),
      });
  });

  const data = {
    variants: variants,
    comment: [
      {
        rate: 5,
        title: "test",

        content: "test comment",
      },
      {
        rate: 5,
        title: "test",

        content: "test comment",
      },
    ],
  };

  res.status(200).json({ succes: true, data: data });
};
