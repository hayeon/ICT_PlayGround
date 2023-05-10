//태란님 코드
import { useState } from "react";

function Write() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // 여기서 글쓰기 작업을 수행합니다.
    // console.log(title, content);
    // localStorage.setItem('title', title);
   
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">제목:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={handleTitleChange}
        />
      </div>
      <div>
        <label htmlFor="content">내용:</label>
        <textarea
          id="content"
          value={content}
          onChange={handleContentChange}
        />
      </div>
      <button type="submit">글쓰기</button>
    </form>
  );
}

export default Write;
