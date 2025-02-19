import conn from "../../sql";

export default defineEventHandler(async (event) => {
    // console.log(event.node.req);
    let data = '沒撈到';

    try {
        let finalData = [];

        // 1️⃣ 商品數量 (productNum)
        let query = "SELECT COUNT(productID) as productNum FROM product";
        const [productNumResult] = await conn.query(query);
        finalData.push(productNumResult[0]);

        // 2️⃣ 交易筆數 (orderNum)
        query = "SELECT COUNT(transactionID) AS orderNum FROM (SELECT transactionID FROM orderlist GROUP BY transactionID ) as tmp";
        const [orderNumResult] = await conn.query(query);
        finalData.push(orderNumResult[0]);

        // 3️⃣ 交易總金額 (amount)
        query = "SELECT SUM(orderAmount) as amount FROM orderlist";
        const [amountResult] = await conn.query(query);
        finalData.push(amountResult[0]);

        // 4️⃣ 咖啡廳預訂人數 (cafeBookingNum)
        query = "SELECT SUM(bookingNumber) as cafeBookingNum FROM cafeBooking";
        const [cafeBookingNumResult] = await conn.query(query);
        finalData.push(cafeBookingNumResult[0]);

        // 5️⃣ 門市預訂人數 (storeBookingNum)
        query = "SELECT SUM(bookingNumber) as storeBookingNum FROM storeBooking";
        const [storeBookingNumResult] = await conn.query(query);
        finalData.push(storeBookingNumResult[0]);

        data = finalData.length > 0 ? finalData : '沒撈到';

    } catch (err) {
        console.error("Error:", err);
        data = false;
    }

    // 回傳 JSON 結果
    return data;
});
