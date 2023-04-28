import React from "react";
import styled from "styled-components";
import { graphql } from "gatsby";
import { Helmet } from "react-helmet";

import { Card } from "../components/CardItem/Card";
import { Container } from "../components/Grid";
import { Layout } from "../components/Layout";
import { normalizeNotionFrontMatter } from "../utils/normalizeNotionBlog";
import { Menu } from "../components/CardItem/Menu";

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

const ScContent = styled.div`
  max-width: 768px;
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
          <title>Gatsby</title>
        </Helmet>

        <Container>
          <ScMain>
            <ScContent>
              <p>
                The outcast là một điểm đến lý tưởng cho những ai yêu thích
                hương vị đậm đà của Yellow Bourbon, Marou Socola, Rượu Vang và
                thích thú với mùi hương đặc trưng của Shisha. Ngoài ra, quán còn
                có những chú mèo đáng yêu và thân thiện, sẵn sàng đón chào và
                cùng bạn tận hưởng không gian thoải mái, ấm áp.
              </p>
              <p>
                Với kiến trúc đẹp mắt và nhiều góc nhìn tuyệt vời, quán cà phê
                chúng tôi là một điểm đến thú vị và độc đáo cho những người yêu
                thích cà phê và muốn trải nghiệm những điều mới mẻ trong cuộc
                sống hàng ngày. Hãy ghé thăm quán cà phê của chúng tôi và tận
                hưởng những trải nghiệm tuyệt vời mà chúng tôi đem đến!
              </p>
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
                  <Menu key={i.id} post={i} />
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
                  <Card key={i.id} post={i} />
                ))}
            </ScBlogList>
          </ScMain>
        </Container>
      </ScRoot>
    </Layout>
  );
};

export default BlogTemplate;
