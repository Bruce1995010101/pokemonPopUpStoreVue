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
        const bookingDate = new Date().toLocaleString("zh-TW", {
            year: "numeric", month: "2-digit", day: "2-digit",
            hour: "2-digit", minute: "2-digit", second: "2-digit",
            hourCycle: "h23", timeZone: "Asia/Taipei"
        }).replace(/\//g, "-")
        // console.log(bookingDate);


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
