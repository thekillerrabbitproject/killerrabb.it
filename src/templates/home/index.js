import * as React from 'react';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import Link from 'gatsby-plugin-transition-link/AniLink';

import PropTypes from 'prop-types';

import Layout from '@components/Layout';
import SEO from '@components/SEO';

import { getWebp } from '../../utils';

import { tertiary } from '@css/utils/color';

import { container, articleGrid } from '@css/misc';

const MasonryCard = ({ data }) => (
  <article key={data.id} id={data.id} css={articleGrid}>
    <Link to={data.slug} cover bg={tertiary}>
      <GatsbyImage image={getImage(data.gallery.localFile)} alt={data.title} />
    </Link>
  </article>
);

MasonryCard.propTypes = {
  data: PropTypes.object,
};

const IndexPage = ({ pageContext }) => {
  const posts = pageContext?.posts ?? [];
  const cardImageUrl = `${getWebp(
    posts[0].gallery.localFile
  )}&text=The Killer-Rabbit Photography`;

  // console.log(getWebp(posts[0].gallery.localFile));
  return posts.length > 0 ? (
    <>
      <SEO cardImage={cardImageUrl} />
      <Layout>
        <main css={container}>
          {posts.map((post) => (
            <MasonryCard data={post} key={post.id} />
          ))}
        </main>
      </Layout>
    </>
  ) : (
    <></>
  );
};

IndexPage.propTypes = {
  pageContext: PropTypes.shape({
    posts: PropTypes.array,
  }),
};

export default IndexPage;
