import conn from "../../sql"

export default defineEventHandler(async (event) => {
    // console.log(event.node.req);
    let data = '沒撈到'
    if (event.node.req) {
        try {
            const {
                userID,
                userAccount,
            } = event.node.req.query;
            // 基本SQL查詢
            let query = 'SELECT * FROM userInfo WHERE 1 = 1';
            const params = [];

            // 添加篩選條件
            if (userID !== undefined) {
                query += ' AND userID = ?';
                params.push(userID);
            }
            if (userAccount !== undefined) {
                query += ' AND userAccount LIKE ?';
                params.push(`%${userAccount}%`);
            }
            
            console.log('Generated SQL Query:', query);
            console.log('Parameters:', params);

            // 執行查詢
            [data] = await conn.query(query, params);
            // console.log(data);


        } catch (err) {
            console.error("Error:", err);
            data = false
        }
        // 回傳 JSON 結果
        return data

    }
})
