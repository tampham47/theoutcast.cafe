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
  font-size: 16px;
  line-height: 1.4;
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
          <title>the-outcast</title>
        </Helmet>

        <Container>
          <ScMain>
            <ScContent>
              <p>
                The outcast là một trạm dừng chân, dành cho những ai thích các
                vị đồ uống vị nguyên bản nhất. Ở đây chúng tôi có cafe pour,
                espresso sữa, marou cacao, rượu vang, bia thủ công. Tất cả các
                nguyên liệu đều được trồng và chọn lọc và chế biến hoàn toàn ở
                Việt Nam, từ những đối tác uy tín.
              </p>
              <p>
                Với kiến trúc đẹp mắt và nhiều góc nhìn tuyệt vời, the outcast
                là một điểm đến thú vị và độc đáo cho những người yêu thích cà
                phê và muốn trải nghiệm những điều mới mẻ trong cuộc sống hàng
                ngày.
              </p>
              <p>
                Hơn nữa, quán còn có những chú mèo đáng yêu và thân thiện, sẵn
                sàng đón chào và cùng bạn tận hưởng không gian thoải mái, ấm áp.
                Hãy ghé thăm the outcast và chia sẻ những điều mới mẻ với mình
                nhé.
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
