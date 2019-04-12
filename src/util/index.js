function produceArray(numberOne, length) {
  let array = new Array(length)
  array.fill(0)
  const pos = []
  for (let i = 0; i < numberOne;) {
    let p = (length - 0) * Math.random() + 0 >> 0
    if (pos.indexOf(p) < 0) {
      pos.push(p)
      i++
    }
  }
  for (let i = 0; i < pos.length; i++) {
    array[pos[i]] = 1
  }
  return array
}

function produceTdArray(lines, numberOne) {
  let result = []
  let map = []
  let array = produceArray(numberOne, lines * lines)
  for (let i = 0; i < lines; i++) {
    result[i] = []
    map[i] = []
    for (let j = 0; j < lines; j++) {
      result[i].push(array[i * lines + j])
      map[i].push({
        status: '\u{1f345}'
      })
    }
  }
  let counts = []
  for (let i = 0; i < lines; i++) {
    counts[i] = []
    for (let j = 0; j < lines; j++) {
      let number = 0
      if (result[i] && result[i][j - 1]) {
        number++
      }
      if (result[i] && result[i][j + 1]) {
        number++
      }
      if (result[i - 1] && result[i - 1][j - 1]) {
        number++
      }
      if (result[i - 1] && result[i - 1][j]) {
        number++
      }
      if (result[i - 1] && result[i - 1][j + 1]) {
        number++
      }
      if (result[i + 1] && result[i + 1][j - 1]) {
        number++
      }
      if (result[i + 1] && result[i + 1][j]) {
        number++
      }
      if (result[i + 1] && result[i + 1][j + 1]) {
        number++
      }
      counts[i].push({
        number: number,
        visited: false
      })
    }
  }
  return {
    origin: result,
    counts: counts,
    map: map
  }
}

export {
  produceArray,
  produceTdArray
}