import React from "react";
import axios from "axios";
import MovieCard from "./MovieCard";

import styled from "styled-components";

const EditButton = styled.button`
  padding: 5px;
`

const DeleteButton = styled.button`
  margin-left: 5px;
  padding: 5px;

`

export default class Movie extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: null
    };
  }

  componentDidMount() {
    this.fetchMovie(this.props.match.params.id);
  }

  componentWillReceiveProps(newProps) {
    if (this.props.match.params.id !== newProps.match.params.id) {
      this.fetchMovie(newProps.match.params.id);
    }
  }

  fetchMovie = id => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res => this.setState({ movie: res.data }))
      .catch(err => console.log(err.response));
  };

  saveMovie = () => {
    const addToSavedList = this.props.addToSavedList;
    addToSavedList(this.state.movie);
  };

  handleDelete = (event, props) => {
    event.preventDefault();
    axios.delete(`http://localhost:5000/api/movies/${this.state.movie.id}`)
    .then(response => {
      console.log(response)
      this.props.setMovies(response.data)
      this.props.history.push("/")
    })
    .catch(error => {
      console.log(error)
    })
  }

  handleEditClick = event => {
    event.preventDefault();
    this.props.history.push()
  }

  render() {
    if (!this.state.movie) {
      return <div>Loading movie information...</div>;
    }

    return (
      <div className="save-wrapper">
        <MovieCard movie={this.state.movie} />
        <div className="save-button" onClick={this.saveMovie}>
          Save
        </div>
       <EditButton onClick={() => this.props.history.push(`/update_movie/${this.state.movie.id}`)}>Edit</EditButton>
       <DeleteButton onClick={this.handleDelete}>Delete</DeleteButton>
      </div>
    );
  }
}
