export const getSongName = (song) => {
    return song.name;
}

export const getSongLink = (song) => {
    return song.external_urls.spotify;
}

export const getArtistName = (song) => {
    return song.artists[0].name;
}

export const getArtistLink = (song) => {
    const externalArtistLink = "https://open.spotify.com/artist/"
    return externalArtistLink + song.artists[0].id;
}

export const getAlbumName = (song) => {
    return song.album.name;
}

export const getImage = (song) => {
    return song.album.images[0].url;
}

export const getDuration = (song) => {
    const duration = song.duration_ms;
    const minutes = Math.floor(duration / 60000);
    const seconds = ((duration % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
}

export const getSongID = (song) => {
    return song.id;
}