import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import MusicCard from "./MusicCard";
import AlbumCard from "./AlbumCard";
import ArtistCard from "./ArtistCard";
import AlbumTracksCard from "./AlbumTracksCard";
import NavTabs from "./NavTabs";
import NotFound from "../pages/NotFound";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import SinglePage from "../pages/SinglePage";
import SingleArtistPage from "../pages/SingleArtistPage";
import Sidebar from "../Sidebar";

export default function Musics(props) {
  const [sidebarshow, setSidebarshow] = useState(true);
  const [albumIndex, setAlbumIndex] = useState(0);
  const [artistIndex, setArtistIndex] = useState();
  const [albumsTrackIndex, setAlbumsTrackIndex] = useState(0);
  const [artistsTrackIndex, setArtistsTrackIndex] = useState(0);
  const [tracks, setTracks] = useState(null);
  const [albums, setAlbums] = useState(null);
  const [artists, setArtists] = useState(null);
  const [albumsTracks, setAlbumsTracks] = useState(null);
  const [artistsTracks, setArtistsTracks] = useState(null);
  // const [setTracksItem, setsetTracksItem] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showSongsArtist, setShowSongsArtist] = useState(false);

  useEffect(() => {
    async function getItems(urlGetItem) {
      const Items = await fetch(urlGetItem);
      return await (await Items).json();
    }
    function thenItems(url, setItemsState) {
      getItems(url).then((items) => { setItemsState(items.result) });
    }
    thenItems("http://localhost:4000/song", setTracks);
    thenItems("http://localhost:4000/album", setAlbums);
    thenItems("http://localhost:3005/artists", setArtists);
    // document.title = await `${tracks[props.trackIndex].title} now playing`
  }, []);

  async function getAlbumsTracks(index) {
    const albumTitle = albums ? albums[index].title : null;
    const albumsTracks = await fetch(
      `http://localhost:3002/tracks`
    );
    return await (await albumsTracks).json();
  }

  async function getArtistsTracks(index) {
    const artistTitle = artists ? artists[index].artistName : null;
    const artistsTracks = await fetch(
      `http://localhost:3002/tracks?artist=${artistTitle}`
    );
    return await (await artistsTracks).json();
  }

  async function handelChangeAlbumIndex(index) {
    await setAlbumIndex(index);
    await getAlbumsTracks(index).then((albumsTrack) =>
      setAlbumsTracks(albumsTrack)
    );

  }

  async function handelChangeArtistIndex(index) {
    await setArtistIndex(index);
    await getArtistsTracks(index).then((artistsTrack) =>
      setArtistsTracks(artistsTrack)
    );
  }

  function setTracksItem(customTracks, indexX) {
    props.track.src = customTracks[indexX].trackSrc;
    props.thumbnail.current.src = customTracks[indexX].thumbnail;
    props.littleThumbnail.current.src = customTracks[indexX].thumbnail;
    props.trackArtist.current.textContent = customTracks[indexX].artist;
    props.trackTitle.current.textContent = customTracks[indexX].title;
    props.trackAlbum.current.textContent = customTracks[indexX].album;
  }
  async function ChangeTrackIndex(index) {
    await props.setTrackIndex(index);
    await setTracksItem(tracks, index);
    await props.setPrevNextTrack(tracks);
    await props.PlayHandel(props.prevNextTrack, index);
  }
  // async function handelChangeAlbumsTrackIndex(index) {
  //     await setAlbumsTrackIndex(index)
  //     await setTracksItem(albumsTracks, index)
  //     await props.setPrevNextTrack(albumsTracks)
  //     await props.setTrackIndex(index)
  //     await props.PlayHandel(null)
  // }

  function sidebarHandel() {
    if (sidebarshow) {
      setSidebarshow(false);
    } else {
      setSidebarshow(true);
    }
  }
  const controllSongsArtistState = () => {
    if (!showSongsArtist) {
      setShowSongsArtist(true);
    } else {
      setShowSongsArtist(false);
    }
  };
  // const tracksCardCC = tracks
  //   ? tracks.map((tracks, index) => (
  //       <MusicCard
  //         key={tracks.id}
  //         thumbnail={tracks.thumbnail}
  //         artist={tracks.artist}
  //         title={tracks.title}
  //         index={index}
  //         handelClick={ChangeTrackIndex}
  //       />
  //     ))
  //   : null;
  const tracksCardCC = tracks
    ? tracks.map((tracks, index) => (
      <MusicCard
        key={tracks.id}
        thumbnail={tracks.thumbnail}
        title={tracks.title}
        artist={tracks.artist}
        album={tracks.album}
        genre={tracks.genre}
        year={tracks.year}
        time={tracks.time}
        index={index}
        handelClick={ChangeTrackIndex}
      />
    ))
    : null;

  const artistCardCC =
    artists && artists.length > 0
      ? artists.map((artist, index) => (
        <ArtistCard
          key={artist.id}
          profile={artist.profile}
          artistName={artist.artistName}
          artistHref={`/artists/${artist.artistName}`}
          index={index}
          handelClick={handelChangeArtistIndex}
        />
      ))
      : null;

  const artistsRouter = artists
    ? artists.map((artist, index) => (
      <Route path={`/artists/${artist.artistName}`}>
        <SingleArtistPage
          customClass="artist-thumbnail"
          albumThumbnail={artist.profile}
          albumTitle={artist.artistName}
          albumArtist={artist.genre}
          controllSongsArtistState={controllSongsArtistState}
        />
        <div className="row musics-card-row single-page-row">
          <div className="d-flex justify-content-end">
            <div onClick={(e) => controllSongsArtistState()}>
              {showSongsArtist ? (
                <span>Albums view</span>
              ) : (
                <span>Songs view</span>
              )}
            </div>
          </div>
          {!showSongsArtist && albums
            ? albums
              .filter((val) => {
                if (
                  val.artist
                    .toLowerCase()
                    .includes(artist.artistName.toLowerCase())
                ) {
                  return val;
                } else {
                  return null;
                }
              })
              .map((val, index) => {
                return (
                  <AlbumCard
                    key={val.id}
                    thumbnail={val.thumbnail}
                    artist={val.artist}
                    title={val.title}
                    albumHref={`/albums/${val.title}`}
                    index={index}
                    handelClick={handelChangeAlbumIndex}
                  />
                );
              })
            : null}
          {showSongsArtist && tracks
            ? tracks
              .filter((val) => {
                if (
                  val.artist
                    .toLowerCase()
                    .includes(artist.artistName.toLowerCase())
                ) {
                  return val;
                } else {
                  return null;
                }
              })
              .map((val, index) => {
                async function getArtistsTracks(index) {
                  const artistTitle = artist.artistName;
                  const albumsTracks = await fetch(
                    `http://localhost:3002/tracks?artist=${artistTitle.toLowerCase()}`
                  );
                  return await (await albumsTracks).json();
                }
                async function handelChangeAlbumTracksIndex(index) {
                  // await setAlbumIndex(index);
                  await getArtistsTracks(index).then((albumsTrack) =>
                    props.setPrevNextTrack(albumsTrack)
                  );
                  await console.log(props.prevNextTrack);
                }
                return (
                  <AlbumTracksCard
                    key={val.id}
                    thumbnail={`../${val.thumbnail}`}
                    artist={val.artist}
                    title={val.title}
                    index={index}
                    year={val.year}
                    time={val.time}
                    handelClick={async (index) => {
                      await handelChangeAlbumTracksIndex();
                      await props.setTrackIndex(index);
                      // await setTracksItem(val, index)
                      props.track.src = await val.trackSrc;
                      props.thumbnail.current.src = await val.thumbnail;
                      props.littleThumbnail.current.src =
                        await val.thumbnail;
                      props.trackArtist.current.textContent =
                        await val.artist;
                      props.trackTitle.current.textContent =
                        await val.title;
                      props.trackAlbum.current.textContent =
                        await val.album;

                      await props.PlayHandel(props.prevNextTrack, index);
                    }}
                  />
                );
              })
            : null}
        </div>
      </Route>
    ))
    : null;

  const albumsRouter = albums
    ? albums.map((album, index) => (
      <Route path={`/albums/${album.title}`}>
        {/* <div>{album.title}</div> */}
        <SinglePage
          customClass="album-thumbnail"
          albumThumbnail={album.thumbnail}
          albumTitle={album.title}
          albumArtist={album.artist}
        />

        <div className="row musics-card-row single-page-row">
          {tracks
            ? tracks
              .filter((val) => {
                if (
                  val.album
                    .toLowerCase()
                    .includes(album.title.toLowerCase())
                ) {
                  return val;
                } else {
                  return null;
                }
              })
              .map((val, index) => {
                async function getAlbumsTracks(index) {
                  const albumTitle = album.title;
                  const albumsTracks = await fetch(
                    `http://localhost:4000/song/${albumTitle.toLowerCase()}`
                  );
                  return await (await albumsTracks).json();
                }
                async function handelChangeAlbumTracksIndex(index) {
                  // await setAlbumIndex(index);
                  await getAlbumsTracks(index).then((albumsTrack) =>{
                    props.setPrevNextTrack(albumsTrack.songs)
                });
                  await console.log(props.prevNextTrack);
                }
                return (
                  <AlbumTracksCard
                    key={val.id}
                    thumbnail={`../${val.thumbnail}`}
                    artist={val.artist}
                    title={val.title}
                    index={index}
                    year={val.year}
                    time={val.time}
                    handelClick={async (index) => {
                      await handelChangeAlbumTracksIndex();
                      await props.setTrackIndex(index);
                      // await setTracksItem(val, index)
                      props.track.src = await val.trackSrc;
                      props.thumbnail.current.src = await val.thumbnail;
                      props.littleThumbnail.current.src =
                        await val.thumbnail;
                      props.trackArtist.current.textContent =
                        await val.artist;
                      props.trackTitle.current.textContent =
                        await val.title;
                      props.trackAlbum.current.textContent =
                        await val.album;
                      // await props.setPrevNextTrack(tracks);
                      // console.log(val.title)
                      await props.PlayHandel(props.prevNextTrack, index);
                    }}
                  />
                );
              })
            : //     .forEach(val => {
            //         mapd.push({
            //             id: val.id,
            //             trackSrc: val.trackSrc,
            //             artist: val.artist,
            //             title: val.title,
            //             album: val.album
            //         })
            //     })
            //     : null}
            // {mapd ? mapd
            null}
        </div>
      </Route>
    ))
    : null;
  async function handelAll(index) {
    const albumTitle = albums[index].title;
    const albumsTracks = await fetch(
      `http://localhost:3002/tracks?album=${albumTitle.toLowerCase()}`
    );
    console.log(albumsTracks);
    return await (await albumsTracks).json();

  }
  async function ddd(index) {
    // await setAlbumIndex(index);

    await handelAll(index).then((albumsTrack) =>
      props.setPrevNextTrack(albumsTrack)
    );
    await console.log(props.prevNextTrack);
    await props.PlayHandel(props.prevNextTrack, 0);
    console.log(index);
  }
  const albumsCards = albums
    ? albums.map((albums, index) => (
      <AlbumCard
        key={albums.id}
        thumbnail={albums.thumbnail}
        artist={albums.artist}
        title={albums.title}
        albumHref={`/albums/${albums.title}`}
        index={index}
        handelClick={handelChangeAlbumIndex}
        handelAll={ddd}
        sidebarshow={sidebarshow}
      />
    ))
    : null;
  return (
    <>
      <Router>
        <div
          style={props.showPlayer ? { height: "85vh" } : { height: "100vh" }}
          className="container-fluid main-musics-container"
        >
          <div className="row">
            <Sidebar
              showPlayer={props.showPlayer}
              sidebarshow={sidebarshow}
              sidebarHandel={sidebarHandel}
              setSearchTerm={setSearchTerm}
            />

            <div
              className={`musics-container ${sidebarshow
                ? "musics-container-little-width"
                : "musics-container-medum-width"
                }`}
              id="size2"
            >
              <Route path="/artists">{artistsRouter}</Route>
              <Route path="/albums">{albumsRouter}</Route>
              <div className="row page-title-row">
                <Route path="/my-musics">
                  <div className="col-6">
                    <h1 className="page-title">My Musics</h1>
                  </div>
                </Route>
                <div className="col-6">
                  <div className="logo-container">
                    <Link to="/">
                      <img
                        src="/assets/img/logo/logo.png"
                        className="logo"
                        alt=""
                      />
                    </Link>
                  </div>
                </div>
              </div>
              {/* <NavTabs /> */}
              <Route path="/my-musics">
                <NavTabs />
              </Route>
              {/* <NavTabs /> */}
              <div className="row musics-card-row  position-relative">
                <div
                  className={`${props.sidebarshow ? "col-12 col-lg-10" : "col-12"
                    } `}
                >
                  {tracks <= 0 || albums <= 0 ? (
                    <Loader
                      type="Audio"
                      color="#00BFFF"
                      height={200}
                      width={200}
                      timeout={5000} //3 secs
                    />
                  ) : null}
                  <Switch>
                    <Route path="/" exact>
                      <h1>
                        صفحه اصلی !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                      </h1>
                    </Route>
                    <Route path="/albums"></Route>
                    <Route path="/artists"></Route>

                    <Route path="/my-musics/songs">
                      <div className="row single-page-row pr-1vw">
                        <div className="col">
                          <table></table>
                          {tracksCardCC}
                        </div>
                      </div>
                    </Route>
                    <Route path="/my-musics/artists">
                      <div className="row single-page-row">{artistCardCC}</div>
                    </Route>

                    <Route path="/my-musics/albums" exact>
                      <div className="row single-page-row">{albumsCards}</div>
                    </Route>

                    <Route path="/search">
                      <h1 className="title">Results for "{searchTerm}"</h1>
                      <h2>albums</h2>
                      <div className="row single-page-row">
                        {albums
                          ? albums
                            .filter((val) => {
                              if (searchTerm === "") {
                                return val;
                              } else if (
                                val.title
                                  .toLowerCase()
                                  .includes(searchTerm.toLowerCase())
                              ) {
                                return val;
                              }
                            })
                            .map((val, index) => {
                              return (
                                <AlbumCard
                                  key={val.id}
                                  thumbnail={val.thumbnail}
                                  artist={val.artist}
                                  title={val.title}
                                  albumHref={`/albums/${val.title}`}
                                  index={index}
                                  handelClick={handelChangeAlbumIndex}
                                />
                              );
                            })
                          : null}
                      </div>
                      <h2>songs</h2>
                      {tracks
                        ? tracks
                          .filter((val) => {
                            if (searchTerm === "") {
                              return val;
                            } else if (
                              val.title
                                .toLowerCase()
                                .includes(searchTerm.toLowerCase())
                            ) {
                              return val;
                            }
                            return val;
                          })
                          .map((val, key, index) => {
                            return (
                              <MusicCard
                                key={val.id}
                                src={val.thumbnail}
                                artist={val.artist}
                                title={val.title}
                                index={index}
                                handelClick={ChangeTrackIndex}
                              />
                            );
                          })
                        : null}
                    </Route>

                    <Route path="/my-musics" exact>
                      <div className="row single-page-row">
                        <h2>Albums</h2>
                        {albumsCards}
                        <h2>Songs</h2>
                        {tracksCardCC}
                        <h2>Artists</h2>
                        {artistCardCC}
                      </div>
                    </Route>
                    {/* <Route path="/mm" exact>
                      <Mm/>
                    </Route> */}
                    {/* <Route path="/404" >
                                        dsfdsfsda
                                    </Route>
                                    <Redirect to="/404" /> */}
                    <Route component={NotFound} />
                  </Switch>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Router>
    </>
  );
}
