import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { redditAppConfigVariables } from "@/config";

const { redditAppAccessToken } = redditAppConfigVariables;

const redditHttpClient = axios.create({
  baseURL: "https://oauth.reddit.com/",
  timeout: 10000,
  headers: { Authorization: `Bearer ${redditAppAccessToken}` },
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    console.log("here");
    const { subredditId, listingId } = req.query;
    try {
      const redditHttpResponse = await redditHttpClient.get<any>(
        `r/${subredditId}/comments/${listingId}`
      );
      res.status(200).json(redditHttpResponse.data);
    } catch (error) {
      res.status(500).json(error);
    }
  }
}
