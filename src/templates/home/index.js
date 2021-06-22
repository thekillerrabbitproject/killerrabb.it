import * as React from 'react';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import { Link } from 'gatsby';
import PropTypes from 'prop-types';

import Layout from '@components/Layout';
import SEO from '@components/SEO';
import { Masonry } from 'masonic';

const MasonryCard = ({ data }) => (
  <article key={data.id} id={data.id}>
    <Link to={data.slug}>
      <GatsbyImage
        image={getImage(data.gallery.localFile)}
        alt={data.title}
        loading="eager"
      />
    </Link>
  </article>
);

MasonryCard.propTypes = {
  data: PropTypes.object,
};

const IndexPage = ({ pageContext }) => {
  const posts = pageContext?.posts ?? [];
  return posts.length > 0 ? (
    <Layout>
      <SEO />
      <main>
        <Masonry
          items={posts}
          render={MasonryCard}
          style={{ maxWidth: 'calc(100vw - var(--doubleFakeBorder))' }}
        />
      </main>
    </Layout>
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
