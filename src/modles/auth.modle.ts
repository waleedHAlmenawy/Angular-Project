export interface IRegister {
  name: string;
  email: string;
  password: string;
  confirmPassword?: string;
  phone: number;
  imagePath: File;
}

export interface ILogin {
  email: string,
  password: string
}

export interface IAuth {
  token: string,
  message: string,
  role: string
}
