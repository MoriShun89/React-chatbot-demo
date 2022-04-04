import React, { useState, useCallback } from "react";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextInput from './TextInput'

const FormDialog = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");

  const inputName = useCallback((event) => {
    setName(event.target.value)
    // this.setState({ name: event.target.value })
  }, [setName])

  const inputEmail = useCallback((event) => {
    setEmail(event.target.value)
    // this.setState({ email: event.target.value })
  }, [setEmail])

  const inputDescription = useCallback((event) => {
    setDescription(event.target.value)
    // this.setState({ description: event.target.value })
  }, [setDescription])


  const submitForm = () => {
    // const name = this.name
    // const email = this.email
    // const description = this.description

    const payload = {
      text: "お問合せがありました\n" +
            "お名前：" + name + "\n" +
            "Email：" + email + "\n" +
            "お問合せ内容：\n" + description
    }

    console.log(name)
    console.log(email)
    console.log(description)

    const url = process.env.REACT_APP_SLACK_WEBHOOK_URL

    fetch(url, {
      method: "POST",
      body: JSON.stringify(payload)
    }).then(() => {
      alert("送信が完了しました。追ってご連絡いたします！")
      // 送信後、フォームの中身を初期化
      setName("")
      setEmail("")
      setDescription("")
      // this.setState({
      //   name: "",
      //   email: "",
      //   description: ""
      // })
      return props.handleClose()
    })
  }

  return(
    <Dialog
      open={props.open}
      onClose={props.handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">お問合せフォーム</DialogTitle>
      <DialogContent>
        <TextInput 
          label={"お名前（必須）"}
          multiline={false}
          rows={1}
          value={name}
          type={"text"}
          onChange={inputName}
        />
        <TextInput 
          label={"メールアドレス（必須）"}
          multiline={false}
          rows={1}
          value={email}
          type={"email"}
          onChange={inputEmail}
        />
        <TextInput 
          label={"お問合せ内容（必須）"}
          multiline={true}
          rows={5}
          value={description}
          type={"text"}
          onChange={inputDescription}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleClose} color="primary">
          キャンセル
        </Button>
        <Button onClick={submitForm} color="primary" autoFocus>
          送信する
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default FormDialog
