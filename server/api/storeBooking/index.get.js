import conn from "../../sql";

export default defineEventHandler(async (event) => {
    // console.log(event.node.req);
    let data = '沒撈到';

    if (event.node.req) {
        try {
            const {
                storeBookingID,
                storeBookingExist,
                bookingDate,
                bookingTimePeriod,
                bookingNumber,
                bookingName,
                bookingEmail,
                bookingTel
            } = event.node.req.query;

            // 建立 SQL 查詢
            let query = "SELECT * FROM storeBooking WHERE 1 = 1";
            let params = [];

            if (storeBookingID) {
                query += " AND storeBookingID = ?";
                params.push(storeBookingID);
            }
            if (storeBookingExist) {
                query += " AND storeBookingExist = ?";
                params.push(storeBookingExist);
            }
            if (bookingDate) {
                query += " AND bookingDate LIKE ?";
                params.push(`%${bookingDate}%`);
            }
            if (bookingTimePeriod) {
                query += " AND bookingTimePeriod LIKE ?";
                params.push(`%${bookingTimePeriod}%`);
            }
            if (bookingNumber) {
                query += " AND bookingNumber = ?";
                params.push(bookingNumber);
            }
            if (bookingName) {
                query += " AND bookingName LIKE ?";
                params.push(`%${bookingName}%`);
            }
            if (bookingEmail) {
                query += " AND bookingEmail LIKE ?";
                params.push(`%${bookingEmail}%`);
            }
            if (bookingTel) {
                query += " AND bookingTel LIKE ?";
                params.push(`%${bookingTel}%`);
            }

            console.log("Generated SQL Query:", query);
            console.log("Parameters:", params);

            // 執行 SQL 查詢
            const [dataResult] = await conn.query(query, params);
            data = dataResult.length > 0 ? dataResult : '沒撈到';

        } catch (err) {
            console.error("Error:", err);
            data = false;
        }

        // 回傳 JSON 結果
        return data;
    }
});
