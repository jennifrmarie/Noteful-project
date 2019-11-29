import React, {Component} from 'react';
import {Route, Link} from 'react-router-dom';
import NoteList from '../NoteList/NoteList';
import FolderNav from '../FolderNav/FolderNav';
import NotePageNav from '../NotePageNav/NotePageNav';
import NotePageMain from '../NotePageMain/NotePageMain';
import NotefulContext from '../NotefulContext';
import AddFolder from '../AddFolder/AddFolder';
import AddNote from '../AddNote/AddNote'
import './App.css';

class App extends Component {
    state = {
        notes: [],
        folders: []
    };

    componentDidMount() {
        Promise.all([
            fetch(`http://localhost:9090/notes`),
            fetch(`http://localhost:9090/folders`)
        ])
            .then(([notesResponse, foldersResponse]) => {
                if (!notesResponse.ok)
                    return notesResponse.json()
                if (!foldersResponse.ok)
                    return foldersResponse.json()

                return Promise.all([notesResponse.json(), foldersResponse.json()]);
            })
            .then(([notes, folders]) => {
                this.setState({notes, folders});
            })
            .catch(error => {
                console.error({error});
            });
    }

    handleDeleteNote = noteId => {
        this.setState({
            notes: this.state.notes.filter(note => 
                note.id !== noteId)
        });
    };

    renderNavRoutes() {
        return (
            <React.Fragment>
                {['/', '/folder/:folderId'].map(path => (
                    <Route
                        exact
                        key={path}
                        path={path}
                        component={FolderNav}
                    />
                ))}
                <Route path="/note/:noteId" component={NotePageNav} />
            </React.Fragment>
        );
    }

    renderMainRoutes() {
        return (
            <React.Fragment>
                {['/', '/folder/:folderId'].map(path => (
                    
                    <Route
                        exact
                        key={path}
                        path={path}
                        component={NoteList}
                    />
                    
                ))}
                <Route path="/note/:noteId" component={NotePageMain} />
                <Route path="/add-folder" component={AddFolder} />
                <Route path="/add-note" component={AddNote} />
            </React.Fragment>
            
        );
        
    }

    render() {
        const contextValue = {
            notes: this.state.notes,
            folders: this.state.folders,
            deleteNote: this.handleDeleteNote
        };
        return (
            <NotefulContext.Provider value={contextValue}>
                <div className="App">
                    <nav className="App__nav">{this.renderNavRoutes()}</nav>
                    <header className="App__header">
                        <h1>
                            <Link to="/">Noteful</Link>
                        </h1>
                    </header>
                    <main className="App__main">{this.renderMainRoutes()}</main>
                </div>
            </NotefulContext.Provider>
        );
    }
}

export default App;
