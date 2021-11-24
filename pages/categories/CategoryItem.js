import React from 'react';
// MUI Library
import {
  Typography,
  Grid,
  Button,
  Card,
  CardMedia,
  CardContent,
} from '@material-ui/core';
import Link from 'next/link';

import { useStyles } from '@PageStyles/categories';

const CategoryItem = ({ categoryItem }) => {
  const classes = useStyles();

  return (
    <Grid item key={categoryItem.uid} xs={12} sm={6} md={4}>
      <Card className={classes.card}>
        <CardMedia
          className={classes.cardMedia}
          image={
            (categoryItem.image.url && categoryItem.image.url) ||
            'https://source.unsplash.com/random'
          }
          title={categoryItem.name}
        />
        <CardContent
          className={classes.cardContent}
          sx={{ textAlign: 'center' }}
        >
          <Typography gutterBottom variant="h5" component="h2" align="center">
            <div
              dangerouslySetInnerHTML={{
                __html: categoryItem.name,
              }}
              style={{ textAlign: 'center' }}
            />
          </Typography>
          <div>
            {(categoryItem.description && (
              <div
                dangerouslySetInnerHTML={{
                  __html: categoryItem.description.html,
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
            <div style={{ textAlign: 'center' }} className={classes.buttonCta}>
              <Link
                href={{
                  pathname: '/product/[urlKey]',
                  query: { urlKey: categoryItem.url_key },
                }}
              >
                <Button variant="contained" color="primary">
                  Browse Products
                </Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default CategoryItem;
