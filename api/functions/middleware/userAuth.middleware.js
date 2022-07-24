const { admin } = require('../firebase.modules');

exports.verifyUser = async (req, res, next) => {
   const authorization = req.headers.authorization;
   
   if(authorization !== undefined) {
      const token = authorization.split(' ')[1];
      await admin
         .auth()
         .verifyIdToken(token, true)
         .then(decodedToken => {
            const uid = decodedToken.uid;
            if(uid) {
               res.locals.uid = uid
               next()
            } else {
               res.send({ message: 'You are not authorized...' })
            }
         })
         .catch(error => console.log(error))
   } else {
      res.send({ message: 'You are not authorized...' })
   }
}