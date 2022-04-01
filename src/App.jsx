import React, { useState, useEffect, useCallback } from 'react';
import './assets/styles/style.css'
import {AnswersList, Chats} from './components/index'
import FormDialog from './components/Forms/FormDialog';
import { db } from './firebase/index'
// 【Firebase ver.9の書き方】
import { collection, getDocs } from 'firebase/firestore'

const App = () => {
  const [answers, setAnswers] = useState([]);
  const [chats, setChats] = useState([]);
  const [currentId, setCurrentID] = useState("init");
  const [dataset, setDataset] = useState({});
  const [open, setOpen] = useState(false);

  const displayNextQuestion = (nextQuestionId, nextDataset) => {
    addChats({
      text: nextDataset.question,
      type: 'question'
    })

    setAnswers(nextDataset.answers)
    setCurrentID(nextQuestionId)
  }

  const selectAnswer = (selectedAnswer, nextQuestionId) => {
    switch (true) {
      case (nextQuestionId === "contact") :
        handleClickOpen();
        break;

      case (/^https:*/.test(nextQuestionId)) :
        const a = document.createElement("a");
        a.href = nextQuestionId;
        a.target = "_blank"
        a.click();
        break;
        
      default :
        addChats({
          text: selectedAnswer,
          type: 'answer'
        })

        setTimeout(() => displayNextQuestion(nextQuestionId, dataset[nextQuestionId]), 1000);
        break;
    }
  }

  const addChats = (chat) => {
    setChats(prevChats => {
      return [...prevChats, chat]
    })
  }

  const handleClickOpen = () => {
    setOpen(true)
  };

  const handleClose = useCallback(() => {
    setOpen(false)
  }, [setOpen]);

  useEffect(() => {
    (async() => {
      const initDataset = {};

      // 【Firebase ver.8の書き方（講座の内容）】
      // await db.collection('questions').get().then((snapshots) => {
      //   snapshots.forEach((doc) => {
      //     const id = doc.id
      //     const data = doc.data()
      //     dataset[id] = data
      //   })
      // })

      // 【Firebase ver.9の書き方】
      // 参考：https://tech-blog.cloud-config.jp/2021-11-12-firebasev9/#%E2%96%A1_v9_SDK
      await getDocs(collection(db, 'questions')).then((snapshots) => {
        snapshots.forEach((doc) => {
          const id = doc.id
          const data = doc.data()
          initDataset[id] = data
        })
      })

      setDataset(initDataset)
      displayNextQuestion(currentId, initDataset[currentId])
    })()
  // useEffect has a missing dependencyのwarningを解消する
  // 参考：https://zenn.dev/mackay/articles/1e8fcce329336d
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // 毎回のレンダリング時に実行
  useEffect(() => {
    const scrollArea = document.getElementById("scroll-area")
    if(scrollArea) {
      scrollArea.scrollTop = scrollArea.scrollHeight
    }
  })

  return (
    <section class="c-section">
      <div class="c-box">
        <Chats chats={chats} />
        <AnswersList 
          answers={answers} 
          select={selectAnswer}
        />
        <FormDialog 
          open={open} 
          handleClose={handleClose}
        />
      </div>
    </section>
  );
}

export default App

