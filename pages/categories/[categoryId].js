import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

// MUI Library
import {
  CssBaseline,
  Container,
  Typography,
  Grid,
  Button,
  Card,
  CardMedia,
  Box,
  CardContent,
  CircularProgress,
  CardActions,
} from '@material-ui/core';

// Query configuration
import * as Q from '@Query';

// Apollo Client
import { useQuery } from '@apollo/client';

// UI Components
import Navbar from '@uiComponent/Navbar';

// MUI Styles
import { useStyles } from '@PageStyles/categories';

export const getServerSideProps = async (context) => {
  const urlParams = context.query;
  // const { loading, error, data } = useQuery(Q.GET_URL_RESOLVER, {
  //   variables: {
  //     url: urlParams.categoryId + '.html',
  //   },
  // });
  console.log(urlParams.categoryId);

  return { props: { slug: urlParams } };
};

const CategoryId = ({ slug }) => {
  // Router
  const router = useRouter();
  const { categoryId } = router.query;
  const classes = useStyles();

  const [ProductList, setProductList] = useState(null);

  // Get Product Data
  const {
    loading: ProductListLoading,
    error: ProductListError,
    data: ProductListData,
  } = useQuery(Q.GET_PRODUCT_BY_CATEGORIES, {
    variables: {
      filters: {
        url_key: {
          eq: categoryId,
        },
      },
    },
  });

  useEffect(() => {
    setProductList(
      ProductListData &&
        ProductListData.categoryList[0].products.items.filter(
          (item) => item.__typename == 'SimpleProduct'
        )
    );
  }, [ProductListData]);

  if (ProductListLoading) {
    return (
      <div className={classes.titleLabel}>
        <Container>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <CircularProgress />
          </Box>
        </Container>
      </div>
    );
  }

  if (ProductListError) {
    console.error(ProductListError);
    return <h2>Error...</h2>;
  }

  return (
    <>
      <CssBaseline />
      <Navbar />
      <main>
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="textPrimary"
              gutterBottom
            >
              Product List Page
            </Typography>
          </Container>
        </div>
        <Container className={classes.cardGrid} maxWidth="lg">
          <Grid container spacing={4}>
            {(ProductList &&
              ProductList.map((item) => (
                <Grid item key={item.uid} xs={12} sm={6} md={4}>
                  <Card className={classes.card}>
                    <CardMedia
                      className={classes.cardMedia}
                      image={
                        (item.image.url && item.image.url) ||
                        'https://source.unsplash.com/random'
                      }
                      title={item.name}
                    />
                    <CardContent
                      className={classes.cardContent}
                      style={{ textAlign: 'justify' }}
                    >
                      <Typography
                        gutterBottom
                        variant="h5"
                        component="h2"
                        align="center"
                      >
                        <div
                          dangerouslySetInnerHTML={{
                            __html: item.name,
                          }}
                          style={{ textAlign: 'center' }}
                        />
                      </Typography>
                      <div>
                        {(item.description && (
                          <div
                            dangerouslySetInnerHTML={{
                              __html: item.description.html,
                            }}
                            style={{ textAlign: 'justify' }}
                          />
                        )) || (
                          <div
                            dangerouslySetInnerHTML={{
                              __html: 'Lorem ipsum dolor sit amet.',
                            }}
                            style={{ textAlign: 'center' }}
                          />
                        )}
                        <div
                          style={{ textAlign: 'center' }}
                          className={classes.buttonCta}
                        ></div>
                      </div>
                    </CardContent>
                    <CardActions>
                      <Link
                        href={{
                          pathname: '/product/[urlKey]',
                          query: { urlKey: item.url_key },
                        }}
                      >
                        <Button
                          variant="contained"
                          color="primary"
                          style={{ flex: 1 }}
                        >
                          Browse Products
                        </Button>
                      </Link>
                    </CardActions>
                  </Card>
                </Grid>
              ))) || <CircularProgress />}
          </Grid>
        </Container>
      </main>
    </>
  );
};

export default CategoryId;
