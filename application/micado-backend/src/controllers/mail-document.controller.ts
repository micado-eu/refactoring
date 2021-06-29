// Uncomment these imports to begin using these cool features!
import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import { SMTPClient, Message } from 'emailjs';
import { DocumentPicturesRepository, FeedbackRepository, SettingsRepository } from '../repositories';
const nodemailer = require("nodemailer")

export class MailDocumentController {
  constructor(
    @repository(DocumentPicturesRepository) protected documentPicturesRepository: DocumentPicturesRepository,
    @repository(FeedbackRepository) protected feedbackRepository: FeedbackRepository,
    @repository(SettingsRepository) protected settingsRepository: SettingsRepository,
  ) { }


  @get('/maildocument', {
    responses: {
      '200': {
        description: 'Send a document to a mail',
        content: {
          'application/json': {
            schema: { type: 'string' },
          },
        },
      },
    },
  })
  async maildocument (
    @param.query.number('documentId') documentId = 0,
    @param.query.string('email') email = 'en'
  ): Promise<any> {
    let transporter = nodemailer.createTransport({
      host: process.env.WEBLATE_EMAIL_HOST,
      port: 25,
      secure: (process.env.WEBLATE_EMAIL_HOST_SSL == 'true' ? true : false), 
      auth: {
        user:  process.env.WEBLATE_EMAIL_HOST_USER, 
        pass: process.env.WEBLATE_EMAIL_HOST_PASSWORD, 
      },
      tls: {
        rejectUnauthorized: false
    }
    });

    let pictures = await this.documentPicturesRepository.find({
      where: {
        docId: { eq: documentId },
      }
    })

    //Usage example:
    //   var file = dataURLtoFile('data:text/plain;base64,aGVsbG8gd29ybGQ=', 'hello.txt');
    //  console.log(file);

    const message = new Message({
      text: 'i hope this works',
      from: process.env.WEBLATE_EMAIL_HOST,
      to: email,
      subject: 'testing emailjs2',
    });

    /*let index = 0
    pictures.forEach((picture) => {
      let picBase: any = picture.picture
      var arr = picBase.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        ext = mime.split('/'),
        sent = arr[1]

      message.attach({
        data: arr[1],
        name: "document" + index + "." + ext[1],
        type: mime,
        encoded: true,
        inline: false
      })
      index++
    })*/
    let deciphered_pics:any=[]
    pictures.forEach((picture:any) => {
      deciphered_pics.push(this.decipher(picture))
    });
    let clean_pics:any=[]
    deciphered_pics.forEach((picture:any) => {
      let picBase: any = picture.picture
      var arr = picBase.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        ext = mime.split('/'),
        sent = arr[1]

      clean_pics.push(arr[1])
      })
    
    let index = 0
    let picture_attachment:any =[]
    clean_pics.forEach((picture:any)=>{
      picture_attachment.push({filename:'document' + index, content:picture, encoding:'base64'})
      index++
    })
    let info = await transporter.sendMail({
      from: process.env.WEBLATE_EMAIL_HOST, 
      to: email, 
      subject:'Requested document', 
      text: 'You will find the requested document attached to this mail', 
      attachments: picture_attachment
    });
    console.log("Message sent: %s", info.messageId)
    /*
        let img64: any = 'data:image/png;base64,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'
    
        var arr = img64.split(','),
          mime = arr[0].match(/:(.*?);/)[1],
          ext = mime.split('/'),
          sent = arr[1]
    
        message.attach({
          data: arr[1],
          name: "myfile." + ext[1],
          type: mime,
          encoded: true,
          inline: false
        })
    */
    // send the message and get a callback with an error or details of the message that was sent


  }
  @get('/mailfeedback', {
    responses: {
      '200': {
        description: 'Send a document to a mail',
        content: {
          'application/json': {
            schema: { type: 'string' },
          },
        },
      },
    },
  })
  async mailfeedback (
    @param.query.string('url') url:string,
    @param.query.string('feedback') feedback:string
  ): Promise<any> {

    let email = await this.settingsRepository.find({
      where: {
        key: { eq: 'feedback_email' },
      }
    })
    console.log(email[0].value)
    let transporter = nodemailer.createTransport({
      host: process.env.WEBLATE_EMAIL_HOST,
      port: 25,
      secure: (process.env.WEBLATE_EMAIL_HOST_SSL == 'true' ? true : false), 
      auth: {
        user:  process.env.WEBLATE_EMAIL_HOST_USER, 
        pass: process.env.WEBLATE_EMAIL_HOST_PASSWORD, 
      },
      tls: {
        rejectUnauthorized: false
    }
    });
  
    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: process.env.WEBLATE_EMAIL_HOST, 
      to: email[0].value, 
      subject: 'feedback on ' + url, 
      text: feedback, 
    });
    console.log("Message sent: %s", info.messageId)
  }

  decipher(picture:any){
    const crypto = require('crypto');
    const algorithm = process.env.ALGORITHM;
    const password = process.env.ALGORITHM_PASSWORD;
    const key = crypto.scryptSync(password, process.env.SALT, Number(process.env.KEY_LENGTH));
    const iv = Buffer.alloc(Number(process.env.BUFFER_0), Number(process.env.BUFFER_1));
    const decipher = crypto.createDecipheriv(algorithm, key, iv);
    let decrypted = decipher.update(picture.picture, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    picture.picture = decrypted    
    return picture
  }
}

