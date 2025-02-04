import conn from "../../sql";

export default defineEventHandler(async (event) => {
    let data = "沒撈到";
    const body = await readBody(event);

    try {
        // 解析請求參數
        const {
            storeBookingID, storeBookingExist, bookingDate,
            bookingTimePeriod, bookingNumber, bookingName,
            bookingEmail, bookingTel
        } = body;

        // 更新 storeBooking 資料
        const [updateResult] = await conn.query(
            `UPDATE storeBooking 
             SET storeBookingExist = ?, bookingDate = ?, bookingTimePeriod = ?, 
                 bookingNumber = ?, bookingName = ?, bookingEmail = ?, 
                 bookingTel = ? 
             WHERE storeBookingID = ?`,
            [
                storeBookingExist, bookingDate, bookingTimePeriod, 
                bookingNumber, bookingName, bookingEmail, 
                bookingTel, storeBookingID
            ]
        );

        if (updateResult.affectedRows > 0) {
            data = { message: `update: ${storeBookingID} --- OK` };
        } else {
            data = { message: `No record updated for storeBookingID: ${storeBookingID}` };
        }

    } catch (err) {
        console.error("Error:", err);
        data = false;
    }

    return data;
});
