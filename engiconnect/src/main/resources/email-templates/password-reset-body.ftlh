<!DOCTYPE html>
<html>
<body>
    <p>Dear ${name},</p>
    
    <p>To reset your password, you must click the link below:</p>
    <a href="${baseUrl}/api/users/change-password?token=${token}">Change password</a>
    
    <p>Thanks,<br>EngiConnect Team</p>
</body>
</html>