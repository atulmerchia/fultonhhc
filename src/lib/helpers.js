module.exports = {
  rand: x => Math.floor(Math.random() * x),
  dayNum: obj => Math.ceil((isNaN(obj) ? Date.parse(obj.dateTime || obj) : obj) / 86400000),
  formatDay: day => (new Date(day*86400000)).toLocaleDateString('en-us', { weekday: 'long',  month: 'short', day: 'numeric'}),
  formatTime: date => (new Date(date)).toLocaleTimeString('en-us', { minute: 'numeric', hour: 'numeric' }),
  formatDollar: num => `$${Number(num/100).toFixed(2)}`,
  num2phone: x => {
    x = `${x}`.replace(/\D/g, "").substring(0, 10);
    return x.length === 0
    ? x
    : x.length < 4
    ? `(${x}`
    : x.length < 7
    ? `(${x.slice(0,3)}) ${x.slice(3)}`
    : `(${x.slice(0,3)}) ${x.slice(3,6)} - ${x.slice(6)}`
  }
}
