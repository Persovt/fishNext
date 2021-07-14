import axios from "axios";
import Moysklad, { Instance } from "moysklad";
import type { NextApiRequest, NextApiResponse } from "next";

const ms: any = Moysklad({ token: process.env.MOYSKLAD_API_KEY });

type Data = {
  data: any;
  success: boolean;
};

interface Request extends NextApiRequest {
  body: {
    cartProducts: Array<Object>;
    authData: any;
  };
}

interface ServerResponse {
  data: any;
}
/*
todo: create Order delete MAPPPPPP
 */
export default async (req: Request, res: NextApiResponse<Data>) => {
  const { cartProducts, authData } = req.body;
  console.log(cartProducts, authData, "cartProducts");

  const response = await ms.POST("entity/customerorder", {
    agent: {
      meta: {
        href:
          "https://online.moysklad.ru/api/remap/1.2/entity/counterparty/" +
          authData.id,
        type: "counterparty",
      },
    },
    organization: {
      meta: {
        href: "https://online.moysklad.ru/api/remap/1.2/entity/organization/9e412382-daaf-11eb-0a80-06ae00283d5c",
        type: "organization",
      },
    },
    positions: cartProducts.map((item: any) => {
      return {
        type: "customerorderposition",
        quantity: item.quantity,
        price: item.price * 100,
        assortment: {
          meta: {
            href:
              "https://online.moysklad.ru/api/remap/1.2/entity/variant/" +
              item.id,
            type: "variant",
          },
        },
      };
    }),
  });

  res.status(200).json({ success: true, data: response });
};
