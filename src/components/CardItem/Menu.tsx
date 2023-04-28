import React from "react";
import styled from "styled-components";
import { Link } from "gatsby";
import Img from "gatsby-image";

import { Post } from "../../types/Post";
import { ScAuthor } from "../../templates/styled";

const ScMain = styled.div`
  max-width: 500px;
  margin-bottom: 4rem;

  @media screen and (min-width: 992px) {
    margin-left: 12px;
    margin-right: 12px;
    width: calc(25% - 24px);
    margin-bottom: 36px;
  }
`;

const ScFeatureImg = styled.div``;
const ScFeature = styled.div`
  margin-bottom: 16px;
  height: 220px;
  border-radius: 8px;
  overflow: hidden;
  position: relative;

  ${ScFeatureImg} {
    width: 100%;
    position: absolute;
    left: 0;
    right: 0;
    top: 50%;
    transform: translateY(-50%);

    img {
      width: 100%;
    }
  }

  @media screen and (min-width: 992px) {
    height: 160px;
  }
`;

const ScPanelContent = styled.div``;

const ScTitle = styled.h6`
  font-size: 16px;
  margin-bottom: 0;

  a {
    color: white;

    &:hover {
      color: white;
    }
  }

  @media screen and (min-width: 992px) {
    margin-top: 16px;
    margin-top: 12px;
  }
`;

const ScOverview = styled.p`
  margin-top: 12px;
  margin-bottom: 0.5em;
  color: #b3b3b3;

  @media screen and (min-width: 992px) {
    margin-bottom: 12px;
  }
`;

type PtPostWithImage = Post & {
  featuredImg: any;
};

export const Menu = ({ post }: { post: PtPostWithImage }) => {
  return (
    <ScMain>
      <ScFeature>
        <Link to={`/blog/${post.slug}`}>
          <ScFeatureImg>
            <Img fluid={post.featuredImg.childImageSharp.fluid} />
          </ScFeatureImg>
        </Link>
      </ScFeature>
      <ScPanelContent>
        <ScTitle>
          <Link to={`/blog/${post.slug}`}>{post.title}</Link>
        </ScTitle>
        <ScAuthor>{post.price}</ScAuthor>
      </ScPanelContent>
    </ScMain>
  );
};
