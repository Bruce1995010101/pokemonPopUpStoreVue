import conn from "../../sql";

export default defineEventHandler(async (event) => {
    let data = "沒撈到";
    const body = await readBody(event);

    try {
        // 解析請求參數
        const {
            storeBookingExist,
            bookingTimePeriod,
            bookingNumber,
            bookingName,
            bookingEmail,
            bookingTel
        } = body;

        // 設定台灣時區，取得當前時間
        const bookingDate = new Date().toISOString().slice(0, 19).replace("T", " ");

        // 插入預訂資訊
        const [result] = await conn.query(
            `INSERT INTO storeBooking (storeBookingExist, bookingDate, bookingTimePeriod, 
                bookingNumber, bookingName, bookingEmail, bookingTel) 
             VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [storeBookingExist, bookingDate, bookingTimePeriod, bookingNumber, bookingName, bookingEmail, bookingTel]
        );

        const storeBookingID = result.insertId;

        data = { message: `insert: ${storeBookingID}---OK` };

    } catch (err) {
        console.error("Error:", err);
        data = false;
    }

    return data;
});
