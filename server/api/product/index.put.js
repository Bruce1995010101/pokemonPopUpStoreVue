import conn from "../../sql";

export default defineEventHandler(async (event) => {
    let data = "沒撈到";
    const body = await readBody(event);

    try {
        // 解析請求參數
        const {
            productID, productExist, productName, productType, productDescribe,
            productPrice, productInStock, storeOnly, productMain, productImg
        } = body;

        // 更新 product 資料
        const [updateResult] = await conn.query(
            `UPDATE product 
             SET productExist = ?, productName = ?, productType = ?, 
                 productDescribe = ?, productPrice = ?, productInStock = ?, 
                 storeOnly = ?, productMain = ? 
             WHERE productID = ?`,
            [
                productExist, productName, productType, productDescribe, 
                productPrice, productInStock, storeOnly, productMain, productID
            ]
        );

        // 刪除舊的 productImg
        await conn.query(`DELETE FROM productImg WHERE imgProductID = ?`, [productID]);

        // 新增 productImg
        if (Array.isArray(productImg)) {
            for (const img of productImg) {
                await conn.query(
                    `INSERT INTO productImg (imgProductID, productImg) VALUES (?, ?)`,
                    [productID, img]
                );
            }
        }

        if (updateResult.affectedRows > 0) {
            data = { message: `update: ${productID} --- OK` };
        } else {
            data = { message: `No record updated for productID: ${productID}` };
        }

    } catch (err) {
        console.error("Error:", err);
        data = false;
    }

    return data;
});
