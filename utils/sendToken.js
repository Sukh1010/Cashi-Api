// Create Token and saving in cookie-- baar baar na likhna pre  const token = user.getJWTToken();res.status(201).json({success: true,token,

const sendToken = (User, statusCode, res) => {
  const token = User.getJWTToken();

  // options for cookie
  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    User,
    token,
  });
};

// module.exports = sendToken;
export default sendToken;
