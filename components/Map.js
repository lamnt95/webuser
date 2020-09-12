import React from "react"

export default function Map() {
  return <div style={{ height: '500px', width: '100%' }}>
    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3723.745045938343!2d105.845112615474!3d21.04288498599075!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab4a086266df%3A0xc8dbbdc505ac0b46!2zQsOhbmggQ-G7kW0gTmd1ecOqbiBOaW5oIDExIEjDoG5nIFRoYW4gKEPGoSBz4bufIGNow61uaCBn4buRYyk!5e0!3m2!1svi!2s!4v1599082294192!5m2!1svi!2s" 
      width="100%" height={500} frameBorder={0} style={{ border: 0 }} allowFullScreen aria-hidden="false" tabIndex={0} />
  </div>
}