import conn from "../../sql";

export default defineEventHandler(async (event) => {
    let data = "沒撈到";
    const body = await readBody(event);

    try {
        // 解析請求參數
        const {
            orderID,
            orderExist,
            orderProductID,
            productQ,
            buyerName,
            buyerEmail,
            buyerTel,
            buyerAddr,
            transportNote,
            orderDate,
            payment,
            receiptType,
            companyTitle,
            taxIDNumber,
            orderStatus,
            transactionID
        } = body;

        // 取得商品價格計算 orderAmount
        let orderAmount = 0;
        const [priceResult] = await conn.query(
            `SELECT productPrice FROM product WHERE productID = ?`,
            [orderProductID]
        );

        if (priceResult.length > 0) {
            orderAmount = priceResult[0].productPrice * productQ;
        }

        // 更新 orderlist 資料
        const [result] = await conn.query(
            `UPDATE orderlist 
             SET orderExist = ?, orderProductID = ?, productQ = ?, buyerName = ?, 
                 buyerEmail = ?, buyerTel = ?, buyerAddr = ?, transportNote = ?, 
                 orderDate = ?, payment = ?, receiptType = ?, companyTitle = ?, 
                 taxIDNumber = ?, orderStatus = ?, transactionID = ?, orderAmount = ? 
             WHERE orderID = ?`,
            [
                orderExist, orderProductID, productQ, buyerName,
                buyerEmail, buyerTel, buyerAddr, transportNote,
                orderDate, payment, receiptType, companyTitle,
                taxIDNumber, orderStatus, transactionID, orderAmount, orderID
            ]
        );

        if (result.affectedRows > 0) {
            data = { message: `update: ${orderID} --- OK` };
        } else {
            data = { message: `No record updated for orderID: ${orderID}` };
        }

    } catch (err) {
        console.error("Error:", err);
        data = false;
    }

    return data;
});
