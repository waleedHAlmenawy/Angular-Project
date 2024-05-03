import { IUser } from "./user.modle";

export interface Review {
  _id: string;
  title: string;
  comment: string;
  dateOfReview: Date;
  user: IUser;
  product: string;
}
export interface AddReivew {
  title: string;
  comment: string;
}
export interface UpdateReview {
  _id?: string;
  title?: string;
  comment?: string;
}