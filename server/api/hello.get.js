import conn from "../sql.js"

let data = null





export default defineEventHandler( async (event) => {
  // if (event.req.url === '/api/hello') {
  if (event.node.req) {
    console.log(event.node.req.query);
    console.log(typeof(event.node.req.query));

    await conn.query(`select * from userInfo where userTitle = 'IT'`,
      [],
      function (err, result) {
        console.log(result);
    
        if (result[0] !== undefined) {
          data = [{
            userAccount: result[0].userAccount,
            userName: result[0].userName,
            userEmail: result[0].userEmail,
          }]
        } else {
          data = false
        }
      })
    console.log('data:',data);
    return data
  }
})

