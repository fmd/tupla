import PIXI from 'pixi.js'

export class TileLayer {
  constructor(container, tileSize, palette, tiles) {
    this.container = container
    this.rectangles = this.findRectangles(tiles, tileSize, palette)
    console.log(this.rectangles)
    // this.graphics = new PIXI.Graphics()
    // this.graphics.beginFill(parseInt('#e67e22'.replace(/^#/, ''), 16))
    // this.graphics.drawRect(0, 0, 64, 64)
    // this.container.addChild(this.graphics)
  }

  findRectangles(rows, tileSize, palette) {
    let rects = []
    let currentRect = null

    for (let rowKey in rows) {
      rowKey = parseInt(rowKey)
      let cols = rows[rowKey]
      let rectRow = []

      for (let colKey in cols) {
        colKey = parseInt(colKey)
        let tile = cols[colKey]

        if (currentRect == null) {
          currentRect = { key: tile, x: colKey, y: rowKey, width: 1, height: 1 }
        } else {
          if (tile !== parseInt(currentRect.key)) {
            rectRow.push(currentRect)
            currentRect = { key: tile, x: colKey, y: rowKey, width: 1, height: 1 }
          } else {
            currentRect.width += 1
          }
        }
      }

      rectRow.push(currentRect)
      rects.push(rectRow)
      currentRect = null
    }

    return this.mergeRects(rects)
  }

  mergeRects(rects) {
  for (let rowKey in rects) {
    let rowKey = parseInt(rowKey)
    let row = rects[rowKey]
    for (let colKey in row) {
      let colKey = parseInt(colKey)
      let col = row[colKey]

      if (rowKey < rects.length) {
        let findRow = rects[rowKey + 1]
        for (let findKey in findRow) {
          let findCol = findRow[findKey]
          if (col.width == 3) {
            console.log(col, findCol)
          }
          if (col.key == findCol.key && col.x == findCol.x && col.width == findCol.width) {
            findCol.height += col.height
            row.splice(colKey, 1)
            if (row.length == 0) {
              rects.splice(rowKey, 1)
            }
          }
        }
      }
    }
  }
    return rects
  }
}
