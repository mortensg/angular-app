export type LoginResponse = {
  id: number
  username: string
  email: string
  firstName: string
  lastName: string
  gender: string
  image: string
  token: string
}


export type Error = {
  status: number
}

export class LoginDetails {
  constructor(
    public username: string,
    public password: string
  ) {}
}
