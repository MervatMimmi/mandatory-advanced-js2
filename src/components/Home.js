import React from 'react';
import '../App.css';
import {Helmet} from 'react-helmet';
import axios from 'axios';
import{Link} from 'react-router-dom';
import ReactStars from 'react-stars';


class Home extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      movies: [], 
      search :'',
    };
  }

  componentDidMount(){
    this.getMovie();
  }

  getMovie(){
    return axios.get('http://3.120.96.16:3001/movies')
      .then(response =>{
        this.setState({ movies:response.data});      
      })
      .catch(error => {
      console.error('Error', error);
    });
  }

  delete(movieId){
    axios.delete('http://3.120.96.16:3001/movies/' + movieId)
      .then(() => this.getMovie())
      .catch((response) =>{
        this.getMovie();
      });
  }

  searchMovie(){
    return this.state.movies.filter((movie) => {
      return movie.title.toLowerCase().includes(this.state.search.toLowerCase()) 
             || movie.director.toLowerCase().includes(this.state.search.toLowerCase());
    });
  }
  
  render(){

    const homeStyle = {
      color: 'rgb(212,175,55)'
    }

    return(
      <div className = 'root'>
        <div>
          <Helmet>
            <title>Home</title>
          </Helmet>
        </div>
        <div className = 'window'>
          <div> 
            <h1 style = {homeStyle}>Home</h1>
            <label style = {homeStyle}>
              <input className = 'text'
                type = 'text'
                placeholder = 'Search for title or director...'
                onChange = {(e) => this.setState({search: e.target.value})} 
              />
            </label>
          </div>
          <div>
            <table>
              <thead>
                <tr style = {homeStyle}>
                  <th>Title</th>
                  <th>Director</th>
                  <th>Rating</th>
                  <th>Edit Movie</th>
                  <th>Movie Description</th>
                  <th>Delete Movie</th> 
                </tr>
              </thead>
              <tbody>
                {this.searchMovie().map( movie  => {
                return(
                  <tr key = {movie.id}>
                    <td >{movie.title}</td>
                    <td >{movie.director}</td>
                    <td><ReactStars 
                          className ='star' 
                          count = {5}
                          size ={24}
                          color = {'rgb(212,175,55)'}
                          value = {Number(movie.rating)}
                          edit = {false} />
                          {movie.rating}
                          </td>
                    <td ><Link to= {'/editmovie/' + movie.id} 
                          style={{ textDecoration: 'none', color: 'rgb(212,175,55)', fontSize: 15 }}>
                            Edit Movie</Link></td>
                    <td><Link to = {'/moviedesc/' + movie.id}
                          style={{ textDecoration: 'none', color: 'rgb(212,175,55)', fontSize: 15 }}>
                          Movie Description</Link></td>
                    <td><button 
                          style = {homeStyle}
                          onClick = {(e) => this.delete(movie.id)}
                          >Delete
                        </button>
                    </td>
                  </tr>
                  )}
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }
}

export default Home;