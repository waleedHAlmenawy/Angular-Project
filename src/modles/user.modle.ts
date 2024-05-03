export interface IUser {
  _id: string;
  imagePath: string;
  name: string;
  email: string;
  password: string;
  phone: string;
  isAdmin: boolean;
  isDeleted: boolean;
  wishList?: string[];
}

export interface IUpdateUser {
  _id?: string;
  imagePath?: string;
  name?: string;
  email?: string;
  password?: string;
  phone?: string;
  isAdmin?: boolean;
  isDeleted?: boolean;
  wishList?: string[];
}
