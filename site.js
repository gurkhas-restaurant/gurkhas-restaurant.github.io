var dataSource = 'http://gsx2json.com/api?id=1xYPzcNLuhqi5Hw3SmOYcj-Qn-smPvh0mKuvcc76jl48&columns=false'

var request = new XMLHttpRequest()
request.responseType = 'json'
request.addEventListener('load', function () {
  var list = request.response['rows']
  var categoryNameList = []
  var categories = {}
  var markup = ''
  list.forEach(function (item) {
    if (!categories[item.category]) {
      categories[item.category] = []
      categoryNameList.push(item.category)
    }
    categories[item.category].push(item)
  })
  categoryNameList.forEach(function (categoryName) {
    var list = categories[categoryName]
    markup += '<div>'
    markup += '  <h3>' + categoryName + '</h3>'
    markup += '  <ul>'
    list.forEach(function (item) {
      markup += '<li>'
      markup += '  <h4>' + item.name + '</h4>'
      markup += '  <h5>' + item.price + '</h5>'
      markup += '  <p>' + item.description + '</p>'
      markup += '</li>'
    })
    markup += '  </ul>'
    markup += '</div>'
  })
  document.getElementById('menu-items').innerHTML = markup
})
request.open('GET', dataSource, true)
request.send()
