import conn from "../sql.js"

let data = null



export default defineEventHandler(async (event) => {
  if (event.node.req) {
    const method = event.node.req.method
    switch (method) {
      case 'GET':
        try {
          const {
            cafeBookingID,
            bookingExist,
            bookingDate,
            bookingTimePeriod,
            bookingNumber,
            bookingName,
            bookingEmail,
            bookingTel,
          } = req.query;

          let query = "SELECT * FROM cafeBooking WHERE 1 = 1";
          const params = [];

          if (cafeBookingID) {
            query += " AND cafeBookingID = ?";
            params.push(cafeBookingID);
          }
          if (bookingExist) {
            query += " AND bookingExist = ?";
            params.push(bookingExist);
          }
          if (bookingDate) {
            query += " AND bookingDate LIKE ?";
            params.push(`%${bookingDate}%`);
          }
          if (bookingTimePeriod) {
            query += " AND bookingTimePeriod LIKE ?";
            params.push(`%${bookingTimePeriod}%`);
          }
          if (bookingNumber) {
            query += " AND bookingNumber = ?";
            params.push(bookingNumber);
          }
          if (bookingName) {
            query += " AND bookingName LIKE ?";
            params.push(`%${bookingName}%`);
          }
          if (bookingEmail) {
            query += " AND bookingEmail LIKE ?";
            params.push(`%${bookingEmail}%`);
          }
          if (bookingTel) {
            query += " AND bookingTel LIKE ?";
            params.push(`%${bookingTel}%`);
          }

          const [rows] = await conn.query(query, params);
          res.json(rows);
        } catch (err) {
          console.error("Error:", err);
          res.status(500).json({ message: "Server error" });
        }
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

// GET: Fetch data
// app.get("/cafeBooking", async (req, res) => {
//   try {
//     const {
//       cafeBookingID,
//       bookingExist,
//       bookingDate,
//       bookingTimePeriod,
//       bookingNumber,
//       bookingName,
//       bookingEmail,
//       bookingTel,
//     } = req.query;

//     let query = "SELECT * FROM cafeBooking WHERE 1 = 1";
//     const params = [];

//     if (cafeBookingID) {
//       query += " AND cafeBookingID = ?";
//       params.push(cafeBookingID);
//     }
//     if (bookingExist) {
//       query += " AND bookingExist = ?";
//       params.push(bookingExist);
//     }
//     if (bookingDate) {
//       query += " AND bookingDate LIKE ?";
//       params.push(`%${bookingDate}%`);
//     }
//     if (bookingTimePeriod) {
//       query += " AND bookingTimePeriod LIKE ?";
//       params.push(`%${bookingTimePeriod}%`);
//     }
//     if (bookingNumber) {
//       query += " AND bookingNumber = ?";
//       params.push(bookingNumber);
//     }
//     if (bookingName) {
//       query += " AND bookingName LIKE ?";
//       params.push(`%${bookingName}%`);
//     }
//     if (bookingEmail) {
//       query += " AND bookingEmail LIKE ?";
//       params.push(`%${bookingEmail}%`);
//     }
//     if (bookingTel) {
//       query += " AND bookingTel LIKE ?";
//       params.push(`%${bookingTel}%`);
//     }

//     const [rows] = await pool.query(query, params);
//     res.json(rows);
//   } catch (err) {
//     console.error("Error:", err);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// // POST: Insert data
// app.post("/cafeBooking", async (req, res) => {
//   try {
//     const {
//       bookingExist,
//       bookingTimePeriod,
//       bookingNumber,
//       bookingName,
//       bookingEmail,
//       bookingTel,
//     } = req.body;

//     const bookingDate = new Date().toISOString().slice(0, 19).replace("T", " ");

//     const query = `
//       INSERT INTO cafeBooking
//       (bookingExist, bookingDate, bookingTimePeriod, bookingNumber, bookingName, bookingEmail, bookingTel)
//       VALUES (?, ?, ?, ?, ?, ?, ?)
//     `;
//     const params = [
//       bookingExist,
//       bookingDate,
//       bookingTimePeriod,
//       bookingNumber,
//       bookingName,
//       bookingEmail,
//       bookingTel,
//     ];

//     const [result] = await pool.execute(query, params);
//     res.json({ message: `Inserted: ${result.insertId} --- OK` });
//   } catch (err) {
//     console.error("Error:", err);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// // DELETE: Delete data
// app.delete("/cafeBooking", async (req, res) => {
//   try {
//     const { cafeBookingID } = req.body;

//     const query = "DELETE FROM cafeBooking WHERE cafeBookingID = ?";
//     const params = [cafeBookingID];

//     await pool.execute(query, params);
//     res.json({ message: `Deleted: ${cafeBookingID} --- OK` });
//   } catch (err) {
//     console.error("Error:", err);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// // PUT: Update entire record
// app.put("/cafeBooking", async (req, res) => {
//   try {
//     const {
//       cafeBookingID,
//       bookingExist,
//       bookingDate,
//       bookingTimePeriod,
//       bookingNumber,
//       bookingName,
//       bookingEmail,
//       bookingTel,
//     } = req.body;

//     const query = `
//       UPDATE cafeBooking
//       SET bookingExist = ?, bookingDate = ?, bookingTimePeriod = ?, bookingNumber = ?,
//           bookingName = ?, bookingEmail = ?, bookingTel = ?
//       WHERE cafeBookingID = ?
//     `;
//     const params = [
//       bookingExist,
//       bookingDate,
//       bookingTimePeriod,
//       bookingNumber,
//       bookingName,
//       bookingEmail,
//       bookingTel,
//       cafeBookingID,
//     ];

//     await pool.execute(query, params);
//     res.json({ message: `Updated: ${cafeBookingID} --- OK` });
//   } catch (err) {
//     console.error("Error:", err);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// // PATCH: Partially update record
// app.patch("/cafeBooking", async (req, res) => {
//   try {
//     const { cafeBookingID, bookingExist } = req.body;

//     const query = "UPDATE cafeBooking SET bookingExist = ? WHERE cafeBookingID = ?";
//     const params = [bookingExist, cafeBookingID];

//     await pool.execute(query, params);
//     res.json({ message: `Updated status: ${cafeBookingID} --- OK` });
//   } catch (err) {
//     console.error("Error:", err);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// // Start the server
// app.listen(3000, () => {
//   console.log("Server is running on port 3000");
// });
