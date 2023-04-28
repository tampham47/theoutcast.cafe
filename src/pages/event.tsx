import React from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet";

import { Card } from "../components/CardItem/Card";
import { Container } from "../components/Grid";
import { Layout } from "../components/Layout";
import { graphql } from "gatsby";
import { normalizeNotionFrontMatter } from "../utils/normalizeNotionBlog";

const ScRoot = styled.div`
  background-color: var(--darkmode);
  padding-top: 1px;
`;

const ScMain = styled.div`
  margin-top: 3rem;
  margin-bottom: 5rem;

  @media screen and (min-width: 992px) {
    margin-top: 3rem;
    margin-bottom: 10rem;
  }
`;

const ScPostList = styled.div`
  @media screen and (min-width: 992px) {
    display: flex;
    flex-wrap: wrap;
    margin-left: -24px;
    margin-right: -24px;
  }
`;

export const pageQuery = graphql`
  {
    allMarkdownRemark(
      sort: { frontmatter: { publish_date: { start: DESC } } }
      limit: 1000
    ) {
      edges {
        node {
          featuredImg {
            childImageSharp {
              fluid(maxWidth: 800, quality: 100) {
                base64
                aspectRatio
                src
                srcSet
                srcWebp
                srcSetWebp
                sizes
              }
            }
          }
          frontmatter {
            slug
            status {
              name
            }
            title
            author {
              name
            }
            category {
              name
            }
            price
            cover {
              file {
                url
              }
              name
            }
            publish_date {
              start(formatString: "MMMM DD, YYYY")
            }
            summary
          }
        }
      }
    }
  }
`;

const BlogTemplate = ({ data }: any) => {
  console.log("data", data);

  const posts: any[] = data.allMarkdownRemark.edges
    .map(({ node }: any) => {
      const frontmatter = normalizeNotionFrontMatter(node.frontmatter);
      return {
        ...node,
        ...frontmatter,
        cover: frontmatter.cover,
        markdown: true,
      };
    })
    .filter((i: any) => i.status === "published");

  return (
    <Layout>
      <ScRoot>
        <Helmet titleTemplate="%s">
          <title>Sự kiện</title>
        </Helmet>

        <Container>
          <h2>Sự kiện</h2>
          <ScMain>
            <ScPostList>
              {posts
                .filter((i) => i.category === "Event")
                .map((i) => (
                  <Card key={i.id} post={i} />
                ))}
            </ScPostList>
          </ScMain>
        </Container>
      </ScRoot>
    </Layout>
  );
};

export default BlogTemplate;
