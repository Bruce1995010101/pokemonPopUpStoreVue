import conn from "../../sql";

export default defineEventHandler(async (event) => {
    let data = '沒撈到';

    try {
        // 查詢 web 資料表的所有內容
        const [result] = await conn.query("SELECT * FROM web");

        // 如果有資料則回傳
        data = result.length > 0 ? result : '沒撈到';

    } catch (err) {
        console.error("Error:", err);
        data = false;
    }

    return data;
});
