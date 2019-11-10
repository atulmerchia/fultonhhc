module.exports = {
  rand: x => Math.floor(Math.random() * x),
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
