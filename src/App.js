import React, { Component, useState } from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
// import "./App.css";
import axios from "axios";
import GameCard from "./components/GameCard";

class App extends Component {
  state = {
    sorters: this.props.sorters,
    sortBy: {}
  };
  static defaultProps = {
    sorters: [
      {
        property: "Name"
      },
      {
        property: "Rank"
      }
    ]
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    axios
      .get("http://starlord.hackerearth.com/TopSellingGames")
      .then(this.onLoad);
  }
  parseData(response) {
    return response.data;
  }
  handleCheck(item) {
    alert(`
      Name: ${item.Name}
      Rank: ${item.Rank}
      Platform: ${item.Platform}
      Year: ${item.Year}
      Genre: ${item.Genre}
      Publisher: ${item.Publisher}
      Global_Sales: ${item.Global_Sales}
      
      `);
  }
  searchSpace = event => {
    let keyword = event.target.value;
    console.log("keyword", keyword);

    this.setState({
      sorters: keyword
    });
  };

  onLoad = data => {
    this.setState({
      data: this.parseData(data)
    });
  };
  handleSort = event => {
    // console.log(event)
    var byYear = event.slice(0);
    byYear.sort(function(a, b) {
      return a.Year - b.Year;
    });
    console.log(byYear);
    this.setState({
      sortBy: "Desc",
      sorters: byYear,
      event: byYear
    });
  };

  render() {
    const { data } = this.state;
    return data ? this.renderData(data) : this.renderLoading();
  }
  renderData(data) {
    if (data && data.length) {
      return (
        <div>
          <Autocomplete
            id="combo-box-demo"
            options={data}
            getOptionLabel={item => item.Name}
            style={{ width: 1200 }}
            renderInput={params => (
              <TextField
                {...params}
                label="Search here"
                id="standard-basic"
                onChange={e => this.searchSpace(e)}
              />
            )}
          />
          <button onClick={this.handleSort.bind(this, data)}>
            Year SORTED in Console
          </button>

          <button onClick={e => this.searchSpace(e)}>View Top Games</button>

          {data
            .filter(item => {
              return (
                item.Name.toString()
                  .toLowerCase()
                  .indexOf(this.state.sorters.toString().toLowerCase()) !== -1
              );
            })
            .map(item => (
              <div key={item.Rank} onClick={this.handleCheck.bind(this, item)}>
                <GameCard key={item.Rank} gameData={item.Name} data={item}>
                  {" "}
                  #{item.Rank} - {item.Name}{" "}
                </GameCard>
              </div>
            ))}
        </div>
      );
    } else {
      return <div>No items found</div>;
    }
  }

  renderLoading() {
    return <div>Loading...</div>;
  }
}

export default App;
