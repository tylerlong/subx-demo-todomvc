import EventEmitter from 'events'
import Todo from './Todo'

class Todos extends EventEmitter {
  constructor (todos = []) {
    super()
    this._todos = todos
  }

  get todos () {
    return this._todos
  }

  addTodo (text) {
    const todo = new Todo(text)
    this._todos.push(todo)
    this.emit('todoAdded', todo)
  }
}

export default Todos
