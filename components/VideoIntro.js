import React from "react"

export default function VideoIntro({ videoIntro = "" }) {
   if(!videoIntro) return null;
   return <div className="video_intro">
      <div className="video_link">
         <iframe width="560" height="315" src={videoIntro} frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>      </div>
      <div className="video_link_text">
         Hương Nguyên 50 Hàng Than rất hân hạnh được phục vụ quý khách !
    </div>
   </div>
}