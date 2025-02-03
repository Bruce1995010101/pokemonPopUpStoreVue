import conn from "../sql.js"

let data = null



export default defineEventHandler(async (event) => {
    if (event.node.req) {
        const method = event.node.req.method
        switch (method) {
            case 'GET':
                console.log(method);
                const {
                    userID,
                    userExist,
                    userName,
                    userAccount,
                    userPassword,
                    userTitle,
                    userEmail,
                } = event.node.req.query;

                // 使用者輸入類型檢驗
                // if(typeof(userID) !== 'number' | typeof(userID) !== 'undefined'){
                //     console.log('wrong data type');
                //     break
                // }  


                // 基本SQL查詢
                let query = 'SELECT * FROM userInfo WHERE 1 = 1';
                const params = [];

                // 添加篩選條件
                if (userID !== undefined) {
                    query += ' AND userID = ?';
                    params.push(userID);
                }
                if (userExist !== undefined) {
                    query += ' AND userExist = ?';
                    params.push(userExist);
                }
                if (userName !== undefined) {
                    query += ' AND userName LIKE ?';
                    params.push(`%${userName}%`);
                }
                if (userAccount !== undefined) {
                    query += ' AND userAccount LIKE ?';
                    params.push(`%${userAccount}%`);
                }
                if (userPassword !== undefined) {
                    query += ' AND userPassword LIKE ?';
                    params.push(`%${userPassword}%`);
                }
                if (userTitle !== undefined) {
                    query += ' AND userTitle LIKE ?';
                    params.push(userTitle);
                }
                if (userEmail !== undefined) {
                    query += ' AND userEmail LIKE ?';
                    params.push(`%${userEmail}%`);
                }

                console.log('Generated SQL Query:', query);
                console.log('Parameters:', params);

                // 執行查詢
                await conn.query(query, params, (error, results) => {
                    if (error) {
                        console.error('Database Error:', error);
                        return;
                    }
                    data = JSON.stringify(results)
                    console.log('Data:',data);
                });
                // 回傳 JSON 結果
                return data

            case 'POST':
                console.log(method);

                break;
            case 'PUT':
                console.log(method);

                break;
            case 'DELETE':
                console.log(method);

                break;
            case 'PATCH':
                console.log(method);

                break;


            default:
                console.log('Wrong Method Get Account Data');

                break;
        }
    }
})