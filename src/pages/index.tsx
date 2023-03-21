import Head from "next/head";
import { useEffect, useState } from "react";
import axios from "axios";
import { RedditComment, RedditListing } from "../../types";
import fromUnixTime from "date-fns/fromUnixTime";
import differenceInMinutes from "date-fns/differenceInMinutes";
import differenceInHours from "date-fns/differenceInHours";
import { ArrowDownIcon, ArrowUpIcon } from "@heroicons/react/20/solid";
import {
  ArrowUturnLeftIcon,
  EllipsisHorizontalIcon,
} from "@heroicons/react/24/outline";
import { allowedDisplayValues } from "next/dist/compiled/@next/font/dist/constants";

export default function Home() {
  const [listing, setListing] = useState<RedditListing | null>(null);
  const [comments, setComments] = useState<RedditComment[]>([]);

  useEffect(() => {
    getListingComments("chatgpt", "11woqzm").catch((error) =>
      console.log(error)
    );
  }, []);

  async function getListingComments(subredditId: string, listingId: string) {
    try {
      const redditHttpResponse = await axios.get<any>(
        `https://0728-2603-8080-7201-eb00-6ca0-64d6-1020-1004.ngrok.io/api/reddit/subreddits/${subredditId}/listings/${listingId}/comments`
      );
      const listingData = redditHttpResponse.data[0].data.children[0].data;
      const listing: RedditListing = {
        id: listingData.id,
        author: listingData.author,
        creationTimestamp: listingData.created_utc,
        title: listingData.title,
        selfText: listingData.selftext,
      };
      const comments = [];
      const redditHttpResponseComments =
        redditHttpResponse.data[1].data.children;
      for (let index = 0; index < redditHttpResponseComments.length; index++) {
        const commentData = redditHttpResponseComments[index].data;
        const comment: RedditComment = {
          id: commentData.id,
          author: commentData.author,
          creationTimestamp: commentData.created_utc,
          body: commentData.body,
          ups: commentData.ups,
          downs: commentData.downs,
        };
        comments.push(comment);
      }
      setListing(listing);
      setComments(comments);
    } catch (error) {
      console.log(error);
    }
  }

  function renderComments() {
    if (!comments.length) return false;
    return (
      <ul className="flex flex-col space-y-2">
        {comments.map((comment) => {
          return (
            <li
              key={comment.id}
              className="bg-neutral-900 whitespace-normal break-words p-4"
            >
              <div className="flex space-x-2 text-sm mb-3">
                <span className="">{comment.author}</span>
                <span className="text-neutral-400">•</span>
                <span className="text-neutral-400">
                  {renderCommentAge(comment.creationTimestamp)}
                </span>
              </div>
              <div className="mb-3">{comment.body}</div>
              <div className="flex space-x-4 text-neutral-400">
                <div className="flex text-sm">
                  <ArrowUpIcon className="w-[20px] h-[20px] mr-1" />
                  {comment.ups}
                </div>
                <div className="flex text-sm">
                  <ArrowDownIcon className="w-[20px] h-[20px] mr-1" />
                  {comment.downs}
                </div>
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

  function renderHeader() {
    return (
      <div>
        <header
          className="h-16
        fixed top-0 flex justify-between items-center space-x-8 w-full bg-black p-4 border-b border-neutral-900"
        >
          <button className="p-2">
            <ArrowUturnLeftIcon className="w-[20px] h-[20px]" />
          </button>
          <span className="text-sm overflow-x-auto">r/chatgpt</span>
          <button className="p-2">
            <EllipsisHorizontalIcon className="w-[20px] h-[20px]" />
          </button>
        </header>
        <div className="h-16" />
      </div>
    );
  }

  function renderListing() {
    if (!listing) return <></>;
    return (
      <div className="p-4 bg-black mb-2">
        <div className="flex space-x-2 text-sm mb-3">
          <span className="">{listing.author}</span>
          <span className="text-neutral-400">•</span>
          <span className="text-neutral-400">
            {renderCommentAge(listing.creationTimestamp)}
          </span>
        </div>
        <h4 className="text-lg mb-4">{listing.title}</h4>
        <div className="grid grid-cols-3 gap-4">
          <button className="bg-teal-600 p-2 rounded text-sm">Summarize</button>
          <button className="bg-teal-600 p-2 rounded text-sm">Keywords</button>
          <button className="bg-teal-600 p-2 rounded text-sm">Emotions</button>
        </div>
      </div>
    );
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
          {renderHeader()}
          {renderListing()}
          {renderComments()}
        </main>
      </div>
    </>
  );
}
