import React from "react"
import FacebookFanpage from "./FacebookFanpage"

export default function Footer() {
  return <div className="footer">
    <div className="footer_block">
      <div className="footer_block_title">
        Giờ mở cửa
      </div>
      <div className="footer_block_content">
        <div className="footer_block_date">Thứ hai</div>
        <div className="footer_block_time">7:30 - 20:00</div>
      </div>
      <div className="footer_block_content">
        <div className="footer_block_date">Thứ ba</div>
        <div className="footer_block_time">7:30 - 20:00</div>
      </div>
      <div className="footer_block_content">
        <div className="footer_block_date">Thứ tư</div>
        <div className="footer_block_time">7:30 - 20:00</div>
      </div>
      <div className="footer_block_content">
        <div className="footer_block_date">Thứ năm</div>
        <div className="footer_block_time">7:30 - 20:00</div>
      </div>
      <div className="footer_block_content">
        <div className="footer_block_date">Thứ sáu</div>
        <div className="footer_block_time">7:30 - 20:00</div>
      </div>
      <div className="footer_block_content">
        <div className="footer_block_date">Thứ bảy</div>
        <div className="footer_block_time">7:30 - 20:00</div>
      </div>
      <div className="footer_block_content">
        <div className="footer_block_date">Chủ nhật</div>
        <div className="footer_block_time">7:30 - 20:00</div>
      </div>
    </div>
    <div className="footer_block">
      <div className="footer_block_title">
        Liên hệ
      </div>
      <div className="footer_block_contact_wrapper">
        <div className="footer_block_contact">
          <i className="fas fa-map-marker-alt icon-address" />
          <div className="footer_block_contact_text">CỬA HÀNG BÁNH CỐM NGUYÊN HƯƠNG</div>
        </div>
        <div className="footer_block_contact">
          <i className="fas fa-phone-alt icon-phone" />
          <div className="footer_block_contact_text">0816.97.99.86</div>
        </div>
        <div className="footer_block_contact">
          <i className="fas fa-envelope icon-address" />
          <div className="footer_block_contact_text">https://www.facebook.com/nguyenhuongbakery50hangthan/</div>
        </div>
      </div>
    </div>
    <div className="footer_block_facebook">
      <FacebookFanpage />
    </div>
  </div>
}