import conn from "../../sql";

export default defineEventHandler(async (event) => {
    let data = "沒撈到";
    const body = await readBody(event);

    try {
        // 解析請求參數
        const { productID, productExist, productInStock, storeOnly, productMain } = body;

        // 動態建立 SQL 條件
        let query = "UPDATE product SET ";
        let params = [];
        let conditions = [];

        if (productExist !== undefined) {
            conditions.push("productExist = ?");
            params.push(productExist);
        }
        if (productInStock !== undefined) {
            conditions.push("productInStock = ?");
            params.push(productInStock);
        }
        if (storeOnly !== undefined) {
            conditions.push("storeOnly = ?");
            params.push(storeOnly);
        }
        if (productMain !== undefined) {
            conditions.push("productMain = ?");
            params.push(productMain);
        }

        if (conditions.length === 0) {
            return { message: "No fields to update" };
        }

        // 加上 WHERE 條件
        query += conditions.join(", ") + " WHERE productID = ?";
        params.push(productID);

        // 執行 SQL 更新
        const [updateResult] = await conn.query(query, params);

        if (updateResult.affectedRows > 0) {
            data = { message: `patch product ID = ${productID} --- OK` };
        } else {
            data = { message: `No record updated for productID: ${productID}` };
        }

    } catch (err) {
        console.error("Error:", err);
        data = false;
    }

    return data;
});
