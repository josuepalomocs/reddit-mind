import { NextApiRequest, NextApiResponse } from "next";
import { redditAppConfigVariables } from "@/config";
import axios from "axios";

const {
  redditAppId,
  redditAppSecret,
  redditUsername,
  redditPassword,
  redditAppBasicAuth,
} = redditAppConfigVariables;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    console.log("here");
    const params = new URLSearchParams();
    params.append("grant_type", "password");
    params.append("username", redditUsername);
    params.append("password", redditPassword);

    try {
      const response = await axios.post<any>(
        "https://www.reddit.com/api/v1/access_token",
        {
          method: "POST",
          headers: {
            Authorization: `Basic ${redditAppBasicAuth}`,
          },
          body: params,
        }
      );
      res.status(200).json(response.data);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  }
}
