import React, { Component } from 'react'
import NotefulForm from '../NotefulForm/NotefulForm'
import NotefulContext from '../NotefulContext'
import NavButton from '../NavButton/NavButton'
import './AddFolder.css'
export default class AddFolder extends Component {
  static defaultProps = {
    history: {
      push: () => { }
    },
  }
  static contextType = NotefulContext;

  handleSubmit = e => {
    e.preventDefault()
    const folder = {
      name: e.target['folder-name'].value
    }
    fetch(`http://localhost:9090/folders`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(folder),
    })
      .then(res => {
        if (!res.ok)
          return res.json().then(e => Promise.reject(e))
        return res.json()
      })
      .then(folder => {
        this.props.history.push(`/folder/${folder.id}`)
      })
      .catch(error => {
        console.error({ error })
      })
  }

  render() {
    return (
      <section className='AddFolder'>
        <h2>Create a folder</h2>
        <NotefulForm onSubmit={this.handleSubmit}>
          <div className='field'>
            <label htmlFor='folder-name-input'>
              Name
            </label>
            <input type='text' id='folder-name-input' name='folder-name' />
          </div>
          <div className='buttons'>
            <button type='submit'>
              Add folder
            </button>
          </div>
        </NotefulForm>
        <NavButton
          tag='button'
          role='link'
          onClick={() => this.props.history.goBack()}
          className='NotePage__back-button'
        >
          <br />
          Back
        </NavButton>
      </section>
    )
  }
}