const fetch = require('node-fetch')
const moment = require('moment')

//Utility functions
const utils = {}

utils.parseDate = date => {
  let newDate = date
    .trim()
    .replace('.', '')
    .replace('at', '')
    .replace(',', '')
  newDate = moment(date, 'DD MMMM YYYY HH:mm', 'en')
  return newDate.toDate()
}

utils.mergeObjects = (obj1, obj2) => {
  let finalobj = {}
  if (Object.keys(obj1).length > 0 && Object.keys(obj2).length > 0) {
    //use anyone object can compare if they have the same key.
    for (const key in obj1) {
      if (obj2[key]) {
        finalobj[key] = obj2[key]
      }
    }
  } else if (Object.keys(obj1).length == 0 || Object.keys(obj2).length == 0) {
    finalobj = Object.keys(obj1).length == 0 ? obj2 : obj1
  }
  return finalobj
}

utils.capitalizeFirstLetter = string => {
  string = string.toLowerCase()
  return string.charAt(0).toUpperCase() + string.slice(1)
}

utils.last = arr => {
  return arr[arr.length - 1]
}

utils.rest = arr => {
  return arr.slice(1, arr.length)
}
utils.popb = arr => {
  return arr.slice(0, arr.length - 1)
}

utils.stripNumbering = line => {
  return utils.rest(line.replace(/^\s+|\s+$/g, '').split(/ /g)).join(' ')
}

utils.arrayUnique = a => {
  return a.reduce(function(p, c) {
    if (p.indexOf(c) < 0) p.push(c)
    return p
  }, [])
}

utils.downloadJSONfromBakaTsukiMediaWiki = function(url_params) {
  const url =
    'https://www.baka-tsuki.org/project/api.php?format=json&' + url_params

  return fetch(encodeURI(url)).then(res => res.json())
}

utils.downloadHTMLfromBakaTsuki = url_params => {
  const url = 'https://www.baka-tsuki.org/project/index.php?title=' + url_params

  return fetch(encodeURI(url)).then(resp => resp.text())
}

Object.defineProperty(Object.prototype, 'map', {
  value: function(f, ctx) {
    ctx = ctx || this
    const self = this,
      result = []
    Object.keys(self).forEach(function(k) {
      result.push(f.call(ctx, self[k], k, self))
    })
    return result
  }
})

Object.defineProperty(Object.prototype, 'renameProperty', {
  writable: false, // Cannot alter this property
  enumerable: false, // Will not show up in a for-in loop.
  configurable: false, // Cannot be deleted via the delete operator
  value: function(oldName, newName) {
    // Do nothing if the names are the same
    if (oldName == newName) {
      return this
    }
    // Check for the old property name to
    // avoid a ReferenceError in strict mode.
    if (this.hasOwnProperty(oldName)) {
      this[newName] = this[oldName]
      delete this[oldName]
    }
    return this
  }
})

module.exports = utils
