import axios from "axios";
import Moysklad, { Instance } from "moysklad";
import type { NextApiRequest, NextApiResponse } from "next";

const ms: any = Moysklad({ token: "1fc2be4c99979988e91573bd0f27a1cb1dacc958" });

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

  let data = response.rows.map((item: any) => {
    return {
      id: item.id,
      orderName: item.name,
      status: {
        name: item.state.name,
        color: `#${item.state.color.toString(16)}`,
      },
      orderPrice: item.sum,
      products: item.positions.rows.map((productItem: any) => {
        console.log(productItem.assortment, "productItem.assortment");
        return {
          id: productItem.id,
          quantity: productItem.quantity,
          price: productItem.price,
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
