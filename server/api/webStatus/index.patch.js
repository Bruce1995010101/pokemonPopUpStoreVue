import conn from "../../sql";

export default defineEventHandler(async (event) => {
    let data = '沒撈到';
    const body = await readBody(event);

    try {
        const { webStatus } = body;
        // 查詢 web 資料表的所有內容
        const [result] = await conn.query("UPDATE web SET webStatus = ? WHERE id = 1",
            [webStatus]
        );

        // 如果有資料則回傳
        if (result.affectedRows > 0) {
            data = { message: `更改網站狀態 --- OK`, result: true };
        } else {
            data = { message: `更改網站狀態不成功`, result: false };
        }

    } catch (err) {
        console.error("Error:", err);
        data = false;
    }

    return data;
});
