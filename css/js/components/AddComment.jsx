import React from 'react';
import ReactDOM from 'react-dom';

class AddComment extends React.Component {
  constructor(props){
    super(props);
    this.state={
      text: 'Add a comment',
      follow_btn_show: "none",
    }
  }

  handleInputChange = (event) => {
    this.setState({
      text: event.target.value,
    });
  }

  handleInputClick = (event) => {
    this.setState({
      text: "",
      follow_btn_show: "block",
    });
  }

  handleBtnCommentClick = (event) =>{
    let now = new Date();
    fetch('http://localhost:3000/comments', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        image: "images/user.jpg",
        name: "Mike Ross33",
        content: this.state.text,
        date: now.toString()
      })
    });

    this.setState({
      text: "",
    });
    window.location.reload();
  }

  render(){
    return <div className="add_comment">
      <input type="text"
        value={this.state.text}
        onChange={this.handleInputChange}
        onClick={this.handleInputClick}
      />
      <button
        className="btn_style"
        onClick={this.handleBtnCommentClick}
        style={{display: this.state.follow_btn_show}}>
          Add comment
      </button>
    </div>
  }
}

module.exports = AddComment;
