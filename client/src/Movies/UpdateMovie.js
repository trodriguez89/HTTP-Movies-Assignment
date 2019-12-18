import React, {useState, useEffect} from "react";
import Axios from "axios";

// const initialMovie = {
//     title: "",
//     director: "",

// }

const UpdateMovie = props => {
    const [movie, setMovie] = useState({
        title: "",
        director: "",
        metascore: 0,
        stars: []
    })

    useEffect(() => {
        const movieToEdit = props.movies.find(item => `${item.id}` === props.match.params.id)
        if(movieToEdit){
            setMovie(movieToEdit)
        }
    },[props.movies, props.match.params.id])

    const handleChanges = event => {
        setMovie({
            [event.target.name]: event.target.value
        })
    }

    const handleSubmit = event => {

    }

    return (
        <div>
            <form>
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
