import * as Mail from 'nodemailer/lib/mailer';
export default class EmailService {
    private nodemailerTransport;
    constructor();
    sendMail(options: Mail.Options): any;
}
