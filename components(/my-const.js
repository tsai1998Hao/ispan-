export const API_SERVER = "http://localhost:3002";

export const AB_LIST = API_SERVER + "/address-book/api"; //method:get

export const AB_ADD = API_SERVER +"/address-book/add"; // method post


// 取得某一筆
//http://localhost:3002/address-book/api/edit/3
export const AB_GET_ONE = API_SERVER +"/address-book/api/edit"; // method GET
// 取得某一筆


// 修改某一筆
///address-book/edit/:article_id
export const AB_EDIT_ONE = API_SERVER +"/address-book/edit"; // method PUT
// 修改某一筆


//刪除某一筆
///address-book/:article_id
export const AB_DEL_ONE = API_SERVER +"/address-book"; // method DELETE
