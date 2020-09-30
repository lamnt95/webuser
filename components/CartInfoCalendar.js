import React, { useState, useMemo } from "react"
import { Input, Button } from 'semantic-ui-react'
import Calendar from 'react-calendar'
import utils from "../utils"


export default function CartInfoCalendar({ date, onChange }) {
  const [isShowCalendar, setIsShowCalendar] = useState(false);
  const [calendar, setCalendar] = useState(date);
  const onClickInput = () => {
    setIsShowCalendar(!isShowCalendar)
  }
  const onBlurInput = () => {
    setTimeout(() => {
      setIsShowCalendar(false)
    }, 200)
  }
  const onChooseDate = (value) => {
    setCalendar(value)
    onChange(value);
  }

  const calendarView = useMemo(() => utils.formatDate(calendar), [calendar])

  return <div className="cart_info_item_calendar" style={{ flexDirection: "row", display: "flex" }}>
    <Input type="text" id="DateFrom" value={calendarView} className="center" onClick={onClickInput} />
    {isShowCalendar && <Button style={{ marginLeft: "10px" }} onClick={onBlurInput}>X</Button>}
    {isShowCalendar && <div className="calendar">
      <Calendar
        onChange={onChooseDate}
        value={calendar}
      />
    </div>}
  </div>
}