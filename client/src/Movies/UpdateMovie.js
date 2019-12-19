import React, {useState, useEffect} from "react";
import axios from "axios";
import styled from "styled-components";


const FormStyle = styled.div`
    margin: 0 auto;
    text-align: center;
`

const Button = styled.button`
    margin-top: 5px;
    padding: 5px;
`

const UpdateMovie = props => {
    const [movie, setMovie] = useState({
        title: "",
        director: "",
        metascore: "",
        stars: []
    })


    useEffect(() => {
        axios.get(`http://localhost:5000/api/movies/${props.match.params.id}`)
        .then(response => {
            setMovie(response.data)
        })
        .catch(error => {
            console.log(error)
        })
    },[props.match.params.id])

    const handleChanges = event => {
        setMovie({
            ...movie,
            [event.target.name]: event.target.value
        })
    }

    const handleStars = event => {
        setMovie({
            ...movie,
            stars: [event.target.value]
        })
    }

    const handleSubmit = event => {
        event.preventDefault();
        axios.put(`http://localhost:5000/api/movies/${props.match.params.id}`, movie)
        .then(response => {
            console.log(response)
            setMovie(response.data)
            props.history.push(`/movies/${movie.id}`)
        })
        .catch(error => {
            console.log(error)
            
        })
    }

    return (
        <FormStyle>
            <h1>Edit Movie Info</h1>
            <form onSubmit = {handleSubmit}>
                <input 
                type="text"
                name="title"
                value={movie.title}
                onChange={handleChanges}
                placeholder = "Title"
                />
                <br />
                <input 
                type="text"
                name="director"
                value={movie.director}
                onChange={handleChanges}
                placeholder="Director"
                />
                <br />
                <input 
                type="num"
                name="metascore"
                value={movie.metascore}
                onChange={handleChanges}
                placeholder="Metascore"
                />
                <br />
                <input 
                type="text"
                name="stars"
                value={movie.stars}
                onChange={handleStars}
                placeholder="Stars"
                />
                <br />
            <Button>Save Changes</Button>
            </form>
        </FormStyle>
    )
}

export default UpdateMovie;
