import MarkdownIt from 'markdown-it'
import EventEmitter from 'events'

const mdi = new MarkdownIt()

class Article extends EventEmitter {
  constructor (text = '') {
    super()
    this._text = text
  }

  get text () {
    return this._text
  }

  set text (val) {
    this._text = val
    this.emit('textChanged', val)
  }

  get html () {
    return mdi.render(this._text)
  }
}

export default Article
