import React, { Component } from 'react';
import { 
  Button,
  Card,
  CardBody,
  CardTitle,
  CardText,
} from 'reactstrap';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';

class Show extends Component {
  constructor(props) {
    super(props);
    this.state = {
      note: {},
      redirect: false,
    }
    this.delete = this.delete.bind(this);
  }

  componentDidMount() {
    const { match: { params } } = this.props;
    axios.get(`http://localhost:8080/note/${params.id}`)
      .then(({data}) => {
        console.log(data);
        if (data.success) {
          this.setState({
            note: data.result,
          });
        }
      })
      .catch((err) => {
        alert('Cannot connect to url');
      })
  }

  delete(){
    const id = this.state.note._id;
    axios.delete(`http://localhost:8080/note/${id}`)
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
    const { title, body, _id } = state.note;
    const { redirect } = state;
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
        <Card className="card-container" >
          <CardBody>
            <CardTitle>
              {title}
            </CardTitle>
            <hr/>
            <CardText>
              {body}
            </CardText>
          </CardBody>
        </Card>
        <div className="container-button" >
          <Link to="/">
            <Button className="button-blue" ><span>BACK</span></Button>
          </Link>
          <Link to={`/edit/${_id}`} >
            <Button className="button-yellow" ><span>EDIT</span></Button>
          </Link>
          <Button className="button-red" onClick={this.delete} ><span>DELETE</span></Button>
        </div>
      </div>
    );
	}
}

export default Show;