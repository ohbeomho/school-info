import React, { useState } from "react";
import SearchSchool from "../components/SearchSchool";
import Button from "../components/Button.styled";
import styled from "styled-components";

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
          <SchoolInfoTable>
            <tr>
              <td>학교 종류</td>
              <td>{school.SCHUL_KND_SC_NM}</td>
            </tr>
            <tr>
              <td>전화번호</td>
              <td>{school.ORG_TELNO || "데이터 없음"}</td>
            </tr>
            <tr>
              <td>팩스번호</td>
              <td>{school.ORG_FAXNO || "데이터 없음"}</td>
            </tr>
            <tr>
              <td>홈페이지</td>
              <td>
                {school.HMPG_ADRES ? (
                  <a href={school.HMPG_ADRES}>{school.HMPG_ADRES}</a>
                ) : (
                  "데이터 없음"
                )}
              </td>
            </tr>
            <tr>
              <td>개교기념일</td>
              <td>{formatted}</td>
            </tr>
          </SchoolInfoTable>
          <p>
            <Button onClick={() => setSchool(undefined)}>학교 다시 선택</Button>
          </p>
        </>
      )}
    </>
  );
}

const SchoolInfoTable = styled.table`
  border-collapse: collapse;
  margin: 0 auto;

  & td {
    border: 1px solid rgb(100, 100, 100);
    text-align: center;
    padding: 4px;
  }

  & tr td:first-child {
    background-color: rgb(200, 200, 200);
  }
`;
