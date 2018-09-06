import SubX from 'subx'
import uuid from 'uuid/v1'

const Todo = SubX({
  id: uuid(),
  text: '',
  done: false
})

export default Todo
