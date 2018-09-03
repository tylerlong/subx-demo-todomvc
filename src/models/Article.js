import SubX from 'subx'
import MarkdownIt from 'markdown-it'

const mdi = new MarkdownIt()

const Article = SubX({
  text: ''
}).computed({
  html () {
    console.log('mdi.render')
    return mdi.render(this.text)
  }
})

export default Article
