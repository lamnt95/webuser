import _ from "lodash"

const errorMessageByCode = {
  "RC-1026": "Ngày đặt hàng không hợp lệ",
  "RC-1027": "Tên khách hàng không hợp lệ",
  "RC-1028": "Số điện thoại không hợp lệ",
  "RC-1029": "Loại địa chỉ không hợp lệ",
  "RC-1030": "Địa chỉ chi tiết không hợp lệ",
  "RC-1031": "Danh sách sản phẩm không hợp lệ",
  "RC-1032": "Mã sản phẩm không hợp lệ",
  "RC-1033": "Số lượng sản phẩm không hợp lệ",
  "RC-1034": "Giới tính không hợp lệ",
}

function getErrorMessage(field) {
  return errorMessageByCode[field] || "Thông tin đầu vào không hợp lệ"
}

export default {
  getErrorMessage
}