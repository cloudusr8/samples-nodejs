const arr = [20, 1, 17, 3, 16, 2, 7]

const maxGap = (arr) => {
  if(arr.length < 2)
    return 0

  arr.sort((a,b) => a-b)

  let prev = arr[0]
  return arr.reduce((maxDiff, curr) => {
    let d = curr - prev
    prev = curr
    maxDiff = Math.max(maxDiff, d)
    return maxDiff
  }, 0)
}
const init = _ => {
  try {
    const mg = maxGap(arr)
    if(mg != 9)
      throw new Error('ERR')
    else
      console.log(`maxGap = ${mg}`)
  } catch(err) {
    console.log(err)
  }
}
init()