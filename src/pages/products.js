import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
// import Link from '../components/Link';

import Layout from '../components/layout';
import SEO from '../components/seo';

import { getCardImage } from '../utils';

import * as ß from '../emotion/main';

import { pipe, map, pathOr, filter, identity as I } from 'ramda';

const getProducts = pathOr([], ['wpgraphql', 'products', 'nodes']);

const getGrid = product => {
  const img = pathOr(
    false,
    ['image', 'imageFile', 'childImageSharp', 'fluid'],
    product
  );
  const id = pathOr(Math.random(0, 999999), ['image', 'id'], product);
  return img ? (
    <article key={id} css={ß.gridArticle}>
      <Img
        className="photo"
        fluid={img}
        alt=""
        objectFit="cover"
        objectPosit
        ion="50% 50%"
      />
    </article>
  ) : null;
};

const generateGrid = map(getGrid);

const removeEmpty = filter(I);

const getCarImageUrl = pipe(
  getProducts,
  pathOr(false, [0, 'image', 'imageFile', 'childImageSharp', 'fluid', 'src'])
);

const ProductList = ({ data }) => {
  const renderProductsGrid = () => {
    const productsList = pipe(getProducts, generateGrid, removeEmpty)(data);
    return productsList;
  };

  return (
    <Layout cssmod={ß.grid}>
      <SEO title="Products" meta={getCardImage(getCarImageUrl(data))} />
      {renderProductsGrid()}
    </Layout>
  );
};

ProductList.propTypes = {
  data: PropTypes.any,
};

export const query = graphql`
  query ProductsQuery {
    wpgraphql {
      products(
        where: { status: "publish", orderby: { field: DATE, order: DESC } }
      ) {
        nodes {
          description
          name
          slug
          sku
          shortDescription
          onSale
          status
          purchasable
          date
          productId
          image {
            sourceUrl(size: FULL_SIZE)
            imageFile {
              childImageSharp {
                fluid(quality: 100) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
          }
        }
      }
    }
  }
`;

export default ProductList;
