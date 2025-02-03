import conn from "../../sql";

export default defineEventHandler(async (event) => {
    console.log(event.node.req);
    let data = '沒撈到';

    if (event.node.req) {
        try {
            const {
                productID,
                productExist,
                productName,
                productType,
                productDescribe,
                productPrice,
                productInStock,
                storeOnly,
                productMain
            } = event.node.req.query;

            // 建立 SQL 查詢
            let query = `SELECT * FROM product 
                         LEFT JOIN productImg ON product.productID = productImg.imgProductID 
                         WHERE 1 = 1`;
            let params = [];

            if (productID) {
                query += " AND productID = ?";
                params.push(productID);
            }
            if (productExist) {
                query += " AND productExist = ?";
                params.push(productExist);
            }
            if (productName) {
                query += " AND productName LIKE ?";
                params.push(`%${productName}%`);
            }
            if (productType) {
                query += " AND productType LIKE ?";
                params.push(`%${productType}%`);
            }
            if (productDescribe) {
                query += " AND productDescribe LIKE ?";
                params.push(`%${productDescribe}%`);
            }
            if (productPrice) {
                query += " AND productPrice = ?";
                params.push(productPrice);
            }
            if (productInStock) {
                query += " AND productInStock = ?";
                params.push(productInStock);
            }
            if (storeOnly) {
                query += " AND storeOnly = ?";
                params.push(storeOnly);
            }
            if (productMain) {
                query += " AND productMain = ?";
                params.push(productMain);
            }

            console.log("Generated SQL Query:", query);
            console.log("Parameters:", params);

            // 執行 SQL 查詢
            const [dataResult] = await conn.query(query, params);

            // 轉換為符合格式的 JSON 結構
            let products = {};

            for (const row of dataResult) {
                const pID = row.productID;

                if (!products[pID]) {
                    products[pID] = {
                        productID: row.productID,
                        productExist: row.productExist,
                        productName: row.productName,
                        productType: row.productType,
                        productDescribe: row.productDescribe,
                        productPrice: row.productPrice,
                        productInStock: row.productInStock,
                        storeOnly: row.storeOnly,
                        productMain: row.productMain,
                        productImg: []
                    };
                }

                if (row.imgId) {
                    products[pID].productImg.push({
                        imgId: row.imgId,
                        productImg: row.productImg
                    });
                }
            }

            data = Object.values(products); // 轉換為陣列格式

        } catch (err) {
            console.error("Error:", err);
            data = false;
        }

        // 回傳 JSON 結果
        return data;
    }
});
