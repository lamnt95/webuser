import React from "react"

export default function Policy({ policy = "", userManual = "" }) {
   return <div className="policy">
      {userManual && < div className="policy-text">
         {userManual}
      </div>}
      {policy && <div className="policy-text">
         {policy}
      </div>}
   </div >
}