import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Avatar from 'material-ui/Avatar';
import {
  Card,
  CardHeader,
  CardMedia,
  CardTitle,
  CardText,
} from 'material-ui/Card';
import Paper from 'material-ui/Paper';
import styled from 'styled-components';

const OverlayAvatarContainer = styled.div`
  display: flex;
  alignItems: center;
`;

const OverlayNameContainer = styled.span`
  paddingLeft: 10px;
`;

const styles = {
  paper: {
    marginBottom: 8,
  },
  SubtitleOverlay: {
    paddingLeft: '50px',
  },
};

export default class FeedCard extends Component {
  static get propTypes() {
    return {
      avatarHeader: PropTypes.string,
      avatarOverlay: PropTypes.string,
      imgBody: PropTypes.string,
      message: PropTypes.string,
      subject: PropTypes.string,
      subTitleHeader: PropTypes.string,
      subTitleOverlay: PropTypes.string,
      titleHeader: PropTypes.string,
      titleOverlay: PropTypes.string,
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
    };
  }

  renderOverlay() {
    const {
      avatarOverlay,
      subTitleOverlay,
      titleOverlay,
    } = this.props;

    return (
      <CardTitle
        title={
          <OverlayAvatarContainer>
            <Avatar
              src={avatarOverlay}
              size={40}
            />
            <OverlayNameContainer>{titleOverlay}</OverlayNameContainer>
          </OverlayAvatarContainer>
        }
        subtitle={subTitleOverlay}
        subtitleStyle={styles.SubtitleOverlay}
      />
    );
  }

  render() {
    const {
      avatarHeader,
      imgBody,
      message,
      subject,
      subTitleHeader,
      titleHeader,
    } = this.props;

    return (
      <Paper style={styles.paper} zDepth={2}>
        <Card>
          <CardHeader
            title={titleHeader}
            subtitle={subTitleHeader}
            avatar={avatarHeader}
          />

          <CardMedia
            overlay={this.renderOverlay()}
          >
            <img src={imgBody} alt="" />
          </CardMedia>

          <CardTitle title={subject} />

          <CardText>{message}</CardText>
        </Card>
      </Paper>
    );
  }
}
