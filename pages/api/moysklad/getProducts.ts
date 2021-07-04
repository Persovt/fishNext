//https://online.moysklad.ru/api/remap/1.2/download/78009d58-bf0e-49b1-a41a-b4d86c8c6e6a

import axios from "axios";
import Moysklad, { Instance } from "moysklad";
import type { NextApiRequest, NextApiResponse } from "next";

const ms: any = Moysklad({ token: "1fc2be4c99979988e91573bd0f27a1cb1dacc958" });

type Data = {
  succes: boolean;
  data: {
    products: [
      {
        name: String;
        images: Array<string>;
        rate: number;
        buyPrice: number;
        id: number;
      }
    ];
    maxPrice: number;
  };
};

interface Request extends NextApiRequest {
  body: {
    requestBody: string;
    filter: {
      minPrice: number;
    };
  };
}

export default async (req: Request, res: NextApiResponse<Data>) => {
  const { requestBody = {}, filter } = req.body;

  const response = await ms.GET("entity/product", requestBody);
  const imagePromise = response.rows.map(async (item: any) =>
    ms.GET(item.images.meta.href)
  );
  const imagesLink = await Promise.all(imagePromise).then((res: any) => {
    return res.map((resItem: any) =>
      resItem.rows.length
        ? resItem.rows.map(
            (item: any) =>
              "http://localhost:3000/api/moysklad/getImage?imageUrl=https://online.moysklad.ru/api/remap/1.2/download/" +
              item.meta.downloadHref
          )
        : []
    );
  });
 
  let maxPrice = 0;
  const products = response.rows.map((item: any, index: number) => {
    if (item.buyPrice.value > maxPrice) maxPrice = item.buyPrice.value;
    return {
      id: item.id,
      name: item.name,
      buyPrice: item.buyPrice.value,
      rate:
        item.attributes.find((item: any) => item.name === "rate")?.value || 5,
      images: imagesLink[index],
    };
  });

  const data = {
    products: products,
    maxPrice: maxPrice,
  };

  res.status(200).json({ succes: true, data: data });
};
