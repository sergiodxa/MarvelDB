import React from 'react';

export default React.createClass({
  render () {
    return (
      <article className="character error">
        <p>
          The character your searching doesn't exist o can't be found in de database, check if the name is correct and search again.
        </p>
      </article>
    );
  }
})