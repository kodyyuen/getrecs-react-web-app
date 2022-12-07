export const authEndpoint = "https://accounts.spotify.com/authorize";

const redirectUri = "http://localhost:3000/"

const clientId = "9534d135519d4b049b481e8bc6862e40"

const scopes = [
    "user-read-currently-playing",
    "user-read-email",
    "user-read-private",
    "user-read-recently-played",
    "user-read-playback-state",
    "user-top-read",
    "user-modify-playback-state",
    "playlist-read-private",
    "user-library-read",
    "streaming"

]

export const getTokenFromUrl = () =>{
    return window.location.hash
        .substring(1)
        .split('&')
        .reduce((initial, item)=>{
            // #accessToken=mysecretkey&name=somerandomname
            let parts = item.split("=");
            initial[parts[0]] = decodeURIComponent(parts[1])

            return initial
        }, {});
}

export const loginUrl = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join("%20")}&response_type=token&show_dialog=true`