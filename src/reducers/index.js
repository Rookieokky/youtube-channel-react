import {combineReducers} from 'redux';
import ajaxCallsInProgress from './ajaxStatusReducer';
import mostRecentUpload from './mostRecentUploadReducer';
import recentUploadsPlaylist from './recentUploadsPlaylistReducer';
import allPlaylists from './allPlaylistsReducer';
import playlist from './playlistReducer';
import playlistInfo from './playlistInfoReducer';
import video from './videoReducer';
import videoInPlaylist from './videoInPlaylistReducer';

const rootReducer = combineReducers({
    ajaxCallsInProgress,
    mostRecentUpload,
    recentUploadsPlaylist,
    allPlaylists,
    playlist,
    playlistInfo,
    video,
    videoInPlaylist
});

export default rootReducer;