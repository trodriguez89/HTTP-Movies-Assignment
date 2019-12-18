import React, {useState, useEffect} from "react";
import axios from "axios";

const initialMovie = {
    id: "",
    title: "",
    director: "",
    metascore: "",
    stars: []

}

const UpdateMovie = props => {
    const [movie, setMovie] = useState(initialMovie)

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
        <div>
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
            <button>Save Changes</button>
            </form>
        </div>
    )
}

export default UpdateMovie;
