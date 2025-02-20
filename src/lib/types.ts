export type TloginResponse = {
    token: string;
}

export type TloginRequest = {
    username: string;
    password: string;
}

export type TGalleryItem = {
  id: string;
  image: string;
  alt_description: string;
  description: string;
  data: Array<{ id: string; likedBy: string[] }>;
  username?: string;
};