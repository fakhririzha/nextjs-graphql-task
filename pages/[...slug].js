import React from 'react';
import router from 'next/router';
// Query configuration
import * as Q from '@Query';

// Apollo Client
import { useQuery } from '@apollo/client';
import Product from './product';

const getPage = (resolver) => {
  if (!resolver) {
    return <div>Page not found</div>;
  }
  // else if (resolver.type === 'CATEGORY') {
  //   router.push(`/category/${resolver.slug}`);
  // }
  else if (resolver.type === 'PRODUCT') {
    return <Product res={resolver} />;
  }
  return <span />;
};

const DynamicPage = ({ slug }) => {
  // const { query } = slug;
  let url = '';
  let NewSlug = [];
  slug.slug.map((value) => {
    value = value.replace('.html', '');
    NewSlug.push(value); //masukin value kedalam array slugnya
    url += `/${value}`;
  });
  url += '.html';
  //   console.log('url', NewSlug);

  const response = useQuery(Q.GET_URL_RESOLVER, {
    variables: {
      url: url,
    },
  });
  const { loading, error, data } = response;

  //kalau masih loading
  if (loading) {
    return <div>loading</div>;
  }

  if (error) {
    return <h2>Error...</h2>;
  }

  const resolver = data.urlResolver;
  console.log('resolver', resolver);

  return <>{getPage(resolver)}</>;
};

export const getServerSideProps = async (context) => {
  console.log(context);
  const url = context.query;

  return {
    props: { slug: url },
  };
};

export default DynamicPage;
