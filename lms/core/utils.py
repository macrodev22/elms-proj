
def email_password_reset_link_html(reset_link,):
    email_html_message = f"""
    <html>
    <body style="font-family: Arial, sans-serif; background: #f7f7f7; padding: 30px;">
        <div style="max-width: 500px; margin: auto; background: #fff; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.05); padding: 30px;">
        <h2 style="color: #333;">Password Reset Request</h2>
        <p style="font-size: 16px; color: #555;">
            You have requested a password reset.<br>
            Click the button below to reset your password:
        </p>
        <p style="text-align: center; margin: 30px 0;">
            <a href="{reset_link}" style="background: #007bff; color: #fff; text-decoration: none; padding: 12px 24px; border-radius: 5px; font-weight: bold;">
            Reset Password
            </a>
        </p>
        <p style="font-size: 14px; color: #888;">
            If you did not request this, please ignore this email.<br>
            This link will expire soon for your security.
        </p>
        </div>
    </body>
    </html>
    """

    return email_html_message