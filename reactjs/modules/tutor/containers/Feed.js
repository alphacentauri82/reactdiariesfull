import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actions } from '../../../redux';

import FeedCard from '../../shared/components/card/feed_card';

class Feed extends Component {
  static get propTypes() {
    return {
      actions: PropTypes.object.isRequired,
      events: PropTypes.array,
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
    };
  }

  componentDidMount() {
    this.initialFetch();
  }

  initialFetch() {
    this.setState({ isLoading: true }, async () => {
      this.props.actions.getFeedEvents();
      this.setState({
        isLoading: false,
      });
    });
  }

  renderFeedCard() {
    return this.props.events.map((item, index) => {
      const {
        professor,
        pupil,
        img_event_url,
        subject,
        message,
      } = item;
      return (
        <FeedCard
          key={index}
          avatarHeader={professor.avatar_url}
          titleHeader={`${professor.first_name} ${professor.last_name} - ${professor.subject_matter}`}
          subTitleHeader={professor.date}
          avatarOverlay={pupil.avatar_url}
          titleOverlay={`${pupil.first_name} ${pupil.last_name}`}
          subTitleOverlay={pupil.school}
          imgBody={img_event_url}
          subject={subject}
          message={message}
        />
      );
    });
  }

  render() {
    return (
      <div>
        { this.state.isLoading ?
          <h1>Loading ...</h1> :
          this.renderFeedCard()
        }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    events: state.tutor.events,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Feed);
