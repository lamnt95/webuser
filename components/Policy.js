import React from "react"

export default function Policy({ policy = "", userManual = "" }) {
   return <div className="policy">
      <div>
         {userManual && < div className="policy-text" dangerouslySetInnerHTML={{ __html: userManual }} />}
      </div>
      <div>
         {policy && <div className="policy-text" dangerouslySetInnerHTML={{ __html: policy }}></div>}
      </div>
      </div >
}