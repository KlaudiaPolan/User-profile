import React from 'react';
import ReactDOM from 'react-dom';
import StatisticManager from './components/StatisticManager.jsx';
import AddComment from './components/AddComment.jsx';
import CommentsManager from './components/CommentsManager.jsx';

document.addEventListener('DOMContentLoaded', function(){
  class App extends React.Component{
    render(){
      return <div>
        <StatisticManager />
      </div>
    }
  }

  ReactDOM.render(
    <App />,
    document.querySelector('#app')
  );
});
