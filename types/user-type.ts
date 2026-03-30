export interface UserType {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  accessToken?: string | null;
  refreshToken?: string | null;
}
