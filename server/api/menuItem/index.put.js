import conn from "../../sql";

export default defineEventHandler(async (event) => {
    let data = "沒撈到";
    const body = await readBody(event);

    try {
        // 解析請求參數
        const {
            itemID,
            menuExist,
            itemName,
            itemType,
            itemDescribe,
            itemMain,
            itemPrice,
            itemImg
        } = body;

        // 更新 menuItem 資料
        const [result] = await conn.query(
            `UPDATE menuItem 
             SET menuExist = ?, itemName = ?, itemType = ?, itemDescribe = ?, 
                 itemMain = ?, itemPrice = ?, itemImg = ? 
             WHERE itemID = ?`,
            [menuExist, itemName, itemType, itemDescribe, itemMain, itemPrice, itemImg, itemID]
        );

        if (result.affectedRows > 0) {
            data = { message: `update: ${itemID} --- OK` };
        } else {
            data = { message: `No record updated for itemID: ${itemID}` };
        }

    } catch (err) {
        console.error("Error:", err);
        data = false;
    }

    return data;
});
