//https://online.moysklad.ru/api/remap/1.2/download/78009d58-bf0e-49b1-a41a-b4d86c8c6e6a

import axios from "axios";
import Moysklad, { Instance } from "moysklad";
import type { NextApiRequest, NextApiResponse } from "next";
var urlapi = require("url");
const ms: any = Moysklad({ token: process.env.MOYSKLAD_API_KEY });

type Products = {
  name: String;
  images: Array<string>;
  rate: number;
  buyPrice: number;
  id: number;
};

type Data = {
  succes: boolean;
  data: {
    products: Array<Products>;
    maxPrice: number;
  };
};
type Filter = {
  minPrice: number;
  maxPrice: number;
  categories: Array<string>;
};
interface Request extends NextApiRequest {
  body: {
    requestBody: string;
    filter: Filter;
  };
}
const filterProducts = (item: any, filter: Filter) => {
  const categoriesId: string | null = new URL(
    item.productFolder.meta.uuidHref.replace("#", " ")
  ).searchParams.get("id");

  return (
    (filter.minPrice != undefined
      ? item.buyPrice.value >= filter.minPrice
      : true) &&
    (filter.maxPrice != undefined
      ? item.buyPrice.value <= filter.maxPrice
      : true) &&
    (filter.categories != undefined
      ? !filter.categories.length ||
        filter.categories.includes(categoriesId || "")
      : true)
  );
};

export default async (req: Request, res: NextApiResponse<Data>) => {
  const {
    requestBody = {},
    filter = {
      minPrice: -1,
      maxPrice: Number.MAX_SAFE_INTEGER,
      categories: [],
    },
  } = req.body;
  const { productId } = req.query;
  const response = await ms.GET(
    "entity/product",
    Object.assign({}, requestBody, { expand: "images", limit: 100 })
  );
  console.log(response);
  let maxPrice = 0;
  let products: Array<Products> = [];
  response.rows.forEach((item: any, index: number) => {
    //if (item.buyPrice.value > maxPrice) maxPrice = item.buyPrice.value;
    maxPrice = Math.max(maxPrice, item.buyPrice.value)
    console.log(item, 'item products')
    if (filterProducts(item, filter))
      products.push({
        id: item.id,
        name: item.name,
        buyPrice: item.buyPrice.value,
        rate:
          item.attributes.find((item: any) => item.name === "rate")?.value || 5,
        images: item.images.rows.map((item: any) => {
          return (
            "http://localhost:3000/api/moysklad/getImage?imageUrl=" +
            item.meta.downloadHref
          );
        }),
      });
  });

  const data = {
    products: products,
    maxPrice: maxPrice,
  };

  res.status(200).json({ succes: true, data: data });
};
