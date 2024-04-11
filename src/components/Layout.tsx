import React, { PropsWithChildren } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

export default function ({ children }: PropsWithChildren<{}>) {
  return (
    <Wrapper>
      <header>
        <Navbar>
          <Link to="/" className="brand">
            School Info
          </Link>
          <div>
            <Link to="/lunch">급식 정보</Link>
            <Link to="/timetable">시간표</Link>
            <Link to="/scinfo">학교 기본 정보</Link>
          </div>
        </Navbar>
      </header>
      <Main>{children}</Main>
      <Footer>
        <p>
          Source on <a href="https://github.com/ohbeomho/school-info">GitHub</a>.
        </p>
      </Footer>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Navbar = styled.nav`
  padding: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.15);

  & .brand {
    color: black;
    font-size: 30px;
  }

  & > div > a {
    margin: 0 10px;
  }
`;

const Main = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const Footer = styled.footer`
  text-align: center;
  background-color: rgb(130, 130, 130);
  color: rgb(180, 180, 180);
`;
