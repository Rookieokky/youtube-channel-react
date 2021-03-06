import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as playlistActions from '../../actions/playlistActions';
import VideoPlayer from '../common/VideoPlayer';
import VideoThumbnail from '../common/VideoThumbnail';

class PlaylistPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            playlist: Object.assign([], props.playlist),
            playlistInfo: Object.assign({}, props.playlistInfo),
            videoInPlaylist: props.videoInPlaylist
        };
        this.changeVideo = this.changeVideo.bind(this);
    }

    componentWillMount() {
        this.props.actions.getPlaylist(this.props.playlistId).then(() => {
            this.setState({ playlist: Object.assign([], this.props.playlist) });
        });
        this.props.actions.getPlaylistInfo(this.props.playlistId).then(() => {
            this.setState({ playlistInfo: Object.assign({}, this.props.playlistInfo) });
        });
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.playlistId != nextProps.params.id) {
            this.props.actions.getPlaylist(nextProps.params.id).then(() => {
                this.setState({ playlist: Object.assign([], this.props.playlist) });
            });
            this.props.actions.getPlaylistInfo(nextProps.params.id).then(() => {
                this.setState({ playlistInfo: Object.assign({}, this.props.playlistInfo) });
            });
        }
    }

    changeVideo(e) {
        this.setState({ videoInPlaylist: e.target.parentNode.id });
    }

    render() {
        const playlist = this.state.playlist;
        const nowPlaying = this.state.videoInPlaylist;
        if (playlist.length > 0) {
            return(
                <div id="playlist-page">
                    <h2>{this.state.playlistInfo.snippet.title}</h2>
                    <VideoPlayer videoId={playlist[nowPlaying].snippet.resourceId.videoId} videoTitle={playlist[nowPlaying].snippet.title}/>
                    <br/>
                    <div id="video-list">
                        {playlist.map(playlistItem => {
                            let video = playlistItem.snippet;
                            if (video.position == nowPlaying) {
                                return (
                                    <div className="playlist-video selected" id={nowPlaying} key={nowPlaying} onClick={this.changeVideo}>
                                        <VideoThumbnail videoId={video.resourceId.videoId}/>
                                    </div>
                                );
                            }
                            return (
                                <div className="playlist-video" id={video.position} key={video.position} onClick={this.changeVideo}>
                                    <VideoThumbnail videoId={video.resourceId.videoId}/>
                                </div>
                            );
                        })}
                    </div>
                </div>
            );
        }
        return <div>(No videos found for this playlist.)</div>;
    }
}

PlaylistPage.propTypes = {
    playlist: PropTypes.array.isRequired,
    playlistInfo: PropTypes.object.isRequired,
    playlistId: PropTypes.string.isRequired,
    videoInPlaylist: PropTypes.number.isRequired,
    actions: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
    return { 
        playlist: state.playlist,
        playlistInfo: state.playlistInfo,
        playlistId: ownProps.params.id,
        videoInPlaylist: state.videoInPlaylist
    };
}

function mapDispatchToProps(dispatch) {
    return { actions: bindActionCreators(playlistActions, dispatch) };
}

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistPage);