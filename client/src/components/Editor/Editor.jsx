/* eslint-disable react/prop-types */
import { useEffect, useState, useRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import io from 'socket.io-client'

const socket = io(`${import.meta.env.VITE_SERVER_URL}`, { transports: ["websocket"] });

function Editor({ id }) {
  const [content, setContent] = useState("");
  const quillRef = useRef(null);

  useEffect(() => {
    if (!id) return
    socket.emit('join-room', id)

    socket.on('load-document', (data) => { // initial load
      setContent(data);
    })

    socket.on('receive-changes', (data) => { // any changes made by user
      setContent(data)
    })

    return () => {
      socket.off("load-document");
      socket.off("receive-changes");
    }
  }, [id])

  const handleChange = (newContent) => {
    setContent(newContent)
    socket.emit('send-changes', { id, content })
  }

  return (
    <ReactQuill
      ref={quillRef}
      className="w-[60vw] h-[100vh] outline-none shadow-md bg-white"
      value={content}
      onChange={handleChange}
      theme="snow"
    />
  );
}

export default Editor;