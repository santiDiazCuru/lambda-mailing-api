import mailgun from "mailgun-js";
const mailer: any = mailgun({
  apiKey: process.env.API_KEY,
  domain: process.env.DOMAIN
});

class MailgunRepository {
  public async asyncSendMail(emailData): Promise<IAsyncMailerResponse> {
    const func = async () => mailer.messages().send(emailData);
    try {
      const res = await func();
      return { error: false, message: "" };
    } catch (err) {
      return { error: true, message: err };
    }
  }
}

interface IAsyncMailerResponse {
  error: boolean;
  message: string;
}

export default new MailgunRepository();
