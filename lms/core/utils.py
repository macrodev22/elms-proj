
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

def leave_action_email_html(leave, remarks, action, user):
    email_message = f"""
    <html>
    <body style="font-family: Arial, sans-serif; background-color: #f4f6f8; color: #333; padding: 30px;">
        <div style="max-width: 600px; margin: auto; background-color: #ffffff; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); padding: 30px;">
        
        <p style="font-size: 18px; color: #2c3e50; margin-bottom: 20px;">
            Dear <span style="color: #2980b9;">{leave.requested_by.first_name}</span>,
        </p>

        <p style="font-size: 16px; line-height: 1.6; margin-bottom: 20px; color: #34495e;">
            Your request for <strong style="color: #27ae60;">{leave.type.name}</strong> starting on 
            <strong style="color: #2980b9;">{leave.start_time.date()}</strong> to 
            <strong style="color: #2980b9;">{leave.end_time.date()}</strong> has been 
            <strong style="color: #c0392b;">{action}d</strong> by 
            <strong style="color: #8e44ad;">{user.first_name}</strong>.
        </p>

        <p style="font-size: 16px; margin-bottom: 30px;">
            <strong style="color: #e67e22;">Remarks:</strong> {remarks}.
        </p>

        <p style="font-size: 16px; color: #7f8c8d;">
            Regards,<br/>
            <span style="font-weight: bold; color: #34495e;">{leave.company.name} HR</span>
        </p>

        </div>
    </body>
    </html>
    """
    return email_message

def hr_leave_action_email_html(leave, remarks, action, user):
    hr_message_html = f"""
    <html>
    <body style="font-family: Arial, sans-serif; background-color: #f9fafb; color: #333; padding: 30px;">
        <div style="max-width: 600px; margin: auto; background-color: #ffffff; border-radius: 8px; box-shadow: 0 3px 10px rgba(0,0,0,0.1); padding: 25px;">
        
        <p style="font-size: 18px; color: #2c3e50; margin-bottom: 20px;">
            Dear <span style="color: #2980b9;">{user.first_name}</span>,
        </p>

        <p style="font-size: 16px; line-height: 1.6; margin-bottom: 20px; color: #34495e;">
            You have <strong style="color: #27ae60;">{action}d</strong> the request for 
            <strong style="color: #2980b9;">{leave.type.name}</strong> requested by 
            <strong style="color: #8e44ad;">{leave.requested_by.first_name}</strong> 
            (<a href="mailto:{leave.requested_by.email}" style="color: #e67e22; text-decoration: none;">{leave.requested_by.email}</a>).
        </p>

        <p style="font-size: 16px; margin-bottom: 30px;">
            <strong style="color: #e67e22;">Remarks:</strong> {remarks}
        </p>

        <p style="font-size: 16px; color: #7f8c8d; font-weight: bold;">
            {user.company.name}
        </p>

        </div>
    </body>
    </html>
    """
    return hr_message_html

def created_user_email_html(request, created_user, data):
    message_html = f"""
<html>
  <body style="font-family: Arial, sans-serif; background-color: #f9f9f9; color: #333; padding: 20px;">
    <div style="max-width: 600px; margin: auto; background-color: #ffffff; padding: 30px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
      <p style="font-size: 18px;">Hello <strong style="color: #2a7ae2;">{created_user.first_name}</strong>,</p>

      <p style="font-size: 16px;">
        Your employee account at <strong style="color: #2a7ae2;">{created_user.company.name}</strong> has been created successfully.
      </p>

      <p style="font-size: 16px; margin-top: 20px;">Login with the credentials below:</p>

      <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
        <tr>
          <td style="padding: 8px; font-weight: bold; background-color: #f1f1f1; width: 100px;">Email:</td>
          <td style="padding: 8px; background-color: #f9f9f9;">{created_user.email}</td>
        </tr>
        <tr>
          <td style="padding: 8px; font-weight: bold; background-color: #f1f1f1;">Password:</td>
          <td style="padding: 8px; background-color: #f9f9f9;">{data['password']}</td>
        </tr>
      </table>

      <p style="margin-top: 20px; font-size: 16px;">
        <a href="{request.scheme}://{request.get_host()}/login" style="color: #ffffff; background-color: #2a7ae2; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">
          Login Here
        </a>
      </p>

      <p style="margin-top: 30px; font-size: 14px; color: #777;">
        Regards,<br/>
        {created_user.company.name} Team
      </p>
    </div>
  </body>
</html>
"""
    return message_html