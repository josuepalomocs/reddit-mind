import Head from "next/head";
import { useState } from "react";
import axios from "axios";
import { RedditComment } from "../../types";
import fromUnixTime from "date-fns/fromUnixTime";
import format from "date-fns/format";
import differenceInMinutes from "date-fns/differenceInMinutes";
import differenceInHours from "date-fns/differenceInHours";

export default function Home() {
  const [comments, setComments] = useState<RedditComment[]>([]);

  async function getListingComments(subredditId: string, listingId: string) {
    try {
      const redditHttpResponse = await axios.get<any>(
        `https://0728-2603-8080-7201-eb00-6ca0-64d6-1020-1004.ngrok.io/api/reddit/subreddits/${subredditId}/listings/${listingId}/comments`
      );
      const comments = [];
      const redditHttpResponseComments =
        redditHttpResponse.data[1].data.children;
      console.log(redditHttpResponseComments);
      for (let index = 0; index < redditHttpResponseComments.length; index++) {
        const commentData = redditHttpResponseComments[index].data;
        const comment: RedditComment = {
          id: commentData.id,
          username: commentData.author,
          creationTimestamp: commentData.created_utc,
          body: commentData.body,
          ups: commentData.ups,
          downs: commentData.downs,
        };
        comments.push(comment);
      }
      setComments(comments);
    } catch (error) {
      console.log(error);
    }
  }

  function renderComments() {
    if (!comments.length) return false;
    return (
      <ul className="flex flex-col p-2 space-y-2">
        {comments.map((comment) => {
          return (
            <li
              key={comment.id}
              className="bg-neutral-900 whitespace-normal break-words p-4"
            >
              <div className="flex space-x-4 text-sm">
                <span className="">{comment.username}</span>
                <span>{renderCommentAge(comment.creationTimestamp)}</span>
              </div>
            </li>
          );
        })}
      </ul>
    );
  }

  function renderCommentAge(creationTimestamp: number) {
    const presentDate = new Date();
    const creationDate = fromUnixTime(creationTimestamp);
    const commentAgeInMinutes = differenceInMinutes(presentDate, creationDate);
    if (commentAgeInMinutes >= 60) {
      const commentAgeInHours = differenceInHours(presentDate, creationDate);
      return commentAgeInHours > 1
        ? `${commentAgeInHours}hrs ago`
        : `${commentAgeInHours}hr ago`;
    }
    return commentAgeInMinutes > 1
      ? `${commentAgeInMinutes}mins ago`
      : `${commentAgeInMinutes}min ago`;
  }

  return (
    <>
      <Head>
        <title>Reddit Mind</title>
        <meta
          name="description"
          content="RedditMind is a web application that fetches tech-related posts and comments from multiple subreddits and allows users to manipulate the information in different ways using OpenAI APIs. With RedditMind, you can summarize, change tone, provide bullet points, retrieve keywords, and save the manipulated information for later use."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="min-h-screen max-w-screen bg-black text-white">
        <main className="">
          <div className="p-4">
            <h4 className="mb-4">Reddit API experiment</h4>
            <button
              className="p-2 border rounded"
              onClick={() => {
                getListingComments("machinelearning", "11w03sy");
              }}
            >
              Example: Get listing comments
            </button>
          </div>
          {renderComments()}
        </main>
      </div>
    </>
  );
}
