exports.processItem = function (item) {
  if (item.skin) return item;
  var data = {
    category: item.category,
    color: item.color,
    id: item.id,
    image: item.image,
    paint_index: item.paint_index,
    rarity: item.rarity,
    price: item.price,
    type: item.type
  }
  var name = item.name
  var regex = /(★ )?(StatTrak™ )?(.+) \| (.+) \((.+)\)/.exec(name)

  // seperate weapons from misc
  if (regex) regex[0] = name.replace(/\((.+)\)/.exec(name)[0], '').replace('StatTrak™ ', '')
  else regex = [name]

  // get item name
  if ((/\((.+)\)/.exec(regex[0])) !== null) data.name = regex[0].replace(/\((.+)\)/.exec(regex[0])[0], '')
  else data.name = regex[0]

  if (regex[4]) data.skin = regex[4]

  data.gun = data.name.substring(0, data.name.lastIndexOf(' |'));

  data.condition = regex[5]

  return data
}