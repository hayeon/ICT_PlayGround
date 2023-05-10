import useInput from './hooks/useInput';
import React, { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [logInError, setLogInError] = useState(false);
  const [email, onChangeEmail] = useInput('');
  const [password, onChangePassword] = useInput('');

  const onSubmit = useCallback((e) => { //제출클릭시
    e.preventDefault();
    setLogInError(false);
    axios
      .post('http://localhost:8080/api/users/login', { email, password }) // 서버에 정보 요청
      .then(() => {
        // 로그인 성공 시 실행할 코드
      })
      .catch((error) => {
        setLogInError(error.response?.data?.statusCode === 401);
      });
  }, [email, password]);

  return (
    <div id="container">
      <h1>로그인</h1>
      <form onSubmit={onSubmit}>
        <label id="email-label">
          <span>이메일 주소</span>
          <div>
            <input type="email" id="email" name="email" value={email} onChange={onChangeEmail} />
          </div>
        </label>
        <label id="password-label">
          <span>비밀번호</span>
          <div>
            <input type="password" id="password" name="password" value={password} onChange={onChangePassword} />
          </div>
          {/* 비밀번호 오류 발생시 */}
          {logInError && <h3>이메일과 비밀번호 조합이 일치하지 않습니다.</h3>} 
        </label>
        <button type="submit">로그인</button>
      </form>
      <div>
        아직 회원이 아니신가요?&nbsp;
        <Link to="/signup">회원가입 하러가기</Link>
      </div>
      </div>
  );
};
export default Login;