import React from "react";

import NewAptForm from "./new_apt_form";
import ListArea from "./list_area";

export default class Appointments extends React.Component {
  render(){
    return (
      <div class="">
        <NewAptForm/>

        <ListArea/>
      </div>
    );
  }
}
