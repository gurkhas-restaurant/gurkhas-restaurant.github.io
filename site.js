var menuUrl = 'https://script.google.com/a/macros/gurkhas.net/s/AKfycbylvbL9CrQoIs47qYWqnGKRavjFSAMUjSUJcMVQn22Y5d2-3hU/exec?id=1xYPzcNLuhqi5Hw3SmOYcj-Qn-smPvh0mKuvcc76jl48&sheet=menu'
var contentUrl = 'https://script.google.com/a/macros/gurkhas.net/s/AKfycbylvbL9CrQoIs47qYWqnGKRavjFSAMUjSUJcMVQn22Y5d2-3hU/exec?id=1xYPzcNLuhqi5Hw3SmOYcj-Qn-smPvh0mKuvcc76jl48&sheet=content'

var getDataAndRender = function(url, callback) {
  var request = new XMLHttpRequest()
  request.responseType = 'json'
  request.addEventListener('load', callback)
  request.open('GET', url, true)
  request.send()
}

var renderMenu = function (loadEvent) {
  var request = loadEvent.target
  var list = request.response['records']
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
    markup += '  <h3 class="catagory">' + categoryName + '</h3>'
    markup += '  <ul>'
    list.forEach(function (item) {
      if (item.visible) {
        markup += '<li>'
        markup += '  <h4 class="itemName">' + item.name + '</h4>'
        markup += '  <h5 class="itemPrice">$' + item.price + '</h5>'
        markup += '  <p class="itemDescription">' + item.description + '</p>'
        markup += '</li>'
      }
    })
    markup += '  </ul>'
    markup += '</div>'
  })

  document.getElementById('menu-items').innerHTML = markup
}

var renderContent = function (loadEvent) {
  var request = loadEvent.target
  var list = request.response['records']
  list.forEach(function (section) {
    var sectionContainer = document.getElementById(section.name)
    if (sectionContainer) {
      sectionContainer.innerHTML = '<div><h1>' + section.title + '</h1>' + section.body + '</div>'
    }
  })
}

getDataAndRender(menuUrl, renderMenu)
getDataAndRender(contentUrl, renderContent)