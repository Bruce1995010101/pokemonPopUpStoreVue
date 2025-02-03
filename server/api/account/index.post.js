import conn from "../../sql";
import bcrypt from "bcryptjs";

export default defineEventHandler(async (event) => {
    let data = '沒撈到';

    

    try {
        const body = await readBody(event); // 讀取 POST 資料
        // console.log(body);

        // 解析請求參數
        const { userExist, userName, userAccount, userPassword, userTitle, userEmail } = body;

        // 使用 bcryptjs 進行密碼加密
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(userPassword, saltRounds);

        // 插入用戶資料
        const [result] = await conn.query(
            "INSERT INTO userInfo (userExist, userName, userAccount, userPassword, userTitle, userEmail) VALUES (?, ?, ?, ?, ?, ?)",
            [userExist, userName, userAccount, hashedPassword, userTitle, userEmail]
        );

        // 取得新插入的 ID
        const userID = result.insertId;
        // console.log(userID);
        

        data = { message: `insert: ${userID}---OK` };

    } catch (err) {
        console.error("Error:", err);
        data = false;
    }

    return data;
});
