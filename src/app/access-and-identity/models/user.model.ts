/**
 * User model interface for authentication.
 */
export interface User {
  id?: number;
  name?: string;
  email: string;
  token?: string;
}
