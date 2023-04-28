import React from "react";
import styled, { css } from "styled-components";
import { Link } from "gatsby";

import { Container } from "./Grid";

const ScHeader = styled.header`
  font-family: "Inter", sans-serif;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 98;
  background: #0b0b0f;
`;

const ScNavBar = styled.nav`
  display: flex;
  align-items: center;
  height: 64px;
`;

const ScLogo = styled(Link)`
  display: flex;
  align-items: center;
  font-weight: bold;
  margin-right: 12px;

  img {
    width: 32px;
    height: 32px;
    margin-right: 8px;
  }

  &:hover {
    text-decoration: none;
  }
`;

const ScLinkComp = css`
  color: #f7f8f8;
  font-size: 14px;
  line-height: 1.4;
  line-height: 40px;
  transition: all 0.3s;
  display: block;
  user-select: none;
  height: 40px;
  line-height: 40px;
  padding-left: 16px;
  padding-right: 16px;
  border-radius: 4px;
  margin-right: 4px;

  &:hover {
    text-decoration: none;
    opacity: 0.75;
    color: #0b0b0f;
    background: #ffd56f;
  }

  > span {
    margin-left: 8px;
  }

  @media screen and (min-width: 1024px) {
    display: inline-block;

    > span {
      display: none;
    }
  }
`;

const ScNavLink = styled(Link)`
  ${ScLinkComp}
`;

export const NavBar = () => {
  return (
    <>
      <ScHeader>
        <Container>
          <ScNavBar>
            <ScLogo to="/">
              <img src="/images/cat-in-black-silhouette.png" loading="eager" />
              the-outcast
            </ScLogo>
            <ScNavLink to="/event/">sự kiện</ScNavLink>
            <ScNavLink to="/blog/">blog</ScNavLink>
          </ScNavBar>
        </Container>
      </ScHeader>

      <div style={{ height: 64 }}></div>
    </>
  );
};
