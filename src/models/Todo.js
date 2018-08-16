import EventEmitter from 'events'
import uuid from 'uuid/v1'

class Todo extends EventEmitter {
  constructor (text = '', complete = false) {
    super()
    this._text = text
    this._complete = complete
    this.id = uuid()
  }

  get text () {
    return this._text
  }

  set text (val) {
    this._text = val
    this.emit('textChanged', val)
  }

  get complete () {
    return this._complete
  }

  set complete (val) {
    this._complete = val
    this.emit('completeChanged', val)
  }
}

export default Todo
