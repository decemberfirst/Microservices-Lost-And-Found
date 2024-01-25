export function welcomeTemplate(name: string) {
  return `<!DOCTYPE html>
    <html lang="en">
    
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Welcome to Reclamify - Lost and Found App</title>
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
    
            ul {
                color: #333333;
                margin: 10px 0;
                padding-left: 20px;
            }
    
            li {
                margin-bottom: 5px;
            }
    
            .signature {
                color: #555555;
                margin-top: 20px;
            }
        </style>
    </head>
    
    <body>
        <div class="container">
            <h1>Welcome to Reclamify - Lost and Found App!</h1>
            <p>Dear ${name},</p>
            <p>We're excited to have you on board! Reclamify is here to help you reclaim your lost items effortlessly.</p>
            <p>Here are some key features of our app:</p>
            <ul>
                <li>Report and track lost items with ease.</li>
                <li>Connect with others who have found similar items.</li>
                <li>Receive notifications when someone reports a found item matching yours.</li>
            </ul>
            <p>If you have any questions or need assistance, feel free to reach out to our support team.</p>
            <p>Thank you for choosing Reclamify!</p>
            <p class="signature">Best regards,<br>The Reclamify Team</p>
        </div>
    </body>
    
    </html>
    `;
}
