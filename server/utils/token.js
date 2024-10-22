exports.sendToken = (user, statusCode, res) => {
    const jwtToken = user.getJWTToken();

    const options = {
        exipres: new Date(
            Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000 // expire time
        ),
        httpOnly: true,
        // secure: process.env.NODE_ENV === 'production', // Only for HTTPS in production
        sameSite: 'strict',
    };

    res.status(statusCode).cookie("jwtToken", jwtToken, options).json({ success: true, user });
}