export interface UserI {
   firstName: string
   lastName: string
   email: string
   password: string
}

export interface UserStateI {
   loading: 'idle' | 'pending' | 'succeeded' | 'failed'
   user: UserI | null
   error: string | object | null
}