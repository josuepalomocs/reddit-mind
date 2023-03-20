if (!process.env.REDDIT_APP_ID)
  throw new Error(formatErrorMessage("REDDIT_APP_ID"));

if (!process.env.REDDIT_APP_SECRET)
  throw new Error(formatErrorMessage("REDDIT_APP_SECRET"));

if (!process.env.REDDIT_APP_ACCESS_TOKEN)
  throw new Error(formatErrorMessage("REDDIT_APP_ACCESS_TOKEN"));

if (!process.env.REDDIT_USERNAME)
  throw new Error(formatErrorMessage("REDDIT_USERNAME"));

if (!process.env.REDDIT_PASSWORD)
  throw new Error(formatErrorMessage("REDDIT_PASSWORD"));

function formatErrorMessage(missingEnvironmentVariable: string) {
  return `Missing required environment variable: ${missingEnvironmentVariable}`;
}

const redditAppId = process.env.REDDIT_APP_ID;
const redditAppSecret = process.env.REDDIT_APP_SECRET;
const redditAppAccessToken = process.env.REDDIT_APP_ACCESS_TOKEN;
const redditUsername = process.env.REDDIT_USERNAME;
const redditPassword = process.env.REDDIT_PASSWORD;

export const redditAppConfigVariables = {
  redditAppId,
  redditAppSecret,
  redditAppAccessToken,
  redditUsername,
  redditPassword,
};
