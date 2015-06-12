import React from 'react';
import cuid  from 'cuid';

const EventItem = React.createClass({
  render () {
    return (
      <li className="character-events-list-item">
        { this.props.name }
      </li>
    );
  }
});

const InfoLink = React.createClass({
  render () {
    return (
      <a href={ this.props.url } className="character-externallink">
        { this.props.type }
      </a>
    );
  }
});

const CharacterImage = React.createClass({
  render () {
    return (
      <figure className="character-image">
        <img src={ this.props.path + '.' + this.props.extension }
          alt={ this.props.name} />
      </figure>
    );
  }
})

export default React.createClass({
  showImage () {
    if (this.props.thumbnail) {
      return (
        <CharacterImage name={ this.props.name}
          { ...this.props.thumbnail } />
      )
    } else {
      return;
    }
  },

  render () {
    return (
      <article className="character">
        { this.showImage() }

        <h2 className="character-name">
          { this.props.name }
        </h2>

        <p className="character-description">
          { this.props.description }
        </p>

        <div className="character-events">
          <h3>List of events where the character appears:</h3>
          <ul className="character-events-list">
            { this.props.events.items
              .map(event => <EventItem id={ cuid() } { ...event } />) }
          </ul>
        </div>

        <p className="characer-moreinfo">
          <span>More info in:</span>
          { this.props.urls
            .map(url => <InfoLink id={ cuid() } { ...url } />)}
        </p>
      </article>
    );
  }
});
