import conn from "../../sql";

export default defineEventHandler(async (event) => {
    // console.log(event.node.req);
    let data = '沒撈到';

    if (event.node.req) {
        try {
            const {
                itemID,
                menuExist,
                itemName,
                itemType,
                itemDescribe,
                itemMain,
                itemPrice,
                itemImg,
            } = event.node.req.query;

            let query = "SELECT * FROM menuItem WHERE 1 = 1";
            let params = [];

            if (itemID) {
                query += " AND itemID = ?";
                params.push(itemID);
            }
            if (menuExist) {
                query += " AND menuExist = ?";
                params.push(menuExist);
            }
            if (itemName) {
                query += " AND itemName LIKE ?";
                params.push(`%${itemName}%`);
            }
            if (itemType) {
                query += " AND itemType LIKE ?";
                params.push(`%${itemType}%`);
            }
            if (itemDescribe) {
                query += " AND itemDescribe LIKE ?";
                params.push(`%${itemDescribe}%`);
            }
            if (itemMain) {
                query += " AND itemMain = ?";
                params.push(itemMain);
            }
            if (itemPrice) {
                query += " AND itemPrice = ?";
                params.push(itemPrice);
            }
            if (itemImg) {
                query += " AND itemImg LIKE ?";
                params.push(`%${itemImg}%`);
            }

            // console.log("Generated SQL Query:", query);
            console.log("Parameters:", params);

            // 執行查詢
            [data] = await conn.query(query, params);
            // console.log(data);

        } catch (err) {
            console.error("Error:", err);
            data = false;
        }
        
        return data;
    }
});
