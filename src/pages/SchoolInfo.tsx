import React, { useState } from "react";
import SearchSchool from "../components/SearchSchool";
import Button from "../components/Button.styled";

export default function () {
  const [school, setSchool] = useState<any>();

  const dateString = school?.FOAS_MEMRD;
  const formatted =
    dateString &&
    dateString.substring(0, 4) + "-" + dateString.substring(4, 6) + "-" + dateString.substring(6);

  return (
    <>
      <h1>학교 기본 정보</h1>
      {!school ? (
        <SearchSchool onSelect={(s) => setSchool(s)}></SearchSchool>
      ) : (
        <>
          <div>
            <h2>
              {school.SCHUL_NM}({school.ENG_SCHUL_NM})
            </h2>
          </div>
          <div>학교 종류: {school.SCHUL_KND_SC_NM}</div>
          <div>전화번호: {school.ORG_TELLNO || "데이터 없음"}</div>
          <div>팩스번호: {school.ORG_FAXNO || "데이터 없음"}</div>
          <div>홈페이지: {school.HMPG_ADRES || "데이터 없음"}</div>
          <div>개교기념일: {formatted}</div>
          <p>
            <Button onClick={() => setSchool(undefined)}>학교 다시 선택</Button>
          </p>
        </>
      )}
    </>
  );
}
