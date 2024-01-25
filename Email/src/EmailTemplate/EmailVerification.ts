interface IemailVerificationAttrs {
  username: string;
  token: string;
  expiresIn: string;
}

export function emailVerification(options: IemailVerificationAttrs) {
  const { username, token, expiresIn } = options;
  return `<!DOCTYPE html>
    <html lang="en">
    
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Verify Your Email - Reclamify</title>
        <style>
            body {
                font-family: 'Arial', sans-serif;
                margin: 0;
                padding: 0;
                background-color: #f5f5f5;
            }
    
            .container {
                max-width: 600px;
                margin: 20px auto;
                padding: 20px;
                background-color: #ffffff;
                border-radius: 10px;
                box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
            }
    
            h1 {
                color: #007BFF;
                text-align: center;
            }
    
            p {
                color: #333333;
                margin: 10px 0;
                line-height: 1.6;
            }
    
            .verification-code {
                background-color: #007BFF;
                color: #ffffff;
                padding: 10px;
                text-align: center;
                border-radius: 5px;
                font-size: 18px;
                margin: 20px 0;
            }
    
            .note {
                color: #555555;
            }
    
            .signature {
                color: #555555;
                margin-top: 20px;
            }
        </style>
    </head>
    
    <body>
        <div class="container">
            <h1>Verify Your Email - Reclamify</h1>
            <p>Dear ${username},</p>
            <p>Thank you for joining Reclamify! To complete your registration, please verify your email using the following verification code:</p>
            <div class="verification-code">${token}</div>
            <p class="note">Note: This code will expire in ${expiresIn}.</p>
            <p>If you didn't sign up for Reclamify, you can safely ignore this email.</p>
            <p>If you have any questions or need assistance, feel free to reach out to our support team.</p>
            <p class="signature">Best regards,<br>The Reclamify Team</p>
        </div>
    </body>
    
    </html>
    `;
}
