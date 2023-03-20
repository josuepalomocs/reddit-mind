import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>React Mind</title>
        <meta
          name="description"
          content="RedditMind is a web application that fetches tech-related posts and comments from multiple subreddits and allows users to manipulate the information in different ways using OpenAI APIs. With RedditMind, you can summarize, change tone, provide bullet points, retrieve keywords, and save the manipulated information for later use."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </>
  );
}
