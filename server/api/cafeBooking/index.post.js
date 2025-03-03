import conn from "../../sql";

export default defineEventHandler(async (event) => {
    let data = '沒撈到';
    
    try {
        // 讀取 POST 資料
        const body = await readBody(event);
        
        // 設定台北時區並取得當前時間
        const bookingDate = new Date().toLocaleString("zh-TW", {
            year: "numeric", month: "2-digit", day: "2-digit",
            hour: "2-digit", minute: "2-digit", second: "2-digit",
            hourCycle: "h23", timeZone: "Asia/Taipei"
        }).replace(/\//g, "-")

        // 解構其他表單資料
        const {
            bookingExist,
            bookingTimePeriod,
            bookingNumber,
            bookingName,
            bookingEmail,
            bookingTel
        } = body;

        // 插入預約資料
        const [result] = await conn.query(
            `INSERT INTO cafeBooking (
                bookingExist,
                bookingDate,
                bookingTimePeriod,
                bookingNumber,
                bookingName,
                bookingEmail,
                bookingTel
            ) VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [
                bookingExist,
                bookingDate,
                bookingTimePeriod,
                bookingNumber,
                bookingName,
                bookingEmail,
                bookingTel
            ]
        );

        // 取得新插入的預約 ID
        const storeBookingID = result.insertId;
        
        data = { message: `insert: ${storeBookingID}---OK` };

    } catch (err) {
        console.error("Error:", err);
        data = false;
    }

    return data;
});