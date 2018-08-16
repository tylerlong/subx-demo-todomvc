import * as React from 'react'
import * as ReactDOM from 'react-dom'
import * as mdc from 'markdown-core'

class MarkdownEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = { markdown: '' };
  }
  render() {
    return (
      <div>
        <textarea placeholder="Please enter some markdown..." id="markdown-textarea" value={this.state.markdown} onChange={(e) => this.setState({ markdown: e.target.value })}></textarea>
        <div className="markdown-body" dangerouslySetInnerHTML={{ __html: mdc.render(this.state.markdown) }}></div>
      </div>
    );
  }
}

ReactDOM.render(<MarkdownEditor />, document.getElementById('root'));
