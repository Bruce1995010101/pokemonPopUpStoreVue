import conn from "../sql.js"

let data = null





export default defineEventHandler(async (event) => {

  if (event.node.req) {
    console.log(event.node.req.query);
    console.log(typeof (event.node.req.query));

    const [result] = await conn.query(`select * from userInfo where userTitle = 'IT'`, [])

    console.log(result);

    const data = result[0]

    return data
  }
})

