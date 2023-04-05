import React, { useCallback, useState } from "react";
import config from "../config";
import Button from "./Button.styled";
import Input from "./Input.styled";
import styled from "styled-components";

interface SearchSchoolProps {
  onSelect: (school: any) => void;
}

export default function ({ onSelect }: SearchSchoolProps) {
  const [schools, setSchools] = useState<any[]>();
  const [loading, setLoading] = useState<boolean>(false);
  const search = useCallback(
    (searchText: string) => {
      if (loading || !searchText) return;

      setLoading(true);

      fetch(
        `https://open.neis.go.kr/hub/schoolInfo?KEY=${
          config.API_KEY
        }&Type=json&SCHUL_NM=${encodeURIComponent(searchText)}`
      )
        .then((res) => res.json())
        .then((data) => data.schoolInfo && setSchools(data.schoolInfo[1].row))
        .finally(() => setLoading(false));
    },
    [loading]
  );
  const select = useCallback(
    (index: number) => {
      if (!schools || !schools[index]) return;

      onSelect(schools[index]);
    },
    [schools]
  );

  const searchResult =
    schools &&
    schools.map((school, index) => (
      <School key={index} onClick={() => select(index)}>
        <span style={{ color: "rgb(100, 100, 100)" }}>{school.LCTN_SC_NM}</span> - {school.SCHUL_NM}
      </School>
    ));

  return (
    <div>
      <div>학교 검색</div>
      <form
        onSubmit={(e) => {
          if (loading) return;

          e.preventDefault();
          search(new FormData(e.target as HTMLFormElement).get("searchText")?.toString() || "");
        }}
      >
        <Input name="searchText" required></Input>
        <Button type="submit">검색</Button>
      </form>
      <SchoolList>{loading ? <li className="m">로딩중...</li> : searchResult}</SchoolList>
    </div>
  );
}

const School = styled.li`
  padding: 10px;
  margin: 5px 0;
  cursor: pointer;
  border-radius: 8px;
  transition: all 0.2s;

  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
    translate: 0 2px;
  }

  &:active {
    background-color: rgba(0, 0, 0, 0.2);
  }
`;

const SchoolList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  max-height: 200px;
  overflow: auto;

  & .m {
    color: rgb(100, 100, 100);
  }
`;
