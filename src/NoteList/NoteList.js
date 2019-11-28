import React from 'react'
import { Link } from 'react-router-dom'
import Note from '../Note/Note'
import NavButton from '../NavButton/NavButton'
import NotefulContext from '../NotefulContext'
import './NoteList.css'

export default class NoteListMain extends React.Component {
  static defaultProps = {
    match: {
      params: {}
    }
  }
  static contextType = NotefulContext

  render() {
    const { folderId } = this.props.match.params
    const { notes=[] } = this.context
    const getNotesForFolder = (notes=[], folderId) => (
      (!folderId)
        ? notes
        : notes.filter(note => note.folderId === folderId)
    )
    const notesForFolder = getNotesForFolder(notes, folderId)
    return (
      <section className='NoteListMain'>
        <ul className="NoteNav__list">
          {notesForFolder.map(note =>
            <li 
            key={note.id}
            className="note__list"
            >
              <Note
                id={note.id}
                name={note.name}
              />
            </li>
          )}
        </ul>
        <div className='NoteListNav__button'>
          <NavButton
            tag={Link}
            to='/add-note'
            type='button'
            className='NoteListMain__add-note-button'
          >
            <br />
            + Note
          </NavButton>
        </div>
      </section>
    )
  }
}
