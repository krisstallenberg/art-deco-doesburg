import React from "react";
import { graphql } from "gatsby";
import {
  mapEdgesToNodes,
  filterOutDocsWithoutSlugs,
  filterOutDocsPublishedInTheFuture
} from "../lib/helpers";
import Container from "../components/container";
import GraphQLErrorList from "../components/graphql-error-list";
import ProjectPreviewGrid from "../components/project-preview-grid";
import SEO from "../components/seo";
import Layout from "../containers/layout";
import { StaticImage } from "gatsby-plugin-image"

export const query = graphql`
  query IndexPageQuery {
    site: sanitySiteSettings(_id: { regex: "/(drafts.|)siteSettings/" }) {
      title
      description
      keywords
    }
    projects: allSanitySampleProject(
      limit: 6
      sort: { fields: [publishedAt], order: DESC }
      filter: { slug: { current: { ne: null } }, publishedAt: { ne: null } }
    ) {
      edges {
        node {
          id
          mainImage {
            crop {
              _key
              _type
              top
              bottom
              left
              right
            }
            hotspot {
              _key
              _type
              x
              y
              height
              width
            }
            asset {
              _id
            }
            alt
          }
          title
          _rawExcerpt
          slug {
            current
          }
        }
      }
    }
  }
`;

const IndexPage = props => {
  const { data, errors } = props;

  if (errors) {
    return (
      <Layout>
        <GraphQLErrorList errors={errors} />
      </Layout>
    );
  }

  const site = (data || {}).site;
  const projectNodes = (data || {}).projects
    ? mapEdgesToNodes(data.projects)
      .filter(filterOutDocsWithoutSlugs)
      .filter(filterOutDocsPublishedInTheFuture)
    : [];

  if (!site) {
    throw new Error(
      'Missing "Site settings". Open the studio at http://localhost:3333 and add some content to "Site settings" and restart the development server.'
    );
  }

  return (
    <Layout>
      <SEO title={site.title} description={site.description} keywords={site.keywords} />
      <Container>
        <StaticImage
          src="../images/Art-deco-doesburg-vierkant.jpeg"
          alt="Binnen bij Art deco Doesburg"
          placeholder="blurred"
          layout="fixed"
          width={200}
          height={200}
        />
        <p>
          Art deco Doesburg is een samenwerking van Willem Hengst van Galerie Tandem in Gendringen en
          Ger Stallenberg van Het Ware Huis in Lage Mierde. Beide handelaren zijn specialist in art
          nouveau en art deco, met het accent op kunst van Franse origine uit de periode 1900-1940. Het laat-gotische pand <em>t’huys Optenoort</em> in Doesburg, vroeg om een museale invulling.
          In dit prachtige pand was het voor Willem en Ger een genoegen om een deel van hun collectie te etaleren. We streven ernaar de trouwe bezoeker steeds te verrassen met nieuwe aanwinsten.
          De liefhebber van schoonheid kan zich in Doesburg onder andere laven aan het historische Hanzestadje en het Lalique museum, nu is daar ook Art deco Doesburg bij gekomen.
        </p>
        <h2>Zie ook</h2>
        <ul>
          <li>
            De collectie van <a href="https://www.glass-artnouveau.com/">Galerie Tandem</a>
          </li>
          <li>
            De collectie van <a href="https://www.hetwarehuis.nl">Het Ware Huis</a>
          </li>
          <li>
            <a href="https://www.gerstallenberg.nl">Ger Stallenberg</a> – voor olieverfschilderijen van Ger Stallenberg

          </li>

        </ul>
      </Container>
      <Container>

      </Container>

    </Layout>
  );
};

export default IndexPage;
