import React from "react";
import Button from "../components/Button.styled";
import { useNavigate } from "react-router-dom";
import SearchSchool from "../components/SearchSchool";

export default function () {
  const navigate = useNavigate();

  return (
    <>
      <h1>학교 정보</h1>
      <p>자신의 학교의 급식, 시간표 등의 정보를 알아보세요.</p>
      <p>
        <Button onClick={() => navigate("/lunch")}>급식 확인하기</Button>
        <Button onClick={() => navigate("/timetable")}>시간표 확인하기</Button>
      </p>
    </>
  );
}
