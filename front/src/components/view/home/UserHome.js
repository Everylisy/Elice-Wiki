import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { getTags } from "./HomeData";
import styled from "styled-components";
import Goal from "./Goal";
import TagBtn from "./TagBtn";
import WeekNav from "./WeekNav";
import Header from "../Header";
import RecentList from "./RecentList";

function UserHome() {
  const [tags, setTags] = useState(null);
  const [goal, setGoal] = useState(null);
  const [isFetchCompleted, setIsFetchCompleted] = useState(false);

  useEffect(() => {
    getTags(setTags);
    setIsFetchCompleted(true);
  }, []);

  if (!isFetchCompleted) {
    return <div>로딩중</div>;
  }

  return (
    <>
      <div style={{ minHeight: "100vh", height: "auto" }}>
        <Header />
        <WeekNav setGoal={setGoal} />
        <Container>
          <ContentsSide>
            <div style={{ padding: "0 3%" }}>
              <TagBtn tags={tags} />
            </div>
          </ContentsSide>
          <Contents>
            <Outlet />
          </Contents>
          <ContentsSide>
            {goal && <Goal goal={goal} />} <RecentList />
          </ContentsSide>
        </Container>
      </div>
    </>
  );
}

export default UserHome;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: calc(100vh - 100px);
`;

const ContentsSide = styled.div`
  width: 25%;
  background-color: white;
  display: flex;
  padding: 2% 1%;
  flex-direction: column;
  align-items: center;
`;

const Contents = styled.div`
  width: 50%;
`;
