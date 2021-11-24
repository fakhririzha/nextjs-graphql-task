import React, { useState, useEffect } from 'react';
import Link from 'next/link';

// MUI Library
import {
  CssBaseline,
  Container,
  Typography,
  Grid,
  Button,
  Card,
  CardMedia,
  CardContent,
  CircularProgress,
  CardActions,
} from '@material-ui/core';

// Query configuration
import * as Q from '@Query';

// Apollo Client
import { useQuery, useMutation } from '@apollo/client';

// UI Components
import Navbar from '@uiComponent/Navbar';

// MUI Styles
import { useStyles } from '@PageStyles/index';

const index = () => {
  // Get Category Data
  const { data: CategoryListData } = useQuery(Q.GET_CATEGORIES);

  const [CategoryList, setCategoryList] = useState(null);

  useEffect(() => {
    setCategoryList(
      CategoryListData &&
        CategoryListData.categoryList.filter(
          (item) => item.url_key != null && item.product_count != 0
        )
    );
  }, [CategoryListData]);

  const classes = useStyles();

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
              Category List Page
            </Typography>
          </Container>
        </div>
        <Container className={classes.cardGrid} maxWidth="lg">
          <Grid container spacing={4}>
            {(CategoryList &&
              CategoryList.map((item) => (
                <Grid item key={item.uid} xs={12} sm={6} md={4}>
                  <Card className={classes.card}>
                    <CardMedia
                      className={classes.cardMedia}
                      image={
                        (item.image && item.image) ||
                        'https://source.unsplash.com/random'
                      }
                      title={item.name}
                      style={{ width: '100%', height: 'auto' }}
                    />
                    <CardContent
                      className={classes.cardContent}
                      sx={{ textAlign: 'center' }}
                    >
                      <Typography
                        gutterBottom
                        variant="h5"
                        component="h2"
                        align="center"
                      >
                        {item.name}
                      </Typography>
                      {(item.description && (
                        <div
                          dangerouslySetInnerHTML={{
                            __html: item.description,
                          }}
                          style={{ textAlign: 'center' }}
                        />
                      )) || (
                        <div
                          dangerouslySetInnerHTML={{
                            __html: 'Lorem ipsum dolor sit amet.',
                          }}
                          style={{ textAlign: 'center' }}
                        />
                      )}
                    </CardContent>
                    <CardActions>
                      <Link
                        href={{
                          pathname: '/categories/[categoryId]',
                          query: { categoryId: item.url_key },
                        }}
                      >
                        <Button
                          variant="contained"
                          color="primary"
                          style={{ flex: 1 }}
                        >
                          Browse Category
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

export default index;
