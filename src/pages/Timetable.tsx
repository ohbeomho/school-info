import React, { useEffect, useState } from "react";
import Button from "../components/Button.styled";
import SearchSchool from "../components/SearchSchool";
import Input from "../components/Input.styled";
import { formatDate } from "../utils";
import Select from "../components/Select.styled";
import styled from "styled-components";
import config from "../config";

type SchoolTypes = "high" | "middle" | "elementary";

class Timetable {
  fetchURL: string;

  constructor(schoolType: SchoolTypes, apiKey: string) {
    const s = schoolType === "elementary" ? "els" : schoolType === "middle" ? "mis" : "his";
    this.fetchURL = `https://open.neis.go.kr/hub/${s}Timetable?KEY=${apiKey}&Type=json&pIndex=1&pSize=100`;
  }

  getTimetable(
    scCode: string,
    schoolCode: string,
    grade: number,
    classNum: number,
    date: string,
    signal?: AbortSignal
  ) {
    const dateString = date.split("-").join("");

    return new Promise<any>((resolve, reject) => {
      fetch(
        this.fetchURL +
          `&ATPT_OFCDC_SC_CODE=${scCode}&SD_SCHUL_CODE=${schoolCode}&GRADE=${grade}&CLASS_NM=${classNum}&ALL_TI_YMD=${dateString}`,
        {
          signal
        }
      )
        .then((res) => res.json())
        .then((data) => resolve(data))
        .catch((err: Error) => reject(err));
    });
  }
}

export default function () {
  const today = new Date();

  const [school, setSchool] = useState<any>();
  const [schoolType, setSchoolType] = useState<SchoolTypes>("elementary");
  const [grade, setGrade] = useState<number>(1);
  const [classNum, setClassNum] = useState<number>(1);
  const [timetableDate, setTimetableDate] = useState<string>(formatDate(today));
  const [timetable, setTimetable] = useState<any[]>();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!school) return;

    setLoading(true);

    const controller = new AbortController();

    const t = new Timetable(schoolType, config.API_KEY);
    t.getTimetable(
      school.ATPT_OFCDC_SC_CODE,
      school.SD_SCHUL_CODE,
      grade,
      classNum,
      timetableDate,
      controller.signal
    )
      .then((data) => {
        const s = schoolType === "elementary" ? "els" : schoolType === "middle" ? "mis" : "his";
        if (!data[s + "Timetable"]) {
          setTimetable(undefined);
          return;
        }

        const list = data[s + "Timetable"][1].row;
        setTimetable(
          list.map((v: any) => ({
            PERIO: v.PERIO,
            ITRT_CNTNT: v.ITRT_CNTNT.startsWith("-") ? v.ITRT_CNTNT.substring(1) : v.ITRT_CNTNT
          }))
        );
      })
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, [school, schoolType, grade, classNum, timetableDate]);

  useEffect(() => {
    if (!school) return;

    if (school.SCHUL_NM.endsWith("초등학교")) setSchoolType("elementary");
    else if (school.SCHUL_NM.endsWith("중학교")) setSchoolType("middle");
    else if (school.SCHUL_NM.endsWith("고등학교")) setSchoolType("high");
  }, [school]);

  const rows = timetable?.map((v, index) => (
    <tr key={index}>
      <td>{v.PERIO}교시</td>
      <td>{v.ITRT_CNTNT}</td>
    </tr>
  ));

  return (
    <>
      <h1>학교 시간표 알아보기</h1>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 20 }}>
        {school ? (
          <div>
            <span>선택된 학교: {school.SCHUL_NM}</span>
            <Button
              onClick={() => {
                setSchool(undefined);
                setTimetable(undefined);
              }}
            >
              다시 선택
            </Button>
          </div>
        ) : (
          <SearchSchool onSelect={(s) => setSchool(s)}></SearchSchool>
        )}
        <div>
          <div>시간표 날짜</div>
          <Input
            type="date"
            onChange={(e) => setTimetableDate(e.target.value)}
            defaultValue={timetableDate}
          />
        </div>
        <div>
          <div>학교</div>
          <Select onChange={(e) => setSchoolType(e.target.value as SchoolTypes)} value={schoolType}>
            <option value="elementary">초등학교</option>
            <option value="middle">중학교</option>
            <option value="high">고등학교</option>
          </Select>
          <br />
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 20 }}>
            <div>
              <div>학년</div>
              <Input
                type="number"
                defaultValue={grade || 1}
                onChange={(e) => setGrade(e.target.valueAsNumber)}
                min={1}
                max={schoolType !== "elementary" ? 3 : 6}
              />
            </div>
            <div>
              <div>반</div>
              <Input
                type="number"
                defaultValue={classNum || 1}
                onChange={(e) => setClassNum(e.target.valueAsNumber)}
                min={1}
                max={50}
              />
            </div>
          </div>
        </div>
      </div>
      <h2>시간표 정보</h2>
      <TimetableInfo>
        {loading ? (
          <span>로딩중...</span>
        ) : timetable ? (
          <table>
            <thead>
              <tr>
                <td>교시</td>
                <td>수업내용</td>
              </tr>
            </thead>
            <tbody>{rows}</tbody>
          </table>
        ) : timetable === "" ? (
          <span>
            {school.SCHUL_NM}의 {timetableDate}에는 수업이 없습니다.
          </span>
        ) : !school ? (
          <span>학교를 먼저 선택해 주세요.</span>
        ) : (
          <span>시간표 정보가 없습니다.</span>
        )}
      </TimetableInfo>
    </>
  );
}

const TimetableInfo = styled.div`
  max-width: 500px;
  width: 100vw;
  text-align: center;

  & table {
    border-collapse: collapse;
    border-radius: 8px;
    margin: auto;
  }

  & table td {
    border: 1px solid rgb(100, 100, 100);
    padding: 4px;
  }

  & table thead td {
    background-color: rgb(200, 200, 200);
  }

  & span {
    color: rgb(100, 100, 100);
  }
`;
