import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as playlistActions from '../../actions/playlistActions';
import PlaylistThumbnail from '../common/PlaylistThumbnail';

class AllPlaylistsPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = { playlists: Object.assign([], props.playlists) };
    }

    componentWillMount() {
        this.props.actions.getAllPlaylists().then(() => {
            this.setState({ playlists: Object.assign([], this.props.playlists) });
        });
    }

    render() {
        const playlists = this.state.playlists;
        return (
            <div id="playlists-page">
                <h2>Playlists</h2>
                <div id="playlists-list">
                    {playlists.map(playlist =>
                        <Link to={"/playlist/" + playlist.id} key={playlist.id}>
                            <PlaylistThumbnail playlist={playlist}/>
                        </Link>
                    )}
                </div>
            </div>
        );
    }
}

AllPlaylistsPage.propTypes = {
    playlists: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
    return { playlists: state.allPlaylists };
}

function mapDispatchToProps(dispatch) {
    return { actions: bindActionCreators(playlistActions, dispatch) };
}

export default connect(mapStateToProps, mapDispatchToProps)(AllPlaylistsPage);