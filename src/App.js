import React, { Component } from 'react'
import './App.css';

import Title from './components/Title'
import Search from './components/Search'
import Definition from './components/Definition'

export class App extends Component {

  state = {
    query: '',
    oldQuery: '', 
    data: {},
    autolist: [],
    cursor: -1,
    definition: {
      word: '',
      desc: ''
    }
  }

  // Get JSON data dynamically
  componentDidMount = () => {
    fetch('/json/dictionary.json', {mode: 'no-cors'})
      .then(response => response.json())
      .then(data => {
        this.setState({data: data})
      })
      .catch(error => console.error(error))
  }

  searchDic = (e) => {
    e.preventDefault()
    this.blurHandler()
    this.setState({
      definition: {
        word: this.state.query.toLowerCase(),
        desc: 'DESC HERE'
      }
    })
  }

  changeHandler = (e) => {
    console.log('Changed the value!')
    this.setState({
      query: e.target.value,
      oldQuery: e.target.value,
      cursor: -1
    }, this.focusHandler)
  }

  // when user focuses into the textbox / automatic suggestions
  focusHandler = () => {
    console.log('focus!')
    // search for list of 5 words that match value
    let matches = []

    for (let key in this.state.data) {
      if (key.includes(this.state.query.toLowerCase()) && key.substr(0, this.state.query.length) === this.state.query.toLowerCase() && this.state.query.toLowerCase() !== '' && matches.length <= 5) {
        console.log('bingo! 2')
        matches.push(key)
      }
    }
    this.setState({
      autolist: matches
    })
  }

  // when the user focuses out of the textboxs
  blurHandler = () => {
    this.setState({
      autolist: []
    })
  }

  // autolist navigation with arrow keys
  keyDownHandler = (e) => {
    // arrow key down
    if (e.keyCode === 40 && this.state.cursor < this.state.autolist.length - 1 && this.state.autolist.length !== 0) {
      let newCursor = this.state.cursor + 1
      this.setState({
        cursor: newCursor
      })
      // replace input text with autofill text
      let replace = this.state.autolist[newCursor]
      this.setState({ query: replace})

    }
    // arrow key up
    else if (e.keyCode === 38 && this.state.cursor > -1 && this.state.autolist.length !== 0) {
      let newCursor = this.state.cursor - 1
      this.setState({
        cursor: newCursor
      })
      if (newCursor === -1) {
        let old = this.state.oldQuery
        this.setState({ query: old })
      }
      else {
        let replace = this.state.autolist[newCursor]
        this.setState({ query: replace})
      }
    }
  }

  // when user selects / highlights an autofill suggestion
  selectHandler = (e) => {
    console.log(e.target.value)
    console.log('SDKFJSLKDFJDSKLFJLSJDFLK')
  }

  render() {

    // check to see if there is a query
    let definition = null
    if ((this.state.data[this.state.definition.word] !== undefined)) {
      definition = (
        <Definition word={this.state.definition.word} desc={this.state.data[this.state.definition.word]}/>
      )
    }

    return (
      <div className="App">
        <Title />
        <Search 
          submit={this.searchDic} 
          changed={this.changeHandler} 
          value={this.state.query} 
          onfocus={this.focusHandler}
          auto={this.state.autolist}
          onblur={this.blurHandler}
          onkeydown={this.keyDownHandler}
          onselect={this.selectHandler}
          cursor={this.state.cursor}
          />
        { definition }
      </div>
    )
  }
}

export default App

