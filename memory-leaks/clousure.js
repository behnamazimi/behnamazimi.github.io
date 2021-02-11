var resFunc = null;
var intId = null

function parentDoSomething() {
  let var1 = 'x'
  let var2 = new Array(1000000).join(var1)

  return function childResult() {
    const res = var2.length > 100
    var2 = null
    return res
  }
}

function callClosure() {
  intId = setInterval(() => {
    resFunc = parentDoSomething()
  }, 50)
}

function removeClosures() {
  clearInterval(intId)
  if (resFunc) resFunc()
  resFunc = null
}
