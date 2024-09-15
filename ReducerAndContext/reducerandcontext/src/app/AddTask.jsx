'use client';

import { useState } from 'react';
import { useTasksDispatch } from './TasksContext.jsx';

export default function AddTask() {
  const [text, setText] = useState('');
  const dispatch = useTasksDispatch();
  return (
    <>
      <input
        placeholder="Görev Ekle"
        value={text}
        onChange={e => setText(e.target.value)}
      />
      <button onClick={() => {
        setText('');
        dispatch({
          type: 'added',
          id: nextId++,
          text: text,
        }); 
      }}>Ekle</button>
    </>
  );
}

let nextId = 3;
