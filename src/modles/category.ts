export interface ICategory {
  _id: string;
  nameCategory: string;
  description: string;
  icon: string;
}

export interface IUpdateCategory {
  _id?: string;
  nameCategory?: string;
  description?: string;
  icon?: string;
}
