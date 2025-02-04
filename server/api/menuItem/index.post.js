import conn from "../../sql";

export default defineEventHandler(async (event) => {
    let data = "沒撈到";
    const body = await readBody(event); // 讀取 POST 資料

    try {
        // 解析請求參數
        const { menuExist, itemName, itemType, itemDescribe, itemMain, itemPrice, itemImg } = body;

        // 插入菜單項目
        const [result] = await conn.query(
            "INSERT INTO menuItem (menuExist, itemName, itemType, itemDescribe, itemMain, itemPrice, itemImg) VALUES (?, ?, ?, ?, ?, ?, ?)",
            [menuExist, itemName, itemType, itemDescribe, itemMain, itemPrice, itemImg]
        );

        // 取得新插入的 ID
        const itemID = result.insertId;

        data = { message: `insert: ${itemID}---OK` };

    } catch (err) {
        console.error("Error:", err);
        data = false;
    }

    return data;
});
