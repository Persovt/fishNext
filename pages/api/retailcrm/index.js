import axios, { Method } from "axios";
import RetailCRM from "node-retailcrm-api";
const API_KEY = "wEdfH8sQ8VyugnjbuGPfDhKyhfjBINz8";

const Client = new RetailCRM.Client({
  siteCode: "",
  apiKey: API_KEY,
  url: "https://fancrm.retailcrm.ru",
  version: RetailCRM.VERSIONS.V5,
});

// const createFetchUrl = (method, query) => {
//   return (
//     `https://fancrm.retailcrm.ru/api/v5/` +
//     method +
//     query +
//     "?apiKey=" +
//     API_KEY
//   );
// };

export default async (req, res) => {

  const { methodType, method, argumentsReq = [] } = req.body;
console.log(req.body)
  //   const fetchURL = createFetchUrl(method, query);

  //   const params = new URLSearchParams();
  //   for (let key in body) {
  //     params.append(key, JSON.stringify(body[key]));
  //   }
  // console.log(params, 'PARAMS')
  //   const data = await axios({
  //     method: methodFetch,
  //     url: fetchURL,
  //     headers: {
  //       "Content-Type": "application/x-www-form-urlencoded",
  //     },
  //     data: params,
  //   })
  
  const responseRetail = await Client[methodType][method](...argumentsReq)
  
  
//   Client.orders
//     .create(body)
//     .then((response) => {
//       console.log(response.body, "response");
    

    
//     })
   

  res.status(200).json({ data: responseRetail.body });
};
