import React from "react"


export default function Map() {
  return <div style={{ height: '500px', width: '100%' }}>
    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3723.79330860507!2d105.84516391484718!3d21.040954685991736!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135abb992bd0a83%3A0x5c53118df4ba3f14!2zQsOhbmggQ-G7kW0gR2lhIFRydXnhu4FuIE5ndXnDqm4gSMawxqFuZw!5e0!3m2!1svi!2s!4v1600388232762!5m2!1svi!2s" 
    width="100%" height={500} frameBorder={0} style={{ border: 0 }} allowFullScreen aria-hidden="false" tabIndex={0} ></iframe>
  </div>
}