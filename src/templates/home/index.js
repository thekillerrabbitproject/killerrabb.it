import * as React from 'react';
import { GatsbyImage, getImage, getSrc } from 'gatsby-plugin-image';
import { Link } from 'gatsby';
import PropTypes from 'prop-types';

import Layout from '@components/Layout';
import SEO from '@components/SEO';
import { Masonry } from 'masonic';

import { getWebp } from '../../utils';

const MasonryCard = ({ data }) => (
  <article key={data.id} id={data.id}>
    <Link to={data.slug}>
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
        <main>
          <Masonry
            items={posts}
            render={MasonryCard}
            style={{ maxWidth: 'calc(100vw - var(--doubleFakeBorder))' }}
          />
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
