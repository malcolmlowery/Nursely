export interface PostCardI {
   profileImageURL: string | undefined
   displayName: string
   jobTitle: string | undefined
   description: string
   numberOfComments: number | undefined
   numberOfLikes: number | undefined
   postLiked: boolean | null
   navigateToUserProfile: () => void
   navigateToPostDetails?: () => void
   navigateToComments?: () => void
   handleLikePost: () => void
   handlePostCommentResponse: (_: string) => void
   handleUpdatePost: (_: string) => void
   handleDeletePost: (_: string) => void
   style?: any
   isPostOwner: boolean,
   editingPost?: boolean,
};