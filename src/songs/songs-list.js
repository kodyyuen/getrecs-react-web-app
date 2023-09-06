import SongsListRow from "./songs-list-row";

export const RenderSongsList = ({ songs }) => {
  return (
    <>
      <div className="row m-0">
        <div className="col-1">
          <h5 className="font-weight-bold mb-1">#</h5>
        </div>
        <div className="col col-6-sm col-md-7">
          <h5 className="font-weight-bold mb-1">Title</h5>
        </div>
        <div className="d-none d-sm-block col-3">
          <h5 className="font-weight-bold mb-1">Album</h5>
        </div>
        <div className="d-none d-sm-block col-sm-2 col-md-1 p-0">
          <h5 className="font-weight-bold mb-1">Time</h5>
        </div>
      </div>
      <div>
        <ul className="list-group pe-0">
          {songs.map((song, idx) => (
            <SongsListRow key={song.id} {...{song, idx}} />
          ))}
        </ul>
      </div>
    </>
  );
};
