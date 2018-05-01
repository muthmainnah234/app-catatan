import React, { Component } from 'react';
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [],
    };
  }

  componentDidMount() {
    axios.get('http://localhost:8080/note')
      .then(({data}) => {
        if (data.success) {
          this.setState({
            notes: data.result
          });
        }
      })
      .catch((err) => {
        alert('Cannot connect to url');
      })
  }

  render() {
    const notes = this.state.notes;
    return (
      <div className="App" >
        <section className="jumbotron text-center" >
          <h1>NOTEBOOK</h1>
          <h4 className="App-intro" >Create, edit, and save your notes online!</h4>
        </section>
        <div >
          {
            notes.map((note) => {
              return(
                <div>
                  <Link to={`/show/${note._id}`} >
                    <Button className="App-note-title" >{note.title}</Button>
                  </Link>
                </div>
              )
            })
          }
        </div>
        <div>
          <Link to="/create" >
            <Button className="button-blue" ><span>&#43;</span></Button>
          </Link>
        </div>
      </div>
    );
  }
}

export default App;
