export enum UserRoles {
  USER = 'USER',
  ADMIN = 'ADMIN'
}

export type UserState = {
  _id: string | null,
  email: string | null,
  username: string | null,
  createdAt: string | null,
  updatedAt: string | null,
  role: UserRoles | null
}
