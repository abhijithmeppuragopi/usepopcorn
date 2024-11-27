import { useEffect, useRef, useState } from "react";
import StarRating from "./StarRating";
import { useLocalStorageState } from "./useLocalStorageState";
import { useKeyPress } from "./useKeyPress";
import { useMovies } from "./useMovies";

// const tempMovieData = [
//   {
//     imdbID: "tt1375666",
//     Title: "Inception",
//     Year: "2010",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
//   },
//   {
//     imdbID: "tt0133093",
//     Title: "The Matrix",
//     Year: "1999",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
//   },
//   {
//     imdbID: "tt6751668",
//     Title: "Parasite",
//     Year: "2019",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
//   },
// ];

// const tempWatchedData = [
//   {
//     imdbID: "tt1375666",
//     Title: "Inception",
//     Year: "2010",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
//     runtime: 148,
//     imdbRating: 8.8,
//     userRating: 10,
//   },
//   {
//     imdbID: "tt0088763",
//     Title: "Back to the Future",
//     Year: "1985",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
//     runtime: 116,
//     imdbRating: 8.5,
//     userRating: 9,
//   },
// ];

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

export default function App() {
  const [watched, setWatched] =useLocalStorageState([],'watched');
  const [query, setQuery] = useState("");
  const [selectId,setSelectId]=useState(null);
  const { movies, isLoading, error } = useMovies(query);
  
function handleSelectedMovie(id){
  setSelectId(id)

}
function handleCloseMovie(){
  setSelectId(null);
}
function handleWAtchedMovies(movie){
  setWatched((watched)=>[...watched,movie]);
  handleCloseMovie();
}
function handleDeleteMovie(id){
  setWatched(watched => watched.filter((movie)=>movie.id !== id));

}
//fetching movies using useEffect hook
  // useEffect(function(){  

  //   const controller= new AbortController();
   
  //   async function loadmovie(){
  //     try{
  //     setISLoading(true);
  //     setErr('');
  //     const movies=await fetch(`http://www.omdbapi.com/?s=${query}&apikey=72e861ae`,{signal:controller.signal});
  //     if (!movies.ok) throw new Error("something went wrong");
      
  //     const data= await movies.json();
  //     if (data.Response==='False') throw new Error("Movie Couldnt find");
  //     setMovies(data.Search); 
  // }
  //   catch(err){
      
  //     if(err.name !=="AbortError"){
  //     setErr(err.message)
  //     console.error(err.message)
  //   }
  //   } 
  //   finally{
  //     setISLoading(false);
  //   }
  // } 
  // if(!query.length){
  //   setMovies([]);
  //   setErr('')
  //   return;
    
  // }
  // loadmovie();
  // return function (){
  //   controller.abort();

  // }
  
  // },[query])

  // useEffect(function(movie){
  //   localStorage.setItem('watched',JSON.stringify(watched))

  // },[watched])
  return (
    <>
 <Navbar >
  <Logo/>
  <Searchbar query={query} setQuery={setQuery}/>
  <NumOfMovies movies={movies}/> 
  </Navbar>
 <Main>
  <Box>
  {isLoading && <Loading/>}
  {!isLoading && !error && <List movies={movies} onSelectMovie={handleSelectedMovie}/>}
  {error && <ErrorMessage message={error}/>}
  </Box>
  <Box>
    
    {selectId ? <MovieDetails selectId={selectId} onCloseMovie={handleCloseMovie} addtowatchlist={handleWAtchedMovies} watched={watched}/> :
    <>
    <MoviesYouWatched watched={watched}/>
    <ListofWatchedMovies watched={watched} handleDeleteMovie={handleDeleteMovie}/>
    </>
  }
  </Box>
 </Main>
    </>
  );
}
function Navbar({children}){
  return <nav className="nav-bar">
  {children}
</nav>
}
function Logo(){
  return <div className="logo">
  <span role="img">🍿</span>
  <h1>usePopcorn</h1>
</div>
}
function Loading(){
  return <>
  <p className="loader">Loading....</p>
  </>
}
function ErrorMessage({message}){
  return <div>
    <p className="error">{message}</p>
  </div>
}
function Searchbar({query,setQuery}){
  const inputEl=useRef(null);

useKeyPress('Enter',function(){
  if(document.activeElement===inputEl.current) return
  inputEl.current.focus();
      setQuery('')
});
  // useEffect(function(){
  //   function callback(e){
  //     if(document.activeElement===inputEl.current){
  //       return
  //     }


  //     if(e.code==='Enter'){
  //       inputEl.current.focus();
  //     console.log(inputEl.current);
  //     setQuery('')

  //     }
      
  //   }
  //   inputEl.current.focus();

  //   document.addEventListener('keydown',callback) 
  //  },[setQuery])
  
  return <input
  className="search"
  type="text"
  placeholder="Search movies..."
  value={query}
  onChange={(e) => setQuery(e.target.value)}
  ref={inputEl}
/>
}
function NumOfMovies({movies}){
  return  <p className="num-results">
  Found <strong>{movies.length}</strong> results
</p>
}
function Main({children}){
  return <main className="main">
       {children}
        
      </main>
}
function Box({children}){
  const [isOpen, setIsOpen] = useState(true);
  return <div className="box">
  <button
    className="btn-toggle"
    onClick={() => setIsOpen((open) => !open)}
  >
    {isOpen ? "–" : "+"}
  </button>
  {isOpen && (
    children
  )}
</div>

}
function List({movies,onSelectMovie})
{
  return (
    <ul className="list list-movies">
      {movies?.map((movie) => (
        <Movie movie={movie} key={movie.imdbID} onSelectMovie={onSelectMovie} />
      ))}
    </ul>
  );
}
  

