export interface LoginRequest {
  email: string
  password: string
}

export interface SignUpRequest {
  username: string
  firstName: string
  lastName: string
  email: string
  password: string
}

export interface AuthResponse {
  token: string
  user: {
    id: string
    username: string
    firstName: string
    lastName: string
    email: string
  }
}

export interface User {
  id?: string
  username?: string
  firstName?: string
  lastName?: string
  email: string
  name?: string
  token?: string
}
