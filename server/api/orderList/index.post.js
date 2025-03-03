import conn from "../../sql";

export default defineEventHandler(async (event) => {
    let data = "沒撈到";
    let body = await readBody(event);
    // console.log(body);
    // if (typeof body === 'string') {
    //     body = JSON.parse(body);
    //     console.log(body);
    // }


    try {
        // 解析請求參數
        const {
            orderExist,
            orderProductIDList, // 逗號分隔的產品 ID
            productQList,        // 逗號分隔的數量
            buyerName,
            buyerEmail,
            buyerTel,
            buyerAddr,
            transportNote,
            payment,
            receiptType,
            companyTitle,
            taxIDNumber,
            orderStatus
        } = body;


        // const orderProductIDList = orderProductID.split(",").map(Number);
        // const productQList = productQ.split(",").map(Number);

        // 取得當前時間 & 生成交易 ID
        const orderDate = new Date().toLocaleString("zh-TW", {
            year: "numeric", month: "2-digit", day: "2-digit",
            hour: "2-digit", minute: "2-digit", second: "2-digit",
            hourCycle: "h23", timeZone: "Asia/Taipei"
        }).replace(/\//g, "-")
        const transactionID = new Date().toLocaleString("zh-TW", {
             year: "numeric", month: "2-digit", day: "2-digit",
            hour: "2-digit", minute: "2-digit", second: "2-digit",hourCycle: "h23",
        }).replace(/[-T:.Z]/g, "").replace(/[\/\s:]/g, "")

        for (let i = 0; i < orderProductIDList.length; i++) {
            const orderProductID = orderProductIDList[i];
            const productQ = productQList[i];

            // 查詢產品價格
            const [product] = await conn.query("SELECT productPrice FROM product WHERE productID = ?", [orderProductID]);
            if (product.length === 0) {
                console.error(`Product ID ${orderProductID} not found.`);
                continue;
            }

            const orderAmount = product[0].productPrice * productQ;

            // 插入訂單
            const [result] = await conn.query(
                `INSERT INTO orderlist (orderExist, orderProductID, productQ, buyerName, buyerEmail, buyerTel, buyerAddr, 
                 transportNote, orderDate, payment, receiptType, companyTitle, taxIDNumber, orderStatus, transactionID, orderAmount) 
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                [
                    orderExist, orderProductID, productQ, buyerName, buyerEmail, buyerTel, buyerAddr,
                    transportNote, orderDate, payment, receiptType, companyTitle, taxIDNumber, orderStatus, transactionID, orderAmount
                ]
            );
        }
        data = { message: `insert: ${transactionID}---OK` };

    } catch (err) {
        console.error("Error:", err);
        data = false;
    }

    return data;
});
