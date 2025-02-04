import conn from "../../sql";

export default defineEventHandler(async (event) => {
    let data = "沒撈到";
    const body = await readBody(event);

    try {
        // 解析請求參數
        const {
            cafeBookingID,
            bookingExist,
            bookingDate,
            bookingTimePeriod,
            bookingNumber,
            bookingName,
            bookingEmail,
            bookingTel
        } = body;

        // 更新咖啡廳預訂資料
        const [result] = await conn.query(
            `UPDATE cafeBooking 
             SET bookingExist = ?, bookingDate = ?, bookingTimePeriod = ?, 
                 bookingNumber = ?, bookingName = ?, bookingEmail = ?, bookingTel = ? 
             WHERE cafeBookingID = ?`,
            [bookingExist, bookingDate, bookingTimePeriod, bookingNumber, bookingName, bookingEmail, bookingTel, cafeBookingID]
        );

        if (result.affectedRows > 0) {
            data = { message: `update: ${cafeBookingID} --- OK` };
        } else {
            data = { message: `No record updated for cafeBookingID: ${cafeBookingID}` };
        }

    } catch (err) {
        console.error("Error:", err);
        data = false;
    }

    return data;
});
