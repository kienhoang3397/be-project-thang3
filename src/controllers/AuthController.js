const sendEmail = async (req, res, next) => {
    const email = req.body.email;
    const user = await User.findOne({ email: email });
    if (!user) {
        return res.status(404).json({
            status: "ERR",
            message: "User not found",
            data: null,
        });
    }
    const payload = {
        email: user.email,
    };
    const expiresIn = 300;
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: expiresIn,
    });

    const newToken = new UserToken({
        userId: user._id,
        token: token,
    });

    const mailTransporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "thuyy566@gmail.com",
            pass: "aedkcnsxnxctsxbw"
        }
    });
    let mailDetails = {
        from: "thuyy566@gmail.com",
        to: email,
        subject: "Reset Password",
        text: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reset Password Email</title>
    <style>
        body {
            font-family: Arial, sans-serif;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            border: 1px solid #ccc;
            border-radius: 5px;
        }
        h1 {
            color: #333;
        }
        p {
            margin-bottom: 20px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Reset Your Password</h1>
        <p>Hello,</p>
        <p>You recently requested to reset your password for your account. Use the following token to reset your password:</p>
        <p><strong>Reset Password Token:</strong> ${token}</p>
        <p>If you didn't request a password reset, you can safely ignore this email. Your password will not be changed.</p>
        <p>Thank you,</p>
        <p>The Team</p>
    </div>
</body>
</html>
`,
    };
    mailTransporter.sendEmail(mailDetails, function (err, data) {
        if (err) {
            return res.status(500).json({
                status: "ERR",
                message: "Internal Server Error",
                data: null,
            });
        } else {
            newToken.save();
            return res.status(200).json({
                status: "OK",
                message: "Send email successfully",
                data: null,
            });
        }
    });
};