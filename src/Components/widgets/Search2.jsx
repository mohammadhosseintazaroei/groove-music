import React, { useState } from 'react'
// import './App.css';
// import JSONDATA from './MOCK_DATA.json'
import MusicCard from './MusicCard';

function Search(props) {
    const [searchTerm, setSearchTerm] = useState('')
    return (
        <div className="App">
            {/* <form to="/search"> */}
                <i className="far fa-search search-icon position-absolute"></i>
                <input onChange={e => setSearchTerm(e.target.value)} type="text" id="searchInput" className="search-box" placeholder="search" />
            {/* </form> */}
            {/* <input type="text" placeholder="seach..." onChange={e => setSearchTerm(e.target.value)} /> */}
            {props.tracks ? props.tracks.filter((val) => {
                if (searchTerm == "") {
                    return val
                }
                else if (val.title.toLowerCase().includes(searchTerm.toLowerCase())) {
                    return val;
                }
                console.log(props.tracks);

            }).map((val, key , index) => {
                return (
                    <>
                        {/* <div> {val.title} </div> */}
                        <MusicCard
                            key={val.id}
                            src={val.thumbnail}
                            artist={val.artist}
                            title={val.title}
                            index={index}
                            handelClick={props.handelChangeTrackIndex}
                        />
                    </>
                )

            }) : null}
        </div>
    );

}
export default Search;