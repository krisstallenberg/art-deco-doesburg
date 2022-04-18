import React from "react";
import { graphql } from "gatsby";
import Container from "../components/container";
import GraphQLErrorList from "../components/graphql-error-list";
import SEO from "../components/seo";
import Layout from "../containers/layout";
import { mapEdgesToNodes, filterOutDocsWithoutSlugs } from "../lib/helpers";

import { responsiveTitle1 } from "../components/typography.module.css";

export const query = graphql`
  query ArchivePageQuery {
    projects: allSanitySampleProject(
      limit: 12
      sort: { fields: [publishedAt], order: DESC }
      filter: { slug: { current: { ne: null } }, publishedAt: { ne: null } }
    ) {
      edges {
        node {
          id
          mainImage {
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

const ContactPage = props => {
  const { data, errors } = props;
  if (errors) {
    return (
      <Layout>
        <GraphQLErrorList errors={errors} />
      </Layout>
    );
  }
  const projectNodes =
    data && data.projects && mapEdgesToNodes(data.projects).filter(filterOutDocsWithoutSlugs);
  return (
    <Layout>
      <SEO title="Plan uw bezoek" />
      <Container>

        <address>
          <h2>Adres</h2>
          Meipoortstraat 59<br />
          6981 DC, Doesburg<br /><br />

         <em><strong>Tip:</strong> combineer uw bezoek met het <a href="https://www.laliquemuseum.nl/" target="_blank">Lalique Museum</a>, gelegen op 300 meter afstand.</em>

        <h2>Openingstijden</h2>
        <strong>Maandag tot en met zaterdag</strong> geopend van 13:00 tot 17:30. <br />
        <strong>Eerste zondag van de maand</strong> geopend van 13:00 tot 17:30. <br />

          <section>
            <h2>Contact</h2>
            <ul>
              <li>Mail <a href="mail:info@artdecodoesburg.nl">info@artdecodoesburg.nl</a></li>
              <li>Bel Willem Hengst op <a href="tel:+310315237419"> +31 (0) 315 23 74 19</a></li>
              <li>Bel Ger Stallenberg op <a href="tel:+31650955728">+31 6 509 55 728</a></li>
            </ul>
          </section>
        </address>
      </Container>
    </Layout>
  );
};

export default ContactPage;
