import React from "react";
import ReactDOM from "react-dom/client";
import './index.css';
import { marked } from 'marked';

const placeholder = `# React Markdown Previewer 
## Type something in the editor!
<br>

### This markdown consists of an editor and a previewer.
<br>

### Functionality:
- The **preview** window updates in real time with the markdown syntex.
- The editor is predefined in the **editor**

<br>

\`Markdown syntax\`
\`\`\`react
let react = "JSX syntax";
console.log(react);
\`\`\`

<br>

> “My mama always said life was like a box of chocolates. You never know what you're gonna get.”
― Forrest Gump
<br>

<code>Math.random()</code>
<a href="https://www.freecodecamp.org" target="_blank">FreeCodeCamp</a>
> Block Quotes!

You can try to make text **bold**, as well as _italic_, and **_both!_**
Try ~~crossing stuff out~~ !
<br>
<br>

Coded by **Yan Shtein** FreeCodeCamp Challenges --> [GitHub](https://github.com/YanShtein)
![Recat Logo](https://i.postimg.cc/8c1qM6J7/logo-og.png)
`;

const renderer = new marked.Renderer()
renderer.link = (href,title, text) => {
  return `<a href=${href} target="_blank">${text}</a>`
};

marked.setOptions({
    breaks: true,
  });

const Title = () => {
    return (
        <h1 id="title">Markdown Previewer</h1>
    );
};

const Editor = (props) => {
    return (
        <div className="editor">
            <textarea id="editor" value={props.markdown} onChange={props.onChange}/> 
        </div>
    );
};

const Preview = (props) => {
    return (
        <div id="preview" dangerouslySetInnerHTML={props.markdown}/>
    );
};

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            input: placeholder,
        };
        this.handleChange = this.handleChange.bind(this);
    };

    handleChange(event) {
        this.setState({
            input: event.target.value
        });
    };

    createMarkUp = () => {
        return {
            __html: marked(this.state.input, {breaks: true,renderer: renderer,})
        };
    };

    render() {
        return (
            <div className="container">
                <Title />
                <div className="tables">
                    <Editor markdown={this.state.input} onChange={this.handleChange}/>
                    <Preview markdown={this.createMarkUp()}/>
                </div>
            </div>
        );
    };
};


ReactDOM.createRoot(document.getElementById('root')).render(<App />);