function Movie({ movie, onSelectMovie }) {
  return (
    <li onClick={() => onSelectMovie(movie.imdbID)}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
}

function MovieDetails({onCloseMovie,selectId,addtowatchlist,watched}){

  const[selectedMovie,setSelectedMovie]=useState({});
  const [rating,onSetrating]=useState('');
  const {
    Title: title,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = selectedMovie;

  function handleadd(){
    const newWatchedMovie= {
      id:selectId,
      title,
      poster,
      runtime:Number(runtime?.split(" ").at(0)),
      userRating:rating,
      imdbRating:Number(imdbRating),
       };
       addtowatchlist(newWatchedMovie)
  }
  
    const isWatched=watched.map((movie)=> movie.id).includes(selectId); //checking id included in the watched list or not
    const isRated=watched.find((movie)=>movie.id===selectId)?.userRating; 
  

  useEffect(function (){
    async function fetchmovie(){
      
      const movie= await fetch(`http://www.omdbapi.com/?i=${selectId}&apikey=72e861ae`);
      const data= await movie.json();
      setSelectedMovie(data);
      
    }
    fetchmovie();
  },[selectId])

  // to listen to escape key press while displaying the movie and close the evenlistener instead of creating new listener all the time
  useKeyPress('Escape',onCloseMovie); //custom hook for keypressevent
  // useEffect(function (){
  //   function callback(e){
  //     if(e.code==='Escape'){
  //       onCloseMovie();
  //       console.log("closing");
  //     }

  //   }

  //   document.addEventListener('keydown',callback)

  //   return function(){
  //     document.removeEventListener('keydown',callback)
  //   }
  // },[onCloseMovie])

  useEffect(
    function(){
      document.title=selectedMovie.Title;

      return function (){
        document.title='usePopcorn';
      }
    }
    ,[selectedMovie]
  )

  return( 
  <div className="details">
  <header>
    <button className="btn-back" onClick={onCloseMovie}>
      &larr;
    </button>
    <img src={poster} alt={`Poster of ${title} movie`} />
    <div className="details-overview">
      <h2>{title}</h2>
      <p>
        {released} &bull; {runtime}
      </p>
      <p>{genre}</p>
      <p>
        <span>⭐️</span>
        {imdbRating} IMDb rating
      </p>
    </div>
  </header>

  {/* <p>{avgRating}</p> */}

  <section>
    <div className="rating">
    
    {isWatched? <p>You rated the movie {isRated}<span>⭐️</span> </p> :<StarRating maxrating={10} size={'20px'} onSetrating={onSetrating}/> }
      {rating>0 && <button className="btn-add" onClick={handleadd}>Add to Watchlist</button>}
    
    </div>
    <p>
      <em>{plot}</em>
    </p>
    <p>Starring {actors}</p>
    <p>Directed by {director}</p>
  </section>
</div>)
}

function MoviesYouWatched({watched}){
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));
  return  <div className="summary">
  <h2>Movies you watched</h2>
  <div>
    <p>
      <span>#️⃣</span>
      <span>{watched.length} movies</span>
    </p>
    <p>
      <span>⭐️</span>
      <span>{avgImdbRating.toFixed(2)}</span>
    </p>
    <p>
      <span>🌟</span>
      <span>{avgUserRating.toFixed(2)}</span>
    </p>
    <p>
      <span>⏳</span>
      <span>{avgRuntime.toFixed(0)} min</span>
    </p>
  </div>
</div>
}
function ListofWatchedMovies({watched,handleDeleteMovie}){
  return  (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMovie
          movie={movie}
          key={movie.id}
          handleDeleteMovie={handleDeleteMovie}
        />
      ))}
    </ul>
  )
}
function WatchedMovie({ movie, handleDeleteMovie }) {
  return (
    <li>
      <img src={movie.poster} alt={`${movie.title} poster`} />
      <h3>{movie.title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{movie.imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.runtime} min</span>
        </p>

        <button
          className="btn-delete"
          onClick={()=>handleDeleteMovie(movie.id)}
        >
          X
        </button>
      </div>
    </li>
  );
}
