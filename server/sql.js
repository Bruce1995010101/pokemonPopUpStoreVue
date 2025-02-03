// import mysql from 'mysql';
import mysql from 'mysql2/promise';

// export default defineNitroPlugin(() => {
//   const conn = mysql.createPool({
//     host: 'localhost',
//     user: 'root',
//     password: '',
//     database: 'mfeeDB',
//     charset: 'utf8mb4',
//   });

//   return {
//     provide: {
//       db: conn,
//     },
//   };
// });

const conn = mysql.createPool({
    user: "root",
    password: '',
    host: 'localhost',
    port: 3306,
    database: 'mfeeDB'
})
// conn.connect(function (err) {
//     if (!err) {
//         console.log('共用sql連線成功');
//     } else {
//         console.log(err);
//     }
// })

export default conn