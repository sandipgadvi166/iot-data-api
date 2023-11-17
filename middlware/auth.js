const auth = (req,res,next) => {
  if(!req.headers.authorization){
    res.status(400).send('Not Allowed');
  }
  next();
}

module.exports = {auth}