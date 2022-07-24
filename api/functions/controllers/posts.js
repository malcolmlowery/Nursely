const { firestore } = require('../firebase.modules');

exports.getPosts = async (req, res) => {
   const uid = res.locals.uid;

   const userLikeIds = await firestore()
      .collection('users')
      .doc(uid)
      .get()
      .then(doc => {
         let likes = [];
         doc.data().userPostLikes.forEach(postId => likes.push(postId))
         return likes
      })

   const postsCollection = await firestore()
      .collection('posts')
      .get()
      .then(docs => {
         let posts = [];
         docs.forEach(post => posts.push(post.data()))
         return posts
      }) 
   
   const posts = postsCollection.map(post => {
      const postLiked = userLikeIds.find(id => id === post.postId)
      if(postLiked) {
         return({ ...post, postLiked: true })
      }
      return({ ...post,  postLiked: false })
   })

   res.status(200).send(posts)
}