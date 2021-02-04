const dotenv = require("dotenv");
const sgMail = require("@sendgrid/mail")
 const ResponseHelper = require("../utility/ResponseHelper");

dotenv.config();
 
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = (receiver, source, subject, content) => {
    try {
        const data = {
            to: receiver,
            from: source,
            subject,
            html: content,
        }
      return sgMail.send(data)
    } catch (error) {
        return ResponseHelper.error(res, 500, {
          message: "Server error",
        });
    }
}

module.exports = sendEmail;