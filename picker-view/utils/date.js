const date = new Date()
const nowYear = date.getFullYear()
const nowMonth = date.getMonth() + 1
const nowDay = date.getDate()
// 每月的天数
let daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

// 根据年月 获取当月的总天数
function getDays(year, month) {
  if (month === 2) {
    return ((year % 4 === 0) && ((year % 100) !== 0)) || (year % 400 === 0) ? 29 : 28
  } else {
    return daysInMonth[month - 1]
  }
}
 
// 根据年月日设置当前月有多少天 并更新年月日数组
function setDate(year, month, day, that) {

  let daysNum = year === nowYear && month === nowMonth ? nowDay : getDays(year, month)
  day = day > daysNum ? 1 : day
  let monthsNum = year === nowYear ? nowMonth : 12
  let years = []
  let months = []
  let days = []
  let yearIdx = 0
  let monthIdx = 0
  let dayIdx = 0
  // 重新设置年份列表
  for (let i = 1900; i <= nowYear; i++) {
    years.push(i)
  }
  years.map((v, idx) => {
    if (v === year) {
      yearIdx = idx
    }
  })
  // 重新设置月份列表
  for (let i = 1; i <= monthsNum; i++) {
    months.push(i)
  }
  months.map((v, idx) => {
    if (v === month) {
      monthIdx = idx
    }
  })
  // 重新设置日期列表
  for (let i = 1; i <= daysNum; i++) {
    days.push(i)
  }
  days.map((v, idx) => {
    if (v === day) {
      dayIdx = idx
    }
  })

  that.setData({
    years,//年份列表
    months,//月份列表
    days,//日期列表
    year,
    month: formatNumber(month),
    day: formatNumber(day),
    value: [yearIdx, monthIdx, dayIdx],
  })
  console.log(year, formatNumber(month), formatNumber(day), that.data.value)
}

function formatNumber(n){
  n = n.toString()
  return n[1] ? n : '0' + n
}
module.exports = {
  nowYear: nowYear,
  nowMonth: nowMonth,
  nowDay: nowDay,
  setDate: setDate,
  formatNumber: formatNumber
}
 