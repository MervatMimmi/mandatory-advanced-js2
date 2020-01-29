import React from 'react';
import '../App.css';
import{Helmet} from 'react-helmet';
import { Redirect } from 'react-router-dom'
import axios from 'axios';
import ReactStars from 'react-stars';


class EditMovie extends React.Component{
  constructor(props){
    super(props);
    this.state = {
    movie: {
      title: '',
      director: '',
      rating: 0,
      description: '',
    },
    Redirect: false,
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onChangeRating = this.onChangeRating.bind(this);
  }

  componentDidMount(){
    this.getMovie();
  }

  getMovie(){
    const movieId = this.props.match.params.id;
    return axios.get('http://3.120.96.16:3001/movies/' + movieId)
      .then(response => {
        this.setState({movie: response.data})
      })
      .catch(response => {
        if(response.response.status === 404){
          this.setState({infoMsg: 'Movie not found'})
        }
      })
  }

  onChange(e){
    const movieData = {...this.state.movie};
    
    movieData[e.target.name] = e.target.value;
    this.setState({movie:movieData});
  }

  onChangeRating(e){
    const movieData = {...this.state.movie};
    
    movieData["rating"] = e;
    //console.log("3: "+{movie:movieData});
    this.setState({movie:movieData});
  }

  handleSubmit(e){
    e.preventDefault();

    axios.put('http://3.120.96.16:3001/movies/' +  this.props.match.params.id, this.state.movie)
    .then(response => {
      //console.log('Hej');
      this.setState ({redirect :true})
    })
    .catch(response => {
      if(response.response.status === 400){
        this.setState({infoMsg: 'Movie not found'})
      }
    })
  }

  render(){

    const editStyle = {
      color: 'rgb(212,175,55)'
    }

    if(this.state.redirect){
      return  <Redirect push to= '/' />
    }

    if(this.state.infoMsg){
      return <h1>{this.state.infoMsg}</h1>
    }

    return (
      <div className = 'root'>
        <div>
          <Helmet>
            <title>EditMovie</title>
          </Helmet>
        </div>
        <div className = 'window'>
          <div>
            <h1 style = {editStyle}>Edit Movie </h1>
          </div>
          <div>
            <form  
              className = 'frame'
              onSubmit = {this.handleSubmit}>
              <label style={editStyle}> Title:
              <br />
                <input 
                  name ='title'
                  className = 'text'
                  type = 'text'
                  minLength = '1'
                  maxLength = '40'
                  required = 'required'
                  value = {this.state.movie.title}
                  onChange = {this.onChange}
                  />
              </label>
              <br/>
              <label style={editStyle}> Director:
              <br />
                <input 
                  name ='director'
                  className = 'text'
                  type = 'text'
                  minLength = '1'
                  maxLength = '40'
                  required = 'required'
                  value ={this.state.movie.director}
                  onChange = {this.onChange}
                   />
              </label>
              <br/>
              <label style={editStyle}> Rating:
              <br />
                <ReactStars 
                 className ='star' 
                 count = {5}
                 size ={35}
                 color = {'rgb(212,175,55)'}
                 value = {Number(this.state.movie.rating)}
                 onChange = {this.onChangeRating} />
                 {this.state.movie.rating}     
              </label>
              <br/>
              <label style={editStyle}> Description:
              <br />
                <textarea 
                  name ='description'
                  className = 'text'
                  minLength = '1'
                  maxLength = '300'
                  required = 'required'
                  value = {this.state.movie.description}
                  onChange = {this.onChange}
                  />
              </label>
              <br/>
              <button
              type = 'submit'
              style ={editStyle}
              >Send</button>
              <br/>
            </form>
            <div className = 'infoMsg' style={editStyle}>
              
            </div>
            <br />
          </div>
        </div>
      </div>
    )
  }
}

export default EditMovie;