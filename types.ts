export interface RedditComment {
  id: string;
  author: string;
  creationTimestamp: number;
  body: string;
  ups: number;
  downs: number;
}

export interface RedditListing {
  id: string;
  author: string;
  creationTimestamp: number;
  title: string;
  selfText: string;
}
