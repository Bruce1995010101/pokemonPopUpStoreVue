import conn from "../../sql";

export default defineEventHandler(async (event) => {
    let data = "沒撈到";
    const body = await readBody(event);

    try {
        // 解析請求參數
        const { storeBookingID, storeBookingExist } = body;

        // 確保必要參數存在
        if (storeBookingID === undefined || storeBookingExist === undefined) {
            return { message: "缺少 storeBookingID 或 storeBookingExist" };
        }

        // 執行 SQL 更新
        const query = "UPDATE storeBooking SET storeBookingExist = ? WHERE storeBookingID = ?";
        const [updateResult] = await conn.query(query, [storeBookingExist, storeBookingID]);

        if (updateResult.affectedRows > 0) {
            data = { message: `更改店內預約狀態 storeBookingID = ${storeBookingID} --- OK` };
        } else {
            data = { message: `No record updated for storeBookingID: ${storeBookingID}` };
        }

    } catch (err) {
        console.error("Error:", err);
        data = false;
    }

    return data;
});
