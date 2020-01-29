import React from 'react';
import '../App.css';
import{Helmet} from 'react-helmet';
import axios from 'axios';
import ReactStars from 'react-stars';
import{Link} from 'react-router-dom';


class MovieDesc extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      movie: {},
    }
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
  render(){

    const infoStyle = {
      color: 'rgb(212,175,55)'
    }

    if(this.state.infoMsg){
      return <h1>{this.state.infoMsg}</h1>
    }
    return(
      <div className = 'root'>
        <div>
          <Helmet>
            <title>MovieDescription</title>
          </Helmet>
        </div>
        <div>
          <h1 style = {infoStyle}>
            Movie Description
          </h1>
        </div>
        <section className = 'window'>
          <div className = 'frame'>
            <div className = 'div-frame'>
              <h2 style = {infoStyle}>
                Title
              </h2>
                <p className = 'info'>
                  {this.state.movie.title}
                </p>
            </div>
            <div className = 'div-frame'>
              <h3 style = {infoStyle}>
                Director
              </h3>
              <p className = 'info'>
                {this.state.movie.director}
              </p>
            </div>
            <div className = 'div-frame'>
              <h3 style = {infoStyle}>
                Rating
              </h3>
              <ReactStars 
                className ='star' 
                count = {5}
                size ={24}
                color = {'rgb(212,175,55)'}
                value = {Number(this.state.movie.rating)}
                edit = {false} />
                {this.state.movie.rating}
            </div>
            <div className = 'div-frame'>
              <h3 style = {infoStyle}>
                Movie Description
              </h3>
              <p className = 'info'>
                {this.state.movie.description}
              </p>
            </div>
            <div>
              <Link to= {'/editmovie/' + this.state.movie.id}
                style={{ textDecoration: 'none', color: 'rgb(212,175,55)', fontSize: 20, margin: 20,}}>
                Edit Movie
              </Link>
              <Link to= {'/'}
                style={{ textDecoration: 'none', color: 'rgb(212,175,55)', fontSize: 20, margin: 20,}}>
                Home
              </Link>
            </div>
          </div>
        </section>
      </div>
    )
  }
}


export default MovieDesc;