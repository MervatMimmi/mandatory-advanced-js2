import React from 'react';
import '../App.css';
import{Helmet} from 'react-helmet';
import { Redirect } from 'react-router-dom'
import axios from 'axios';
import ReactStars from 'react-stars';


class AddMovie extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      title: '' ,
      director: '',
      rating: 0,
      description: "",
      redirect: false,
      };

    this.handleSubmit = this.handleSubmit.bind(this);
  } 

  handleSubmit(e) {
    e.preventDefault();
    
    const movieData = {};
      movieData.title = this.state.title;
      movieData.director = this.state.director;
      movieData.rating = this.state.rating;
      movieData.description = this.state.description;
      
    axios.post('http://3.120.96.16:3001/movies', movieData)
    .then((response) => {
      if(response.status === 201) {
        this.setState({redirect:true});
      }
    })
    .catch(err => {
      console.error ('Err', err);
      this.setState({infoMsg : 'Please do fill the form correct!'});
    });
  }

  render() {
    
    if(this.state.redirect) {
      return <Redirect push to='/' />
    }

    const addStyle = {
      color: 'rgb(212,175,55)'
    }

    return (
      <div className = 'root'>
        <div>
          <Helmet>
            <title>AddMovie</title>
          </Helmet>
        </div>
        <div className = 'window'>
          <div>
            <h1 style = {addStyle}>Movie Add</h1>
          </div>
          <div>
            <form  
              className = 'frame'
              onSubmit = {this.handleSubmit}>
              <label style={addStyle} > Title:
              <br />
                <input 
                  className = 'text'
                  type = 'text'
                  minLength = '1'
                  maxLength = '40'
                  required = 'required'
                  placeholder = 'Title...'
                  onChange = {(e) => this.setState({ title: e.target.value })} />
              </label>
              <br/>
              <label style={addStyle}> Director:
              <br />
                <input 
                  className = 'text'
                  type = 'text'
                  minLength = '1'
                  maxLength = '40'
                  required = 'required'
                  placeholder = 'Director...'
                  onChange = {(e) => this.setState({ director: e.target.value })} />
              </label>
              <br/>
              <label style={addStyle}> Rating:
              <br />
                <ReactStars 
                  className = 'star'
                  min = {0.0}
                  max = {5.0}
                  required = 'required'
                  count ={5}
                  onChange = {(e) => this.setState({ rating: e })}
                  value = {this.state.rating}
                  size = {35}
                  color2 = {'rgb(212,175,55)'} />
              </label>
              <br/>
              <label style={addStyle}> Description:
              <br />
                <textarea 
                  className = 'text'
                  minLength = '1'
                  maxLength = '300'
                  required = 'required'
                  placeholder = 'Description...'
                  onChange = {(e) => this.setState({ description: e.target.value })} />
              </label>
              <br/>
              <button
              type = 'submit'
              style ={addStyle}
              >Send</button>
              <br/>
            </form>
            <div className = 'infoMsg' style={addStyle}>
              {this.state.infoMsg}
            </div>
            <br />
          </div>
        </div>
      </div>
    )
  }
}

export default AddMovie;