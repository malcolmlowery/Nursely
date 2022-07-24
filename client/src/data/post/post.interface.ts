export interface CommentI {
   uid: string
   responseId: string
   comment: string
   displayName: string
   jobTitle: string
   photoURL: string
}

export interface PostI {
   postId?: string
   likesIdRef?: string
   commentIdRef?: string
   description: string
   numberOfComments: number
   numberOfLikes: number
   publisher: {
      uid: string
      displayName: string
      jobTitle: string
      photoURL: string
   }
}

export interface PostStateI {
   loading: 'idle' | 'pending' | 'succeeded' | 'failed'
   post: PostI | object
   comments: CommentI[]
   error: string | object | null
}