import React, { useCallback, useEffect, useState } from "react";
import SearchSchool from "../components/SearchSchool";
import Button from "../components/Button.styled";
import config from "../config";
import Input from "../components/Input.styled";
import styled from "styled-components";
import { formatDate } from "../utils";

export default function () {
  const today = new Date();

  const [school, setSchool] = useState<any>();
  const [lunchDate, setLunchDate] = useState<string>(formatDate(today));
  const [lunch, setLunch] = useState<string[]>();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!school) return;

    setLoading(true);

    const controller = new AbortController();

    fetch(
      `https://open.neis.go.kr/hub/mealServiceDietInfo?KEY=${
        config.API_KEY
      }&Type=json&ATPT_OFCDC_SC_CODE=${
        school.ATPT_OFCDC_SC_CODE
      }&SD_SCHUL_CODE=${school.SD_SCHUL_CODE}&MLSV_YMD=${lunchDate
        .split("-")
        .join("")}&pIndex=1&pSize=10`,
      {
        signal: controller.signal,
      }
    )
      .then((res) => res.json())
      .then((data) =>
        setLunch(
          data.mealServiceDietInfo
            ? data.mealServiceDietInfo[1].row[0].DDISH_NM.split("<br/>").join(
                "\n"
              )
            : ""
        )
      )
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, [school, lunchDate]);

  return (
    <>
      <h1>학교 급식 알아보기</h1>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 20,
          flexWrap: "wrap",
          maxWidth: "90vw",
        }}
      >
        {school ? (
          <div>
            <span>선택된 학교: {school.SCHUL_NM}</span>
            <Button
              onClick={() => {
                setSchool(undefined);
                setLunch(undefined);
              }}
            >
              다시 선택
            </Button>
          </div>
        ) : (
          <SearchSchool onSelect={(s) => setSchool(s)}></SearchSchool>
        )}
        <div>
          <div>급식 날짜</div>
          <Input
            type="date"
            onChange={(e) => setLunchDate(e.target.value)}
            defaultValue={formatDate(today)}
          />
        </div>
      </div>
      <h2>급식 정보</h2>
      <LunchInfo>
        {loading ? (
          <span>로딩중...</span>
        ) : lunch ? (
          lunch
        ) : lunch === "" ? (
          <span>
            {school.SCHUL_NM}의 {lunchDate}에는 급식이 없습니다.
            {[0, 6].includes(new Date(lunchDate).getDay()) && (
              <div style={{ margin: "10px auto" }}>(토~일요일)</div>
            )}
          </span>
        ) : !school ? (
          <span>학교를 먼저 선택해 주세요.</span>
        ) : (
          <span>급식 정보가 없습니다.</span>
        )}
      </LunchInfo>
    </>
  );
}

const LunchInfo = styled.div`
  max-width: 500px;
  width: 100vw;
  white-space: pre-wrap;
  word-break: break-word;
  text-align: center;

  & span {
    color: rgb(100, 100, 100);
  }
`;
