import React from "react";
import ReactDOM from "react-dom";
import "./styles.css";
import { Component } from "react";

const API = "https://www.reddit.com/r/MLBStreams.json";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redditData: [],
      defaultQuery: "redux",
      text: ""
    };
  }

  componentDidMount() {
    fetch(API)
      .then(response => response.json())
      .then(data => this.setState({ redditData: data.data.children }));
  }

  renderListOfGames = threads => {
    if (threads.length === 0) {
      return <div> No baseball games going on right now. Sorry bro! </div>
    } else {
      return threads.map(hit => (
        <li key={hit.data.created_utc}>
          <a href={hit.data.url} target="_blank">
            {hit.data.title}
          </a>

          <div className="italicize">stream links will appear here</div>
        </li>
      ))
    }
  }

  render() {
    const threads = this.state.redditData.filter(
      game => game.data.link_flair_text === "Game Thread"
    );
    let d = new Date();
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ];

    return (
      <div>
        <br />
        <h2
          onClick={() => window.open("https://campusstreams.ga")}
          className="weather"
        >
          {" "}
          MLB Games for {days[d.getDay()]}, {months[d.getMonth()]} {d.getDate()}
        </h2>
        <ol className="center">
          {this.renderListOfGames(threads)}
        </ol>
        <div> </div>
      </div>
    );
  }
}

export default App;
