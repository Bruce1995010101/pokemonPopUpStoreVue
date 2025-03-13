import conn from "../../sql";

export default defineEventHandler(async (event) => {
    let data = "沒撈到";
    const body = await readBody(event);

    try {
        // 解析請求參數
        const {
            productExist,
            productName,
            productType,
            productDescribe,
            productPrice,
            productInStock,
            storeOnly,
            productMain,
            productImg
        } = body;
        // console.log(productImg);
        // console.log(typeof(productImg));

        // 插入產品資訊
        const [result] = await conn.query(
            `INSERT INTO product (productExist, productName, productType, productDescribe, 
                productPrice, productInStock, storeOnly, productMain) 
             VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            [productExist, productName, productType, productDescribe, productPrice, productInStock, storeOnly, productMain]
        );

        const productID = result.insertId;

        // 確保 productImg 是 JSON 格式的陣列
        let images = productImg;

        
        // try {
        //     images = JSON.parse(productImg);
        //     if (!Array.isArray(images)) {
        //         throw new Error("productImg is not an array");
        //     }
        // } catch (error) {
        //     console.error("JSON decode error:", error.message);
        //     return { error: "Invalid JSON format for productImg" };
        // }

        // 插入圖片
        for (const img of images) {
            if (img) {
                await conn.query(
                    `INSERT INTO productImg (imgProductID, productImg) VALUES (?, ?)`,
                    [productID, img]
                );
            }
        }

        data = { message: `insert: ${productID}---${productName}` };

    } catch (err) {
        console.error("Error:", err);
        data = false;
    }

    return data;
});
