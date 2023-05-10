import React from 'react';
import App from './Root';
import { BrowserRouter, RouterProvider } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import router from "./Routers";
const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

  root.render(
    <RouterProvider router={router}/>
);

// 만약, 내가 "/login" 주소로 가려한다면?
// 'Router.tsx' 의 router 가 실행되면서, 부모 path 의 element 인 <Root /> 가 읽힌다.(렌더링 됨)
// 그럼 리액트 라우터가 'Root.tsx' > Root() 함수 안에 있는 <Outlet /> 을 <login /> 으로 대체한다.
// 짜잔~ <login /> 이 렌더링되며 "/login" 페이지가 띄워진다.
// 즉, <Outlet /> 이 내가 render 하고자하는 route 로 바꿔주는 것
