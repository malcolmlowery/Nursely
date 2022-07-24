export interface PostDetailsI {
   postId: string
   commentIdRef: string
   likesIdRef: string
   publisher: {
      uid: string
      photoURL: string
      displayName: string
      middleIntial: string | null
      jobTitle: string
   }
   description: string
   numberOfComments: number
   numberOfLikes: number
   postLiked: boolean
};

export interface PostsStateI {
   loading: 'idle' | 'pending' | 'succeeded' | 'failed'
   posts: PostDetailsI[]
   error: string | object | null
};