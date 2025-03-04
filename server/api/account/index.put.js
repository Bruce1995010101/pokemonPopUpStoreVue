import conn from "../../sql";
import bcrypt from "bcryptjs";

export default defineEventHandler(async (event) => {
    let data = "沒撈到";
    const body = await readBody(event);

    try {
        // 解析請求參數
        const {
            userID,
            userExist,
            userName,
            userAccount,
            userPassword,
            userOriginPassword,
            userTitle,
            userEmail
        } = body;

        // 查詢當前密碼
        const [user] = await conn.query("SELECT userPassword FROM userInfo WHERE userID = ?", [userID]);

        if (!user.length) {
            return { message: "用戶不存在" };
        }

        const currentHashedPassword = user[0].userPassword;
        let userNewPassword = currentHashedPassword;

        // 若原始密碼與現有密碼不同，則重新 Hash
        if (userPassword !== userOriginPassword) {
            userNewPassword = bcrypt.hashSync(userPassword, 10);
        }

        // 更新用戶資訊
        await conn.query(
            `UPDATE userInfo SET userExist = ?, userName = ?, userAccount = ?, 
                userPassword = ?, userTitle = ?, userEmail = ? 
             WHERE userID = ?`,
            [userExist, userName, userAccount, userNewPassword, userTitle, userEmail, userID]
        );

        data = { message: `update: ${userID} --- OK` };

    } catch (err) {
        console.error("Error:", err);
        data = false;
    }

    return data;
});
