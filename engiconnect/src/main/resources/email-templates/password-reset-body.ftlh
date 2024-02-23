<!DOCTYPE html>
<html>
<body>
    <p>Dear ${name},</p>
    
    <p>To reset your password, you must click the link below:</p>
    <a href="${baseUrl}/api/users/reset-password?token=${token}">Reset password</a>
    
    <p>Thanks,<br>EngiConnect Team</p>
</body>
</html>