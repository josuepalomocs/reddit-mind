export interface RedditComment {
  id: string;
  username: string;
  creationTimestamp: number;
  body: string;
  ups: number;
  downs: number;
}
