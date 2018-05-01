import React, { Component } from 'react';
import { 
  Button,
  Card,
  CardBody,
  CardTitle,
  CardText,
} from 'reactstrap';
import { Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';

class Create extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      body: '',
      redirect: false,
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  
  onChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  onSubmit(event) {
    event.preventDefault();
    const { title, body } = this.state;
    axios.post('http://localhost:8080/note', { title, body })
      .then(({data}) => {
        alert(data.message);
        this.setState({
          redirect: true,
        });
      })
      .catch((err) => {
        alert('Cannot connect to url');
      })
  }

	render() {
    const state = this.state;
    const { title, body, redirect } = state;
    if (redirect) {
      return (
        <Redirect to="/" />
      );
    }
    return(
      <div>
        <section className="jumbotron text-center" >
          <h1>NOTEBOOK</h1>
          <h4 className="App-intro" >Create, edit, and save your notes online!</h4>
        </section>
        <Form onSubmit={this.onSubmit} >
          <Card className="card-container" >
            <CardBody>
              <CardTitle>
                <Input placeholder="Title" name="title" value={title} onChange={this.onChange} required />
              </CardTitle>
              <hr/>
              <CardText>
                <Input type="textarea" placeholder="write your note..." rows={9} name="body" value={body} onChange={this.onChange} required />
              </CardText>
            </CardBody>
          </Card>
          <div className="container-button" >
            <Link to="/">
              <Button className="button-red" ><span>BACK</span></Button>
            </Link>
            <Button className="button-green" type="submit" ><span>SAVE</span></Button>
          </div>
        </Form>
      </div>
    );
	}
}

export default Create;