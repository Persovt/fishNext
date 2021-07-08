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
      orderName: item.name,
      status: {
        name: item.state.name,
        color: `#${item.state.color.toString(16)}`,
      },
      products: item.positions.rows.map((productItem: any) => {
        return {
          id: productItem.id,
          quantity: productItem.quantity,
          price: productItem.price,
          assortment: {
            id: productItem.assortment.id,
            name: productItem.assortment.name,
            description: productItem.assortment.description,
            price: productItem.assortment.buyPrice.value / 100,
            rate:
              productItem.assortment.attributes?.find(
                (item: any) => item.name === "rate"
              )?.value || 5,
          },
        };
      }),
    };
  });
  res.status(200).json({ success: true, data: data });
};
