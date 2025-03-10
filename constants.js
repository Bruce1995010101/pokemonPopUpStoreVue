export const baseUrl = "http://localhost:3000";
export const menuItem = {
    tableDataTitle: [
        {
            title: { eng: "itemID", cht: "餐點編號" },
            type: "number",
            style: { align: "center" },
        },
        {
            title: { eng: "itemImg", cht: "餐點圖片" },
            type: "image",
            style: { align: "center" },
        },
        {
            title: { eng: "itemName", cht: "餐點名稱" },
            type: "string",
            style: { align: "left" },
        },
        {
            title: { eng: "itemType", cht: "餐點類型" },
            type: "select",
            style: { align: "center" },
            option: [
                { value: "飲品", text: "飲品" },
                { value: "主餐", text: "主餐" },
                { value: "甜點", text: "甜點" },
            ],
        },
        {
            title: { eng: "itemMain", cht: "首頁呈現品項" },
            type: "select",
            style: { align: "center" },
            option: [
                { value: 1, text: "首頁呈現品項" },
                { value: 0, text: "非首頁呈現品項" },
            ],
        },
        {
            title: { eng: "itemPrice", cht: "餐點價格" },
            type: "number",
            style: { align: "center" },
        },
        {
            title: { eng: "itemDescribe", cht: "餐點描述" },
            type: "string",
            style: { align: "left" },
        },
    ],
    dataList: [
        {
            type: "inputTextID",
            title: { eng: "itemID", cht: "餐點編號" },
            display: { filter: true, UICreate: false, UIEdit: true, table: true },
        },
        {
            type: "select",
            title: { eng: "menuExist", cht: "餐點狀況" },
            option: [
                { value: 1, text: "上架餐點" },
                { value: 0, text: "下架餐點" },
            ],
            display: { filter: false, UICreate: true, UIEdit: true, table: false },
        },
        {
            type: "inputText",
            title: { eng: "itemName", cht: "餐點名稱" },
            display: { filter: true, UICreate: true, UIEdit: true, table: true },
        },
        {
            type: "select",
            title: { eng: "itemType", cht: "餐點類型" },
            option: [
                { value: "飲品", text: "飲品" },
                { value: "主餐", text: "主餐" },
                { value: "甜點", text: "甜點" },
            ],
            display: { filter: true, UICreate: true, UIEdit: true, table: true },
        },
        {
            type: "inputText",
            title: { eng: "itemDescribe", cht: "餐點描述" },
            display: { filter: true, UICreate: true, UIEdit: true, table: true },
        },
        {
            type: "select",
            title: { eng: "itemMain", cht: "首頁呈現品項" },
            option: [
                { value: 1, text: "首頁呈現品項" },
                { value: 0, text: "非首頁呈現品項" },
            ],
            display: { filter: true, UICreate: true, UIEdit: true, table: true },
        },
        {
            type: "inputNumber",
            title: { eng: "itemPrice", cht: "餐點價格" },
            display: { filter: true, UICreate: true, UIEdit: true, table: true },
        },
        {
            type: "inputImgSingle",
            title: { eng: "itemImg", cht: "餐點圖片" },
            display: { filter: false, UICreate: true, UIEdit: true, table: true },
        },
    ],
    removeUIText: {
        titleText: "確定使該品項下架？",
    },
    onUIText: {
        titleText: "確定使該品項上架？",
    }
}
export const account = {
    tableDataTitle: [
        {
          title: { eng: "userID", cht: "管理者編號" },
          type: "number",
          style: { align: "center" },
        },
        {
          title: { eng: "userName", cht: "姓名" },
          type: "string",
          style: { align: "center" },
        },
        {
          title: { eng: "userAccount", cht: "帳號" },
          type: "string",
          style: { align: "center" },
        },
        {
          title: { eng: "userTitle", cht: "職稱" },
          type: "number",
          style: { align: "center" },
        },
        {
          title: { eng: "userEmail", cht: "信箱" },
          type: "string",
          style: { align: "left" },
        },
      ],
    dataList: [
        {
          type: "inputTextID",
          title: { eng: "userID", cht: "管理者編號" },
          display: { filter: true, UICreate: false, UIEdit: true, table: true },
        },
        {
          type: "select",
          title: { eng: "userExist", cht: "帳號狀態" },
          option: [
            { value: 1, text: "有效帳號" },
            { value: 0, text: "無效帳號" },
          ],
          display: { filter: false, UICreate: true, UIEdit: true, table: false },
        },
        {
          type: "inputText",
          title: { eng: "userAccount", cht: "帳號" },
          display: { filter: true, UICreate: true, UIEdit: true, table: false },
        },
        {
          type: "inputPassword",
          title: { eng: "userPassword", cht: "密碼" },
          display: { filter: false, UICreate: true, UIEdit: true, table: false },
        },
        {
          type: "inputText",
          title: { eng: "userName", cht: "管理者姓名" },
          display: { filter: true, UICreate: true, UIEdit: true, table: false },
        },
        {
          type: "inputText",
          title: { eng: "userTitle", cht: "職稱" },
          display: { filter: true, UICreate: true, UIEdit: true, table: false },
        },
        {
          type: "inputText",
          title: { eng: "userEmail", cht: "信箱" },
          display: { filter: true, UICreate: true, UIEdit: true, table: false },
        },
      ],
    removeUIText: {
        titleText: "確定使該管理者帳號無效？",
    },
    onUIText: {
        titleText: "確定使該管理者帳號無效？",
    }
}
export const cafeBooking = {
    tableDataTitle: [
        {
          title: { eng: "cafeBookingID", cht: "預定編號" },
          type: "number",
          style: { align: "center" },
        },
        {
          title: { eng: "bookingTimePeriod", cht: "預定時段" },
          type: "time",
          style: { align: "center" },
        },
        {
          title: { eng: "bookingDate", cht: "下訂日期" },
          type: "time",
          style: { align: "center" },
        },
        {
          title: { eng: "bookingNumber", cht: "預定人數" },
          type: "number",
          style: { align: "center" },
        },
        {
          title: { eng: "bookingName", cht: "預約姓名" },
          type: "string",
          style: { align: "center" },
        },
        {
          title: { eng: "bookingEmail", cht: "信箱" },
          type: "string",
          style: { align: "left" },
        },
        {
          title: { eng: "bookingTel", cht: "電話" },
          type: "string",
          style: { align: "center" },
        },
      ],
    dataList: [
        {
          type: "inputTextID",
          title: { eng: "cafeBookingID", cht: "預定編號" },
          display: { filter: true, UICreate: false, UIEdit: true, table: true },
        },
        {
          type: "select",
          title: { eng: "bookingExist", cht: "預定狀況" },
          option: [
            { value: 1, text: "有效預定" },
            { value: 0, text: "無效預定" },
          ],
          display: { filter: false, UICreate: true, UIEdit: true, table: false },
        },
        {
          type: "timeOption",
          title: { eng: "bookingTimePeriod", cht: "預定時段" },
          timeOption: [
            {text: '10:00', value: '10'},
            {text: '11:00', value: '11'},
            {text: '12:00', value: '12'},
            {text: '13:00', value: '13'},
            {text: '14:00', value: '14'},
            {text: '15:00', value: '15'},
            {text: '16:00', value: '16'},
          ],
          display: { filter: true, UICreate: true, UIEdit: true, table: true },
        },
        {
          type: "timeInput",
          title: { eng: "bookingDate", cht: "下訂日期" },
          display: { filter: true, UICreate: false, UIEdit: true, table: true },
          timeOption: [
            {text: '00:00', value: '00'},
            {text: '01:00', value: '01'},
            {text: '02:00', value: '02'},
            {text: '03:00', value: '03'},
            {text: '04:00', value: '04'},
            {text: '05:00', value: '05'},
            {text: '06:00', value: '06'},
            {text: '07:00', value: '07'},
            {text: '08:00', value: '08'},
            {text: '09:00', value: '09'},
            {text: '10:00', value: '10'},
            {text: '11:00', value: '11'},
            {text: '12:00', value: '12'},
            {text: '13:00', value: '13'},
            {text: '14:00', value: '14'},
            {text: '15:00', value: '15'},
            {text: '16:00', value: '16'},
            {text: '17:00', value: '17'},
            {text: '18:00', value: '18'},
            {text: '19:00', value: '19'},
            {text: '20:00', value: '20'},
            {text: '21:00', value: '21'},
            {text: '22:00', value: '22'},
            {text: '23:00', value: '23'},
          ],
        },
        {
          type: "inputNumber",
          title: { eng: "bookingNumber", cht: "預定人數" },
          display: { filter: true, UICreate: true, UIEdit: true, table: true },
        },
        {
          type: "inputText",
          title: { eng: "bookingName", cht: "預約姓名" },
          display: { filter: true, UICreate: true, UIEdit: true, table: false },
        },
        {
          type: "inputText",
          title: { eng: "bookingEmail", cht: "信箱" },
          display: { filter: true, UICreate: true, UIEdit: true, table: false },
        },
        {
          type: "inputText",
          title: { eng: "bookingTel", cht: "電話" },
          display: { filter: true, UICreate: true, UIEdit: true, table: false },
        },
      ],
    removeUIText: {
        titleText: "確定使該筆預定無效？",
    },
    onUIText: {
        titleText: "確定使該預筆定無效？",
    }
}
export const orderList = {
    tableDataTitle: [
        {
          title: { eng: "orderID", cht: "資料ID" },
          type: "number",
          style: { align: "center" },
        },
        {
          title: { eng: "transactionID", cht: "訂單編號" },
          type: "number",
          style: { align: "center" },
        },
        {
          title: { eng: "orderStatus", cht: "訂單狀態" },
          type: "select",
          style: { align: "center" },
          option: [
            { value: 0, text: "訂單接收" },
            { value: 1, text: "待出貨" },
            { value: 2, text: "已出貨" },
          ],
        },
        {
          title: { eng: "productName", cht: "商品名稱" },
          type: "string",
          style: { align: "center" },
        },
        {
          title: { eng: "productQ", cht: "商品數量" },
          type: "number",
          style: { align: "center" },
        },
        {
          title: { eng: "orderAmount", cht: "單品總價" },
          type: "number",
          style: { align: "center" },
        },
        {
          title: { eng: "buyerName", cht: "買家姓名" },
          type: "string",
          style: { align: "center" },
        },
        {
          title: { eng: "buyerEmail", cht: "信箱" },
          type: "string",
          style: { align: "left" },
        },
        {
          title: { eng: "buyerTel", cht: "電話" },
          type: "string",
          style: { align: "center" },
        },
        {
          title: { eng: "buyerAddr", cht: "地址" },
          type: "string",
          style: { align: "left" },
        },
        {
          title: { eng: "orderDate", cht: "訂單日期" },
          type: "time",
          style: { align: "center" },
        },
        {
          title: { eng: "payment", cht: "付款方式" },
          type: "select",
          style: { align: "center" },
          option: [
            { value: "貨到付款", text: "貨到付款" },
            { value: "線上刷卡", text: "線上刷卡" },
          ],
        },
        {
          title: { eng: "receiptType", cht: "發票類別" },
          type: "select",
          style: { align: "center" },
          option: [
            { value: "三聯式", text: "三聯式" },
            { value: "二聯式", text: "二聯式" },
          ],
        },
        {
          title: { eng: "companyTitle", cht: "公司名稱" },
          type: "string",
          style: { align: "left" },
        },
        {
          title: { eng: "taxIDNumber", cht: "統一編號" },
          type: "string",
          style: { align: "center" },
        },
        {
          title: { eng: "transportNote", cht: "物流備註" },
          type: "string",
          style: { align: "center" },
        },
      ],
    dataList: [
        {
          type: "inputTextID",
          title: { eng: "orderID", cht: "資料ID" },
          display: { filter: true, UICreate: false, UIEdit: true, table: true },
        },
        {
          type: "inputText",
          title: { eng: "transactionID", cht: "訂單編號" },
          display: { filter: true, UICreate: false, UIEdit: true, table: true },
        },
        {
          type: "select",
          title: { eng: "orderExist", cht: "訂單狀況" },
          option: [
            { value: 1, text: "有效訂單" },
            { value: 0, text: "無效訂單" },
          ],
          display: { filter: false, UICreate: true, UIEdit: true, table: false },
        },
        {
          type: "mutipleInput",
          title: [
            { eng: "orderProductID", cht: "產品ID" },
            { eng: "productQ", cht: "產品數量" },
          ],
          display: { filter: false, UICreate: true, UIEdit: true, table: false },
        },
        {
          type: "inputText",
          title: { eng: "productID", cht: "產品ID" },
          display: { filter: true, UICreate: false, UIEdit: false, table: false },
        },
        {
          type: "inputText",
          title: { eng: "buyerName", cht: "客戶名稱" },
          display: { filter: true, UICreate: true, UIEdit: true, table: false },
        },
        {
          type: "inputText",
          title: { eng: "buyerEmail", cht: "客戶信箱" },
          display: { filter: true, UICreate: true, UIEdit: true, table: false },
        },
        {
          type: "inputText",
          title: { eng: "buyerTel", cht: "客戶電話" },
          display: { filter: true, UICreate: true, UIEdit: true, table: false },
        },
        {
          type: "inputText",
          title: { eng: "buyerAddr", cht: "客戶地址" },
          display: { filter: true, UICreate: true, UIEdit: true, table: false },
        },
        {
          title: { eng: "orderDate", cht: "訂單日期" },
          type: "timeInput",
          style: { align: "center" },
          display: { filter: true, UICreate: false, UIEdit: true, table: false },
          timeOption: [
            {text: '00:00', value: '00'},
            {text: '01:00', value: '01'},
            {text: '02:00', value: '02'},
            {text: '03:00', value: '03'},
            {text: '04:00', value: '04'},
            {text: '05:00', value: '05'},
            {text: '06:00', value: '06'},
            {text: '07:00', value: '07'},
            {text: '08:00', value: '08'},
            {text: '09:00', value: '09'},
            {text: '10:00', value: '10'},
            {text: '11:00', value: '11'},
            {text: '12:00', value: '12'},
            {text: '13:00', value: '13'},
            {text: '14:00', value: '14'},
            {text: '15:00', value: '15'},
            {text: '16:00', value: '16'},
            {text: '17:00', value: '17'},
            {text: '18:00', value: '18'},
            {text: '19:00', value: '19'},
            {text: '20:00', value: '20'},
            {text: '21:00', value: '21'},
            {text: '22:00', value: '22'},
            {text: '23:00', value: '23'},
          ],
        },
        {
          type: "inputText",
          title: { eng: "transportNote", cht: "物流備註" },
          display: { filter: true, UICreate: true, UIEdit: true, table: false },
        },
        {
          type: "select",
          title: { eng: "payment", cht: "付款方式" },
          option: [
            { value: "貨到付款", text: "貨到付款" },
            { value: "線上刷卡", text: "線上刷卡" },
          ],
          display: { filter: true, UICreate: true, UIEdit: true, table: false },
        },
        {
          type: "select",
          title: { eng: "receiptType", cht: "發票類型" },
          option: [
            { value: "二聯式", text: "二聯式" },
            { value: "三聯式", text: "三聯式" },
          ],
          display: { filter: true, UICreate: true, UIEdit: true, table: false },
        },
        {
          type: "inputText",
          title: { eng: "companyTitle", cht: "公司名稱" },
          display: { filter: true, UICreate: true, UIEdit: true, table: false },
        },
        {
          type: "inputText",
          title: { eng: "taxIDNumber", cht: "統一編號" },
          display: { filter: true, UICreate: true, UIEdit: true, table: false },
        },
        {
          type: "select",
          title: { eng: "orderStatus", cht: "訂單狀態" },
          option: [
            { value: 0, text: "訂單接收" },
            { value: 1, text: "待出貨" },
            { value: 2, text: "已出貨" },
          ],
          display: { filter: true, UICreate: true, UIEdit: true, table: false },
        },
      
      ],
    removeUIText: {
        titleText: "確定使該筆訂單有效？",
    },
    onUIText: {
        titleText: "確定使該筆訂單有效？",
    }
}
export const product = {
    tableDataTitle: [
        {
          title: { eng: "productID", cht: "商品編號" },
          type: "number",
          style: { align: "center" },
        },
        {
          title: { eng: "productName", cht: "商品名稱" },
          type: "string",
          style: { align: "center" },
        },
        {
          title: { eng: "productType", cht: "商品類型" },
          type: "select",
          style: { align: "center" },
          option: [
            { value: "decoration", text: "家飾用品" },
            { value: "jewelry", text: "珠寶首飾" },
            { value: "model", text: "模型" },
            { value: "stationery", text: "文具、文創" },
            { value: "toy", text: "玩具、玩偶" },
          ]
        },
        {
          title: { eng: "productPrice", cht: "商品價格" },
          type: "number",
          style: { align: "center" },
        },
        {
          title: { eng: "productInStock", cht: "庫存" },
          type: "number",
          style: { align: "center" },
        },
        {
          title: { eng: "storeOnly", cht: "快閃店限定" },
          type: "select",
          style: { align: "center" },
          option: [
            { value: 1, text: "V" },
            { value: 0, text: "X" },
          ],
        },
        {
          title: { eng: "productMain", cht: "首頁呈現商品" },
          type: "select",
          style: { align: "center" },
          option: [
            { value: 1, text: "首頁呈現商品" },
            { value: 0, text: "非首頁呈現商品" },
          ],
        },
        {
          title: { eng: "productDescribe", cht: "商品描述" },
          type: "string",
          style: { align: "left" },
        },
      ],
    dataList: [
        {
          type: "inputTextID",
          title: { eng: "productID", cht: "商品編號" },
          display: { filter: true, UICreate: false, UIEdit: true, table: true },
        },
        {
          type: "select",
          title: { eng: "productExist", cht: "商品狀況" },
          option: [
            { value: 1, text: "上架商品" },
            { value: 0, text: "下架商品" },
          ],
          display: { filter: false, UICreate: true, UIEdit: true, table: false },
        },
        {
          type: "inputText",
          title: { eng: "productName", cht: "商品名稱" },
          display: { filter: true, UICreate: true, UIEdit: true, table: true },
        },
        {
          type: "select",
          title: { eng: "productType", cht: "商品類型" },
          option: [
            { value: "decoration", text: "家飾用品" },
            { value: "jewelry", text: "珠寶首飾" },
            { value: "model", text: "模型" },
            { value: "stationery", text: "文具、文創" },
            { value: "toy", text: "玩具、玩偶" },
          ],
          display: { filter: true, UICreate: true, UIEdit: true, table: true },
        },
        {
          type: "inputText",
          title: { eng: "productDescribe", cht: "商品描述" },
          display: { filter: true, UICreate: true, UIEdit: true, table: true },
        },
        {
          type: "inputNumber",
          title: { eng: "productPrice", cht: "商品價格" },
          display: { filter: true, UICreate: true, UIEdit: true, table: true },
        },
        {
          type: "inputNumber",
          title: { eng: "productInStock", cht: "庫存" },
          display: { filter: true, UICreate: true, UIEdit: true, table: true },
        },
        {
          type: "select",
          title: { eng: "storeOnly", cht: "快閃店限定" },
          option: [
            { value: 1, text: "快閃店限定" },
            { value: 0, text: "非快閃店限定" },
          ],
          display: { filter: true, UICreate: true, UIEdit: true, table: true },
        },
        {
          type: "select",
          title: { eng: "productMain", cht: "首頁呈現商品" },
          option: [
            { value: 1, text: "首頁呈現商品" },
            { value: 0, text: "非首頁呈現商品" },
          ],
          display: { filter: true, UICreate: true, UIEdit: true, table: true },
        },
        {
          type: "inputImgMutiple",
          title: { eng: "productImg", cht: "圖片連結" },
          display: { filter: false, UICreate: true, UIEdit: true, table: true },
        },
      ],
    removeUIText: {
        titleText: "確定使該商品下架？",
    },
    onUIText: {
        titleText: "確定使該商品上架？",
    }
}
export const storeBooking = {
    tableDataTitle: [
        {
          title: { eng: "storeBookingID", cht: "預定編號" },
          type: "number",
          style: { align: "center" },
        },
        {
          title: { eng: "bookingTimePeriod", cht: "預定時段" },
          type: "time",
          style: { align: "center" },
        },
        {
          title: { eng: "bookingDate", cht: "下訂日期" },
          type: "time",
          style: { align: "center" },
        },
        {
          title: { eng: "bookingNumber", cht: "預定人數" },
          type: "number",
          style: { align: "center" },
        },
        {
          title: { eng: "bookingName", cht: "預約姓名" },
          type: "string",
          style: { align: "center" },
        },
        {
          title: { eng: "bookingEmail", cht: "信箱" },
          type: "string",
          style: { align: "left" },
        },
        {
          title: { eng: "bookingTel", cht: "電話" },
          type: "string",
          style: { align: "center" },
        },
      ],
    dataList: [
        {
          type: "inputTextID",
          title: { eng: "storeBookingID", cht: "預定編號" },
          display: { filter: true, UICreate: false, UIEdit: true, table: true },
        },
        {
          type: "select",
          title: { eng: "storeBookingExist", cht: "預定狀況" },
          option: [
            { value: 1, text: "有效預定" },
            { value: 0, text: "無效預定" },
          ],
          display: { filter: false, UICreate: true, UIEdit: true, table: false },
        },
        {
          type: "timeOption",
          title: { eng: "bookingTimePeriod", cht: "預定時段" },
          timeOption: [
            {text: '10:00', value: '10'},
            {text: '11:00', value: '11'},
            {text: '12:00', value: '12'},
            {text: '13:00', value: '13'},
            {text: '14:00', value: '14'},
            {text: '15:00', value: '15'},
            {text: '16:00', value: '16'},
          ],
          display: { filter: true, UICreate: true, UIEdit: true, table: true },
        },
        {
          type: "timeInput",
          title: { eng: "bookingDate", cht: "下訂日期" },
          display: { filter: true, UICreate: false, UIEdit: true, table: true },
          timeOption: [
            {text: '00:00', value: '00'},
            {text: '01:00', value: '01'},
            {text: '02:00', value: '02'},
            {text: '03:00', value: '03'},
            {text: '04:00', value: '04'},
            {text: '05:00', value: '05'},
            {text: '06:00', value: '06'},
            {text: '07:00', value: '07'},
            {text: '08:00', value: '08'},
            {text: '09:00', value: '09'},
            {text: '10:00', value: '10'},
            {text: '11:00', value: '11'},
            {text: '12:00', value: '12'},
            {text: '13:00', value: '13'},
            {text: '14:00', value: '14'},
            {text: '15:00', value: '15'},
            {text: '16:00', value: '16'},
            {text: '17:00', value: '17'},
            {text: '18:00', value: '18'},
            {text: '19:00', value: '19'},
            {text: '20:00', value: '20'},
            {text: '21:00', value: '21'},
            {text: '22:00', value: '22'},
            {text: '23:00', value: '23'},
          ],
        },
        {
          type: "inputNumber",
          title: { eng: "bookingNumber", cht: "預定人數" },
          display: { filter: true, UICreate: true, UIEdit: true, table: true },
        },
        {
          type: "inputText",
          title: { eng: "bookingName", cht: "預約姓名" },
          display: { filter: true, UICreate: true, UIEdit: true, table: false },
        },
        {
          type: "inputText",
          title: { eng: "bookingEmail", cht: "信箱" },
          display: { filter: true, UICreate: true, UIEdit: true, table: false },
        },
        {
          type: "inputText",
          title: { eng: "bookingTel", cht: "電話" },
          display: { filter: true, UICreate: true, UIEdit: true, table: false },
        },
      ],
    removeUIText: {
        titleText: "確定使該筆預定無效？",
    },
    onUIText: {
        titleText: "確定使該筆預定無效？",
    }
}
