import conn from "../../sql";

export default defineEventHandler(async (event) => {
    let data = "沒撈到";
    const body = await readBody(event);

    try {
        // 解析請求參數
        const { userID, userExist } = body;

        // 更新 userInfo 資料
        const [updateResult] = await conn.query(
            `UPDATE userInfo SET userExist = ? WHERE userID = ?`,
            [userExist, userID]
        );

        if (updateResult.affectedRows > 0) {
            data = { message: `更改職員狀態 ${userID} --- OK` };
        } else {
            data = { message: `No record updated for userID: ${userID}` };
        }

    } catch (err) {
        console.error("Error:", err);
        data = false;
    }

    return data;
});
