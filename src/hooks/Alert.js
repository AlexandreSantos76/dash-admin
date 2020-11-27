import React, {useState, useEffect} from 'react'
import {Alert} from 'reactstrap'

export function FormAlert(props){
    const [visible, setVisible] = useState(props.visible);
    const [msg, setMsg] = useState("")
    const [color, setColor] = useState(props.color)
    const onDismiss = () => setVisible(false);
    useEffect(() => {
      setVisible(props.visible)
      setMsg(props.msg)
      setColor(props.color)
    }, [props])
    return (
      <Alert color={color} isOpen={visible} toggle={onDismiss}>
        {msg}
      </Alert>
    );
  }