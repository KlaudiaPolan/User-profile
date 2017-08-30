import React from 'react';
import ReactDOM from 'react-dom';
import CommentsManager from './CommentsManager.jsx';
import AddComment from './AddComment.jsx';

class StatisticManager extends React.Component {
  constructor(props){
    super(props);
    this.state={
      statistics: [],
      like_heart: 'none',
      unlike_heart: 'inline-block',
      follow_btn_color: "",
      follow_btn_click: 0,
      share_address_toggle: "none",
      location: location.href,
    }
  }
  componentDidMount(){
    fetch(`http://localhost:3000/statistics`)
    .then( r => r.json() )
    .then( ans => {
      let response = this.state.statistics.slice();
      response.push(...ans)
      this.setState({
        statistics: response,
      });
    });
  }
handleHeartClick = () => {
  if(this.state.unlike_heart=="inline-block"){
    let getLikes = this.state.statistics.slice();
    getLikes[0].likes++;
    fetch(`http://localhost:3000/statistics/${1}`,{
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(getLikes[0])
    });
    this.setState({
      unlike_heart: 'none',
      like_heart: 'inline-block',
      statistics: getLikes,
    });
  } else{
      let getLikes = this.state.statistics.slice();
      getLikes[0].likes--;
      fetch(`http://localhost:3000/statistics/${1}`,{
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(getLikes[0])
      });
      this.setState({
        like_heart: 'none',
        unlike_heart: 'inline-block',
        statistics: getLikes,
      });
    }
  }
  handleFollowClick = () => {
    if(this.state.follow_btn_click==0){
      let getFollowers = this.state.statistics.slice();
      getFollowers[0].followers++;
      fetch(`http://localhost:3000/statistics/${1}`,{
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(getFollowers[0])
      });

      this.setState({
        follow_btn_color: "#002C71",
        follow_btn_click: this.state.follow_btn_click+1,
      });
    }else{
      let getFollowers = this.state.statistics.slice();
      getFollowers[0].followers--;
      fetch(`http://localhost:3000/statistics/${1}`,{
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(getFollowers[0])
      });
      this.setState({
        follow_btn_color: "#FFA640",
        follow_btn_click: 0,
      });
    }
  }
  handleShareClick = () => {
    if(this.state.share_address_toggle == "none"){
      this.setState({
        share_address_toggle: "block"
      });
    }else{
      this.setState({
        share_address_toggle: "none"
      });
    }
  }

  render(){
    const list2 = this.state.statistics.map( statistic=> {
    return <div className="component">
      <div></div>
      <img src={statistic.user_img} />
      <div className="top_component">
        <img
          onClick={this.handleShareClick}
          className="share"
          src="images/share.png" />
        <div
          className="share_address"
          style={{display: this.state.share_address_toggle}}>
            Copy this address: {this.state.location}
        </div>
        <h1>{statistic.name}</h1>
        <img
          src="images/heart.png"
          onClick={this.handleHeartClick}
          className="heart"
          style={{display: this.state.unlike_heart}}/>
        <img
          src="images/heart-active.png"
          onClick={this.handleHeartClick}
          className="heart"
          style={{display: this.state.like_heart}} />
        <h3>{statistic.address}</h3>
        <div className="statistic">
          <div className="likes">
            <p className="number">{statistic.likes}</p>
            <p className="signature">Likes</p>
          </div>
          <div className="line"></div>
          <div className="following">
            <p className="number">{statistic.following}</p>
            <p className="signature">Following</p>
          </div>
          <div className="line"></div>
          <div className="followers">
            <p className="number">{statistic.followers}</p>
            <p className="signature">Followers</p>
          </div>
        </div>
        <button
          onClick={this.handleFollowClick}
          className="btn_style"
          style={{background: this.state.follow_btn_color}}>
          Follow
        </button>
      </div>
      <CommentsManager />
      <AddComment />
    </div>
  })
  return <div>
    {list2}
  </div>
  }
}

module.exports = StatisticManager;
