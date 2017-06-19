import React from "react";

export default class NewAptForm extends React.Component {

  constructor(props){
    super(props);
    this.state = {formVisible: false};
  }

  toggleFormView(event){
    var formVisible = this.state.formVisible;
    this.setState({formVisible: !formVisible});
  }

  render(){
    var formVisible = this.state.formVisible;

    return (
      <div class="new-form container-fluid">
        <div class="new-btn" hidden={formVisible}>
          <button class="new-btn btn btn-success" onClick={this.toggleFormView.bind(this)}>New</button>
        </div>

        <form class="new-apt-form" hidden={!formVisible} action="/appointments" method="post">
          <div class="form-group">
            <button id="add" type="submit" class="btn btn-success">Add</button>
            <button id="cancel" class="btn btn-danger" onClick={this.toggleFormView.bind(this)}>Cancel</button>
          </div>

          <div class="date form-group">
            <input class="form-control" placeholder="Date format: 'Jun 1 2005'" type="text" name="date"/>
          </div>
          <div class="time form-group">
            <input class="form-control" placeholder="Time format: '1:33PM'" type="text" name="time"/>
          </div>
          <div class="desc form-group">
            <input class="form-control" placeholder="Desc" type="text" name="desc"/>
          </div>
        </form>

      </div>
    );
  }
}
