import express from "express"
import { fromNodeMiddleware } from "h3"
import bp from "body-parser"
import session from "express-session"
import conn from "../sql.js"
import nodemailer from "nodemailer"
import bcrypt from "bcryptjs"
import cors from "cors";


const app = express();

//導入body-parser 以處理post
app.use(bp.urlencoded({ extended: true }));
app.use(bp.json());

app.use(
    cors({
        origin: "http://localhost:3000", // 你的前端網址
        credentials: true, // 🔹 允許跨域傳送 Cookie
    })
);


//導入express-session 以儲存各網頁互傳時的資料
app.use(session({
    secret: 'password',
    resave: true,
    saveUninitialized: true,
    cookie: {
        secure: false, // ⚠️ 本地測試要設 `false`，否則 session 無法存入
        httpOnly: true,
        sameSite: "lax", // 避免 CSRF 問題
    }
}))



//nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'pokemonpopupstore@gmail.com',
        pass: 'dzglimofmytoyqaz'
    },
    socketTimeout: 60000
})

function mailSomeone(mailAddress, mailSubject, mailText) {
    const mailOptions = {
        from: 'pokemonPopUpStore@gmail.com',
        to: mailAddress,
        subject: mailSubject,
        text: mailText
    }
    return new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, function (err, info) {
            if (err) {
                return reject(err)
            } else {
                return resolve(info)
            }
        })
    })
        .then(info => {
            // res.send(mailAddress)
            return info

        })
        .catch((err) => console.log(err))
}





// bcrypt
async function verifyPassword(plainTextPassword, hashedPassword) {
    try {
        const match = await bcrypt.compare(plainTextPassword, hashedPassword);
        return match;
    } catch (error) {
        console.error('Error verifying password:', error);
        return false;
    }
}

function hashPasswordSync(password) {
    try {
        // 生成鹽值並哈希密碼
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);
        return hashedPassword;
    } catch (error) {
        console.error('Error hashing password:', error);
        throw error;
    }
}




app.post('/loginApi', async function (req, res) {
    let account = req.body.account
    let password = req.body.password

    const [result] = await conn.query(`select * from userInfo where userExist = 1 AND userAccount = ?`, [account])

    if (result[0] !== undefined) {
        // console.log("有人登入");
        await verifyPassword(password, result[0].userPassword)
            .then(async function (check) {
                if (check) {
                    //存入session
                    const [resultAuthority, err] = await conn.query(`SELECT * FROM userInfo INNER JOIN userAuthority INNER JOIN page on userInfo.userID = userAuthority.authorityUserID AND userAuthority.authorityPageID = page.pageID WHERE userAccount = ?`, [account])
                    req.session.account = account;
                    req.session.accountAuthority = resultAuthority;
                    req.session.userTitle = resultAuthority[0].userTitle;
                    // console.log(resultAuthority);
                    // console.log('/loginApi:',req.session);
                    const userInfo = {account, accountAuthority:resultAuthority, userTitle: resultAuthority[0].userTitle};
                    res.send(userInfo);
                    // console.log("登入成功");
                } else {
                    res.send(false);
                    // console.log("登入失敗");
                }
            })
    } else {
        res.send(false);
        console.log("err");
    }
})
app.get('/getITAccount', async function (req, res) {
    const [result] = await conn.query(`select * from userInfo where userTitle = 'IT'`)
    // console.log(result);

    if (result[0] !== undefined) {
        let data = [{
            userAccount: result[0].userAccount,
            userName: result[0].userName,
            userEmail: result[0].userEmail,
        }]
        res.send(JSON.stringify(data));
    } else {
        res.send(false);
    }
})

app.post('/loginForgetApi', async function (req, res) {
    let account = req.body.account
    req.session.accountForget = account

    let [result] = await conn.query(`select * from userInfo where userExist = 1 AND userAccount = ?`, [account])
    // console.log(result);
    let code = '';
    for (let i = 0; i < 6; i++) {
        code += Math.floor(Math.random() * 10)
    }
    req.session.code = code;
    // console.log(password);
    // console.log(result[0].userPassword);
    if (result[0] !== undefined) {
        let data = [{
            userAccount: result[0].userAccount,
            userEmail: result[0].userEmail,
            code: code
        }]
        res.send(JSON.stringify(data));
    } else {
        res.send(false);
    }
})


app.get('/checkUserAuthority', async function (req, res) {
    let account = req.session.account
    let userTitle = req.session.userTitle
    let accountAuthority = req.session.accountAuthority
    // console.log('存在/checkUserAuthority的session:', account);
    // console.log('🟢 /checkUserAuthority session ID:', req.sessionID);
    res.send({account, userTitle, accountAuthority})
})


app.post('/mailSomeone', async function (req, res) {
    const mail = req.body.mail
    const subject = req.body.subject
    const text = req.body.text
    const result = await mailSomeone(mail, subject, text)
    res.send(result)

})

app.get('/logout', function (req, res) {
    delete req.session.account;
    delete req.session.accountAuthority;
    res.send('out')
})


export default fromNodeMiddleware(app);