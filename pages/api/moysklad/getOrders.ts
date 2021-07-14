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
export default async (req: Request, res: NextApiResponse<Data>) => {
  const { authData } = req.body;
  console.log(authData, "cartProducts");

  const response = await ms.GET("entity/customerorder", {
    filter: {
      agent:
        "https://online.moysklad.ru/api/remap/1.2/entity/counterparty/" +
        authData.id,
    },
    limit: 100,
    expand: "positions, state, positions.assortment",
  });
  console.log(response, "response");
  let data = response.rows.map((item: any) => {
    return {
      id: item.id,
      orderName: item.name,
      status: {
        name: item.state.name,
        color: `#${item.state.color.toString(16)}`,
      },
      orderPrice: item.sum / 100,
      products: item.positions.rows.map((productItem: any) => {
        return {
          id: productItem.id,

          quantity: productItem.quantity,
          price: productItem.price / 100,
          assortment: {
            id: productItem.assortment.id,
            name: productItem.assortment.name,

            rate: 5,
          },
        };
      }),
    };
  });
  res.status(200).json({ success: true, data: data });
};
