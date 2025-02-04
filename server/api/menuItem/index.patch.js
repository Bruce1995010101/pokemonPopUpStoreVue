import conn from "../../sql";

export default defineEventHandler(async (event) => {
    let data = "沒撈到";
    const body = await readBody(event);

    try {
        // 解析請求參數
        const { itemID, menuExist } = body;

        // 更新 menuItem 狀態
        const [updateResult] = await conn.query(
            `UPDATE menuItem SET menuExist = ? WHERE itemID = ?`,
            [menuExist, itemID]
        );

        if (updateResult.affectedRows > 0) {
            data = { message: `更改菜單狀態 ${itemID} --- OK` };
        } else {
            data = { message: `No record updated for itemID: ${itemID}` };
        }

    } catch (err) {
        console.error("Error:", err);
        data = false;
    }

    return data;
});
