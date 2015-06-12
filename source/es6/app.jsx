import React     from 'react';
import Character from './character.jsx';
import ErrorMsg  from './error.jsx';
import xhr       from 'promised-xhr';

const api = {
  key: 'f30150e881221530ec4718bf68af0a18',
  url: 'http://gateway.marvel.com:80/v1/public/characters'
}

const App = React.createClass({
  getInitialState () {
    return {
      result: null
    };
  },

  sendForm: async function (event) {
    try {
      event.preventDefault();

      const character = this.refs.query.getDOMNode().value;

      this.searchCharacter(character);

      return;
    } catch (err) {
      console.log(error);
    }
  },

  searchCharacter: async function searchCharacter (character) {
    try {
      this.setState({ result: null });

      if (character === '') {
        this.setState({ result: null });
        return;
      }

      if (localStorage[character]) {
        const characterData = localStorage.getItem(character);
        this.showCharacter(JSON.parse(characterData));
        return;
      }

      const { body } = await xhr.get(api.url, {
        data: {
          apikey: api.key,
          name: character
        }
      });

      if (body.data.results.length === 0) {
        throw new Error('Character name invalid.');
      }

      const characterData = body.data.results[0];

      localStorage.setItem(character, JSON.stringify(characterData));

      this.showCharacter(characterData);

      return;
    } catch (error) {
      this.showError(error);
    }
  },

  showCharacter: async function (data) {
    const el = <Character { ...data } />;
    this.setState({
      result: el
    });
  },

  showError: async function (error) {
    console.log(error);
    const el = <ErrorMsg />;
    this.setState({
      result: el
    });
  },

  render () {
    return (
      <div>
        <div>
          <form className="query" onSubmit={ this.sendForm }>
            <input
              type="text"
              id="query"
              name="query"
              ref="query"
              placeholder="Enter the name of the Marvel character you're looking for" />
          </form>
        </div>

        <div>
          { this.state.result }
        </div>
      </div>
    );
  }
});

React.render(<App />, document.getElementById('application'));