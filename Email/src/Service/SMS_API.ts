import { Transporter, createTransport } from 'nodemailer';

interface IemailApi {
  host: string;
  port: number;
  auth: {
    user: string;
    pass: string;
  };
}

interface Iemail {
  from: string;
  to: string;
  subject: string;
  text: string;
  html: string;
}

export class EMAIL_API {
  private transporter: Transporter | undefined = undefined;

  connect(obj: IemailApi) {
    this.transporter = createTransport(obj);
  }

  async send(options: Iemail) {
    if (!this.transporter) throw new Error('Transporter not initialized');
    await this.transporter.sendMail(options);
  }
}
