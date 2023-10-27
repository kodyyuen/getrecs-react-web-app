const SpotifyLogin = () => {
  const scopes = ["user-top-read", "playlist-modify-private", "playlist-read-private", "playlist-read-collaborative"];
  const str = new URLSearchParams({
    response_type: "code",
    client_id: process.env.REACT_APP_CLIENT_ID,
    scope: scopes.join(" "),
    redirect_uri: `${process.env.REACT_APP_SITE_BASE_URL}/spotify/callback`,
    show_dialog: "true",
  });

  return (
    <>
      <div className="text-center w-50 m-auto">
        <a
          className="btn btn-success"
          href={"https://accounts.spotify.com/authorize?" + str.toString()}
        >
          <i className="fa-brands fa-spotify pe-2" />
          Login with Spotify
        </a>
      </div>
    </>
  );
};

export default SpotifyLogin;
