export type User = null | {
  id: number;
  username: string;
  bookPickerShow: boolean;
  avatar: string;
  isAdmin?: boolean;
  isPasswordRequired?: boolean;
  verifyUrl?: string;
};
