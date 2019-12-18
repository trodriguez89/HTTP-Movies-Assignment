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
        const movieToEdit = props.movies.find(item => `${item.id}` === props.match.params.id)
        if(movieToEdit){
            setMovie(movieToEdit)
        }
    },[props.movies, props.match.params.id])

    const handleChanges = event => {
        event.persist();
        let value = event.target.value;
        if(event.target.value === "metascore") {
            value = parseInt(value, 10);
        }
        setMovie({
            ...movie,
            [event.target.name]: value
        })
    }

    const handleSubmit = event => {
        event.preventDefault();
        axios.put(`http://localhost:5000/api/movies/${movie.id}`, movie)
        .then(response => {
            console.log(response)
            props.setMovies(response.data)
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
                <input 
                type="text"
                name="director"
                value={movie.director}
                onChange={handleChanges}
                placeholder="Director"
                />
                <input 
                type="num"
                name="metascore"
                value={movie.metascore}
                onChange={handleChanges}
                placeholder="Metascore"
                />
                <input 
                type="text"
                name="stars"
                value={movie.stars}
                onChange={handleChanges}
                placeholder="Stars"
                />
            <button>Save Changes</button>
            </form>
        </div>
    )
}

export default UpdateMovie;
