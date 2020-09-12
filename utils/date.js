import moment from "moment"

function formatDate(calendar) {
  return moment(calendar).format("YYYY-MM-DD")
}

export default {
  formatDate
}