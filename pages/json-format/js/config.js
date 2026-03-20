/**
 * 配置和常量
 */

// 应用状态
export const state = {
  isBeautifyMode: true,
  currentData: null,
  currentRawOutput: '',
  isSorted: false
};

// 示例 JSON 数据
export const sampleJson = {
  "z_key": "D9mCnRmtEYhi0tAupmQnhjdB8TlRWRWMt1ZKM2GQPlu0X1uVXuPqrbxkat2mAa1imoLqmI4n0I44DdCv9bBYqV5LuNUaRD8ApruyCyIIzEXsg5BUNp8sRwFp4q0cKEyMQPOmg0vc88kVYgHAYiudqDIjMS3dGWKhmcoqldzK31Hlv5XuSw9Zt3zwAIjjniXwPnpxatRg0OJItI45JQXKpql1lMIsMtYn586lKqNKHwKGgZ4I6JGnoWQ7JKI3flISHRLF0n/rBj44PmVqYijAO986aAWI298nGisW+MDUdd0tTsYVzXV0AG9/q2Ip/WC6xcOMufGEczkzb2opXnJVCw==",
  "resp_code": "10000",
  "resp_msg": "请求成功",
  "resp_params": JSON.stringify({
    "wallet_act_info": {
      "wallet_act_no": "12602260000099579054",
      "wallet_act_balance": "0",
      "entity_card_no": "3569867843",
      "wallet_canbu_balance": "0"
    },
    "out_user_no": "61103679268260226165809030739139",
    "user_info": {
      "cert_no_secured": "",
      "cert_type": "0",
      "cert_no": "",
      "user_name": "罗世增",
      "campus": "0",
      "sex": "1",
      "class_id": "0",
      "class_admin_name": "",
      "face_user_id": "",
      "user_role": "1",
      "update_time": "2026-02-26 17:00:30",
      "user_mobile": "18878875434",
      "school_account": "2021030",
      "attach": "",
      "class_name": ""
    },
    "third_user_id": ""
  }),
  "a_item": "test",
  "number_test": 12345
};
