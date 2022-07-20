export interface PostDetailsI {
   postID: string
   publisher: {
      uid: string
      profileImageURL: string
      username: string
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