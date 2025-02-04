import conn from "../../sql";

export default defineEventHandler(async (event) => {
    let data = "沒撈到";
    const body = await readBody(event);

    try {
        // 解析請求參數
        const { cafeBookingID, bookingExist } = body;

        // 更新 cafeBooking 資料
        const [updateResult] = await conn.query(
            `UPDATE cafeBooking SET bookingExist = ? WHERE cafeBookingID = ?`,
            [bookingExist, cafeBookingID]
        );

        if (updateResult.affectedRows > 0) {
            data = { message: `更改預訂狀態 ${cafeBookingID} --- OK` };
        } else {
            data = { message: `No record updated for cafeBookingID: ${cafeBookingID}` };
        }

    } catch (err) {
        console.error("Error:", err);
        data = false;
    }

    return data;
});
