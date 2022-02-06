import React from 'react';
import defaultDataset from './dataset'
import './assets/styles/style.css'
import {AnswersList} from './components/index'

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      answers: [],
      chats: [],
      currentId: "init",
      dataset: defaultDataset,
      open: false
    }
  }

  render() {
    return (
      <section class="c-section">
        <div class="c-box">
          <AnswersList />
        </div>
      </section>
    );
  }
}

