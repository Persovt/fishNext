//https://online.moysklad.ru/api/remap/1.2/download/78009d58-bf0e-49b1-a41a-b4d86c8c6e6a

import axios from "axios";
import Moysklad, { Instance } from "moysklad";
import type { NextApiRequest, NextApiResponse } from "next";

const ms: any = Moysklad({ token: "1fc2be4c99979988e91573bd0f27a1cb1dacc958" });

type Data = {
  succes: boolean;
  data: {
    variants: [
      {
        id: number;
        name: string;
        description: string;
        images: Array<string>;

        salePrices: number;
      }
    ];
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

  const response = await ms.GET("entity/variant", requestBody);

  const findVariant = response.rows.filter((item: any) => {
    return (
      item.product.meta.href ===
      "https://online.moysklad.ru/api/remap/1.2/entity/product/" + idProduct
    );
  });
  const imagePromise = findVariant.map(async (item: any) =>
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

  const variants = findVariant.map((item: any, index: number) => {
    return {
      id: item.id,
      name: item.name,
      description: item.description,
      salePrices:
        item.salePrices.reduce(
          (acc: number, next: { value: number }) => acc + next.value,
          0
        ) / item.salePrices.length,
      images: imagesLink[index],
    };
  });

  const data = {
    variants: variants,
  };

  res.status(200).json({ succes: true, data: data });
};
