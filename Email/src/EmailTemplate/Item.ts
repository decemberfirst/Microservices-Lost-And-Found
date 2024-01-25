interface ITemplate {
  itemCategory: string;
  itemLink: string;
  type: string;
}

export function ItemTemplate(item: ITemplate) {
  return `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Lost Item Notification</title>
      <style>
        body {
          font-family: 'Arial', sans-serif;
          background-color: #f5f5f5;
          margin: 0;
          padding: 0;
        }
    
        .container {
          max-width: 600px;
          margin: 20px auto;
          background-color: #ffffff;
          border-radius: 8px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          padding: 20px;
        }
    
        h1 {
          color: #333333;
        }
    
        p {
          color: #666666;
          margin-bottom: 20px;
        }
    
        .cta-button {
          display: inline-block;
          padding: 10px 20px;
          background-color: #4CAF50;
          color: #ffffff;
          text-decoration: none;
          border-radius: 5px;
          transition: background-color 0.3s ease;
        }
    
        .cta-button:hover {
          background-color: #45a049;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>Lost Item Notification</h1>
        <p>Dear User,</p>
        <p>We wanted to inform you that ${
          item.itemCategory
        } has been reported ${item.type.toLowerCase()} near your location. If you happen to  any information about it, please consider checking the details in the post linked below:</p>
        
        <a href="${item.itemLink}" class="cta-button">View Lost Item Post</a>
        
        <p>Thank you for your cooperation.</p>
        <p>Best regards,<br>Reclamify PVT LTD</p>
      </div>
    </body>
    </html>
    `;
}
