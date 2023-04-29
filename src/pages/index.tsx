import React from "react";
import styled from "styled-components";
import { graphql } from "gatsby";
import { Helmet } from "react-helmet";

import { Card } from "../components/CardItem/Card";
import { Container } from "../components/Grid";
import { Layout } from "../components/Layout";
import { normalizeNotionFrontMatter } from "../utils/normalizeNotionBlog";
import { Menu } from "../components/CardItem/Menu";
import { ScContent as ScContentSrc } from "../templates/styled";

const ScContent = styled(ScContentSrc)`
  margin-left: initial;
  max-width: 780px;
`;

const ScRoot = styled.div`
  background-color: var(--darkmode);
  padding-top: 1px;
`;

const ScMain = styled.div`
  margin-top: 1rem;
  margin-bottom: 2rem;

  @media screen and (min-width: 992px) {
    margin-top: 2rem;
    margin-bottom: 4rem;
  }
`;

const ScMenuList = styled.div`
  @media screen and (min-width: 992px) {
    display: flex;
    flex-wrap: wrap;
    margin-left: -12px;
    margin-right: -12px;
  }
`;

const ScBlogList = styled.div`
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
          html
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
            order
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

  const introPost = posts.find((i) => i.slug === "x-the-outcast");
  const contactPost = posts.find((i) => i.slug === "x-contact");

  return (
    <Layout>
      <ScRoot>
        <Helmet titleTemplate="%s">
          <title>the-outcast</title>
        </Helmet>

        <Container>
          <ScMain>
            <ScContent>
              <div
                className="post-content"
                dangerouslySetInnerHTML={{ __html: introPost.html }}
              />
            </ScContent>
          </ScMain>
        </Container>

        <Container>
          <h2>Menu</h2>
          <ScMain>
            <ScMenuList>
              {posts
                .filter((i) => i.category === "Menu")
                .sort((a, b) => a.order - b.order)
                .map((i) => (
                  <Menu key={i.slug} post={i} />
                ))}
            </ScMenuList>
          </ScMain>
        </Container>

        <Container>
          <h2>Blog</h2>
          <ScMain>
            <ScBlogList>
              {posts
                .filter((i) => i.category === "Blog")
                .map((i) => (
                  <Card key={i.slug} post={i} />
                ))}
            </ScBlogList>
          </ScMain>
        </Container>

        <Container>
          <ScContent>
            <div
              className="post-content"
              dangerouslySetInnerHTML={{ __html: contactPost.html }}
            />
          </ScContent>
        </Container>
      </ScRoot>
    </Layout>
  );
};

export default BlogTemplate;
