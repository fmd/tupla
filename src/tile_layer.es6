import PIXI from 'pixi.js'

export class TileLayer {
  constructor(container, tileSize, palette, tiles) {
    this.container = container
    this.tiles = tiles
    this.addRectangles(this.findRectangles(tiles), tileSize, palette)
  }

  tileAtPoint(point) {
    if (point.x < 0 || point.x >= this.tiles[0].length || point.y < 0 || point.y >= this.tiles.length) {
      return 0
    }

    return this.tiles[point.y][point.x]
  }

  addRectangles(rects, tileSize, palette) {
    let graphic = new PIXI.Graphics()
    for (let k in rects) {
      let rect = rects[k]
      graphic.beginFill(this.toHex(palette[rect.tile.toString()].color))
      graphic.drawRect(rect.x * tileSize, rect.y * tileSize, rect.width * tileSize, rect.height * tileSize)
    }

    this.container.addChild(graphic)
  }

  findRectangles(srcTiles) {
    let rects = []
    let tiles = this.cloneIntegerArray(srcTiles)

    for (let y = 0; y < tiles.length; y++) {
      for (let x = 0; x < tiles[y].length; x++) {
        let tile = tiles[y][x]
        if (tile == 0) {
          continue
        }

        let width = this.rectWidth(x, y, tile, tiles)
        let height = this.rectHeight(x, y, tile, width, tiles)
        this.zeroRectangle(x, y, width, height, tiles)
        rects.push({ x, y, width, height, tile })
      }
    }

    return rects
  }

  zeroRectangle(x, y, width, height, tiles) {
    for (let fy = y; fy < y + height; fy++) {
      for (let fx = x; fx < x + width; fx++) {
        tiles[fy][fx] = 0
      }
    }
  }

  rectWidth(x, y, key, tiles) {
    let width = 0
    for (let t = x; t < tiles[y].length; t++) {
      if (tiles[y][t] != key) {
        return width
      }

      width += 1
    }

    return width
  }

  rectHeight(x, y, key, width, tiles) {
    let height = 1
    for (let t = y + 1; t < tiles.length; t++) {
      if (this.rectWidth(x, t, key, tiles) != width) {
        return height
      }

      height += 1
    }

    return height
  }

  cloneIntegerArray(obj) {
    let copy

    if (null == obj || "object" != typeof obj) {
      return obj
    }

    if (obj instanceof Array) {
      copy = []
      for (let i = 0, len = obj.length; i < len; i++) {
        copy[i] = this.cloneIntegerArray(obj[i])
      }

      return copy
    }
  }

  toHex(str) {
    return parseInt(str.replace(/^#/, ''), 16)
  }
}
