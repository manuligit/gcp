import React from 'react';
import TaskList from './TaskList';
import './App.css';

const webviewStyle = {
  background: "#eee"
}

const App = () => (
  <div>
    <webview src="https://github.com" style={webviewStyle} partition="persist:github" />

  </div>
);

export default App;
