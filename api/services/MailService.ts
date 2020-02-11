var nodemailer = require('nodemailer');
import Config from '../constant/config';
import { injectable } from 'inversify';

@injectable()
class MailService {

    constructor()
    {

    };

    send(customerName:String){
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: Config.mail.sender.user,
              pass: Config.mail.sender.password
            }
          });
          
          var mailOptions = {
            from: Config.mail.sender.user,
            to: Config.mail.destination.address,
            subject: 'Novo cliente cadastrado',
            text: 'O cliente ' + customerName + ' foi cadastrado com sucesso!'
          };

          transporter.sendMail(mailOptions);
    }
}

export default MailService;