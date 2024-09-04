import nodemailer from 'nodemailer';


const mailSender = nodemailer.createTransport({
        service: 'Mail.ru',
        port: 465,
        secure: true,
        auth: {
            user: process.env.EMAIL_SMTP,
            pass: process.env.EMAIL_PASS,
        },
        ignoreTLS: true,
    },
    {
        from: process.env.EMAIL_SMTP_NAME,
    },
);

async function sendMail({
                      to,
                      subject,
                      textMsg,
                      res,
                  }) {
    const mailOptions = {
        to,
        subject,
        html: textMsg,
    };

    console.log(mailOptions);

    await mailSender.sendMail(mailOptions, async (err) => {
        console.log(err)
        if (!res || err) {
            throw new Error('Техническая ошибка! Не получилось отправить письмо на электронную почту');
        } else if (err?.response === '550 non-local recipient verification failed') {
            return res.status(500).json({error: err?.response});
        } else {
            return res.status(500);
        }
    });
}

export async function sendConfirmURL({
                                   to,
                                   res,
                                   hashlink,
                               }) {
    const subject = 'Подтверждение регистрации!';

    const textMsg =
        '<h2>Подтвердите свою почту!</h2>' +
        'Пожалуйста, подтвердите свой почтовый адрес, пройдя по ссылке:' +
        `<a href="${process.env.ORIGIN}/confirm/${hashlink}" style="font-size: 20px; color: #005bd1; display: block; padding: 14px 0">Подтверждение регистрации</a>` +
        'Спасибо за регистрацию на нашем сервисе!';

    await sendMail({
        to,
        subject,
        textMsg,
        res
    });
}