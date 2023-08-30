const truncate = (str) => {
  return str.length > 30 ? str.substring(0, 30) + "..." : str;
}
export const getSongName = (song) => {
  return truncate(song.name);
};

export const getSongLink = (song) => {
  return song.external_urls.spotify;
};

export const getArtistName = (song) => {
  return truncate(song.artists[0].name);
};

export const getArtistLink = (song) => {
  const externalArtistLink = "https://open.spotify.com/artist/";
  return externalArtistLink + song.artists[0].id;
};

export const getArtistsLinks = (song) => {
  const len = song.artists.length;
  return (
    <>
      {song.artists.map((item, idx) => (
        <>
          <a href={item.external_urls.spotify} target="_blank" rel="noreferrer">
            {truncate(item.name)}
          </a>
          {idx < len - 1 ? ", " : ""}
        </>
      ))}
    </>
  );
};

export const displayArtists = (song) => {
  const artist_links = getArtistsLinks(song);
  return <></>;
};

export const getAlbumName = (song) => {
  return truncate(song.album.name);
};

export const getImage = (song) => {
  return song.album.images[0].url;
};

export const getDuration = (song) => {
  const duration = song.duration_ms;
  const minutes = Math.floor(duration / 60000);
  const seconds = ((duration % 60000) / 1000).toFixed(0);
  return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
};

export const getSongID = (song) => {
  return song.id;
};
