import React from 'react';
import ReactDOM from 'react-dom';

class CommentsManager extends React.Component {
  constructor(props){
    super(props);
    this.state={
      comments: [],
      show_comments: "second_component",
      text_hide_comments: '',
      hide: 0,
    }
  }

  componentDidMount(){
    fetch(`http://localhost:3000/comments`)
    .then( r => r.json() )
    .then( ans => {
      let response = this.state.comments.slice();
      response.push(...ans)
      this.setState({
        comments: response,
      });
    });

  }

  handleHideClick = () => {
    if(this.state.hide==0){
      this.setState({
        show_comments: "second_component show_comments",
        hide: 1,
      });
      } else{
        this.setState({
          show_comments: "second_component",
          hide: 0,
        });
      }
  }
  render(){
    const list = this.state.comments
     .sort(function(obj1, obj2){
        let data1=new Date(obj1.date);
        let data2=new Date(obj2.date);
        if((data1 - data2)>0){
            return -1;
          }
        else if((data1 - data2)<0) {
            return 1;
        } else {
            return 0;
        }
      })
    .map( comment=> {
      let now = new Date();
      let last = new Date(comment.date);
      if(now.getYear()==last.getYear()){
        if(now.getMonth()==last.getMonth()){
          if(now.getDate()==last.getDate()){
            var day = 'today';
          }else{
            var day =now.getDate()-last.getDate()+"D";
          }
        }else{
          var day =now.getMonth()-last.getMonth()+"M";
        }
      }else{
        var day =now.getYear()-last.getYear()+"Y";
      }

      return <div key={comment.id}>
        <img className="comment_img" src={comment.image} />
        <p className="comment_name">{comment.name}</p>
        <p className="comment_date">{day}</p>
        <p className="comment_content">{comment.content}</p>
        <hr />
      </div>
    });

    let list_print=[];
    if(this.state.hide==0){
      for(let i=0;i<3;i++){
        list_print[i]=list[i];
      }
    } else{
      list_print=list;
    }

    return <div className={this.state.show_comments}>
    <p onClick={this.handleHideClick} className="comment_hide">
      {(this.state.hide==0) ? "Show comments ("+(this.state.comments.length-3)+")" : "Hide comments" }
    </p>
    {list_print}
  </div>
  }
}

module.exports = CommentsManager;
