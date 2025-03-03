import conn from "../../sql";

export default defineEventHandler(async (event) => {
    // console.log(event.node.req);
    let data = '沒撈到';

    if (event.node.req) {
        try {
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
                transactionID,
                orderAmount,
                productName
            } = event.node.req.query;

            // 建立 SQL 查詢
            let query = `SELECT * FROM orderlist 
                         LEFT JOIN product ON orderlist.orderProductID = product.productID 
                         WHERE 1 = 1`;
            let params = [];

            if (orderID) {
                query += " AND orderID = ?";
                params.push(orderID);
            }
            if (orderExist) {
                query += " AND orderExist = ?";
                params.push(orderExist);
            }
            if (orderProductID) {
                query += " AND orderProductID = ?";
                params.push(orderProductID);
            }
            if (productQ) {
                query += " AND productQ = ?";
                params.push(productQ);
            }
            if (buyerName) {
                query += " AND buyerName LIKE ?";
                params.push(`%${buyerName}%`);
            }
            if (buyerEmail) {
                query += " AND buyerEmail LIKE ?";
                params.push(`%${buyerEmail}%`);
            }
            if (buyerTel) {
                query += " AND buyerTel LIKE ?";
                params.push(`%${buyerTel}%`);
            }
            if (buyerAddr) {
                query += " AND buyerAddr LIKE ?";
                params.push(`%${buyerAddr}%`);
            }
            if (transportNote) {
                query += " AND transportNote LIKE ?";
                params.push(`%${transportNote}%`);
            }
            if (orderDate) {
                query += " AND orderDate LIKE ?";
                params.push(`%${orderDate}%`);
            }
            if (payment) {
                query += " AND payment LIKE ?";
                params.push(`%${payment}%`);
            }
            if (receiptType) {
                query += " AND receiptType LIKE ?";
                params.push(`%${receiptType}%`);
            }
            if (companyTitle) {
                query += " AND companyTitle LIKE ?";
                params.push(`%${companyTitle}%`);
            }
            if (taxIDNumber) {
                query += " AND taxIDNumber LIKE ?";
                params.push(`%${taxIDNumber}%`);
            }
            if (orderStatus) {
                query += " AND orderStatus = ?";
                params.push(orderStatus);
            }
            if (transactionID) {
                query += " AND transactionID LIKE ?";
                params.push(`%${transactionID}%`);
            }
            if (orderAmount) {
                query += " AND orderAmount = ?";
                params.push(orderAmount);
            }
            if (productName) {
                query += " AND productName LIKE ?";
                params.push(`%${productName}%`);
            }

            // console.log("Generated SQL Query:", query);
            // console.log("Parameters:", params);


            // 執行 SQL 查詢
            const [dataResult] = await conn.query(query, params);
            data = dataResult;

            // 修改時間格式
            data = data.map(booking => ({
                ...booking,
                orderDate: new Date(booking.orderDate).toLocaleString("zh-TW", {
                    year: "numeric", month: "2-digit", day: "2-digit",
                    hour: "2-digit", minute: "2-digit", second: "2-digit",
                    hourCycle: "h23", timeZone: "Asia/Taipei"
                }).replace(/\//g, "-"),
            }));

        } catch (err) {
            console.error("Error:", err);
            data = false;
        }

        // 回傳 JSON 結果
        return data;
    }
});
