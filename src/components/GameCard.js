import React, { Component } from "react";
import { CardHeader, CardContent } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import LinearProgress from "@material-ui/core/LinearProgress";
import Avatar from "@material-ui/core/Avatar";

import Chip from "@material-ui/core/Chip";

class GameCard extends Component {
  constructor(props) {
    super(props);

    console.log(props.data.Year, props.data.Genre);
    // this.props = this.props.bind(this);
  }
  render() {
    var avatar = this.props.data.Genre.toString()[0];
    console.log("Genre", this.props.data.Genre.toString()[0]);
    return (
      <div className="box">
        <Card>
          <CardHeader
            title={this.props.data.Name}
            subtitle={this.props.data.Platform}
            actAsExpander={false}
            showExpandableButton={false}
          />
          <CardContent>
            <strong>Rank: {this.props.data.Rank} </strong>

            <Chip
              avatar={<Avatar src={avatar} />}
              label={this.props.data.Genre}
            />
            {/* Year:{this.props.data.Year} */}
            <Chip
              avatar={<Avatar src={avatar} />}
              label={this.props.data.Year}
            />
          </CardContent>
        </Card>
      </div>
    );
  }
}

export default GameCard;
