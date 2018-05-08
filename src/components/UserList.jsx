import React from "react";
import ReactDOM from "react-dom";

class UserList extends React.Component {
    constructor() {
        super();
        this.state = {}
    }

    handleOnClick() {
        let div = $("#user-list-div");
        let url = "/test";
        $.get(url, function(data, status){
            console.log(data);
            alert("数据: " + data[0].name + "\n状态: " + status);
        });
    }

    render() {
        return <div id="user-list-div" onClick={this.handleOnClick}> user list div. </div>;
    }
}

module.exports = UserList;

