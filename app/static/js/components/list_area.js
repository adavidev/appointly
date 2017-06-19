import React from "react";
import request from "superagent";
import moment from "moment";

export default class ListArea extends React.Component {
  constructor(props) {
    super(props);
    this.state = {apts:[], searchVals:"", filteredApts:[]};
  }

  componentWillMount(){
    const _this = this;
    request
      .get('/appointments')
      .set('Accept', 'application/json')
      .end(function(err, res){
        console.log(res);
        _this.setState({apts: res.body});
        _this.setState({filteredApts: res.body});
      });
  }

  changeSearchVals(event){
    this.setState({searchVals: event.target.value});
  }

  filterApts(event){
    event.preventDefault()
    if(this.state.searchVals && this.state.searchVals != ""){
      this.setState({filteredApts: this.state.apts.filter((obj)=>
        obj.desc.includes(this.state.searchVals) ||
        obj.apt_time[0].includes(this.state.searchVals) ||
        obj.apt_time[1].includes(this.state.searchVals)
      )});
    } else {
      this.setState({filteredApts: this.state.apts});
    }
  }

  render(){

    const aptList = this.state.filteredApts.map((obj, index) =>
        <tr key={index}>
        <td>{moment( obj.apt_time[0]).format("MMM Do")}</td>
          <td>{moment( obj.apt_time[1], "hh:mm:ss").format("LT")}</td>
          <td>{obj.desc}</td>
        </tr>
      );

    return (
      <div class="list-area container-fluid">
        <form class="search-apts form-inline" action="appointments" method="get">
          <div class="search form-group">
              <input class="form-control" id="search" placeholder="Search" type="text" name="search" onChange={this.changeSearchVals.bind(this)}/>
              <button id="search-submit" class="btn btn-primary" onClick={this.filterApts.bind(this)}>Search</button>
          </div>
        </form>

        <table class="table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Time</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {aptList}
          </tbody>
        </table>
      </div>
    );
  }
}
