import conn from "../../sql";

export default defineEventHandler(async (event) => {
    let data = "沒撈到";
    const body = await readBody(event);

    try {
        // 解析請求參數
        const { orderID, orderExist } = body;

        // 更新訂單狀態
        const [updateResult] = await conn.query(
            `UPDATE orderlist SET orderExist = ? WHERE orderID = ?`,
            [orderExist, orderID]
        );

        if (updateResult.affectedRows > 0) {
            data = { message: `更改訂單狀態 ${orderID} --- OK` };
        } else {
            data = { message: `No record updated for orderID: ${orderID}` };
        }

    } catch (err) {
        console.error("Error:", err);
        data = false;
    }

    return data;
});
