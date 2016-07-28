export class Color {
  static toHex(color) {
    return parseInt(color.replace(/^#/, ''), 16)
  }
}
