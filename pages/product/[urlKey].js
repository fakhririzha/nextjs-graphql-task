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
  CardContent,
  CircularProgress,
  Snackbar,
  Hidden,
} from '@material-ui/core';
import { Skeleton, Alert } from '@material-ui/lab';

// Query configuration
import * as Q from '@Query';
import * as M from '@Mutation';

// Apollo Client
import { useQuery, useMutation } from '@apollo/client';

// UI Components
import Navbar from '@uiComponent/Navbar';

// MUI Styles
import { useStyles } from '@PageStyles/product';

const UrlKey = () => {
  // Router
  const router = useRouter();
  const { urlKey } = router.query;

  const [ProductItem, setProductItem] = useState(null);
  const [Quantity, setQuantity] = useState(1);
  const [toastStateSuccess, setToastStateSuccess] = useState(false);
  const [toastStateFailure, setToastStateFailure] = useState(false);

  // Get Product Data
  const { data: ProductItemData } = useQuery(Q.GET_PRODUCT, {
    variables: {
      filter: {
        url_key: {
          eq: urlKey,
        },
      },
    },
  });
  useEffect(() => {
    setProductItem(ProductItemData);
  }, [ProductItemData]);

  const [createCartToken] = useMutation(M.GET_EMPTY_CART_ID);
  const [AddToCart] = useMutation(M.ADD_PRODUCT_TO_CART);
  const AddToCartButtonHandler = async (sku) => {
    if (!localStorage.getItem('cartToken')) {
      const {
        data: { createEmptyCart },
      } = await createCartToken();
      localStorage.setItem('cartToken', createEmptyCart);
    }

    const cartData = AddToCart({
      variables: {
        cartId: localStorage.getItem('cartToken'),
        sku: sku,
        quantity: parseFloat(Quantity),
      },
    });

    if (cartData) {
      setToastStateSuccess(true);
    } else {
      setToastStateFailure(true);
    }
  };
  const handleCloseSuccess = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setToastStateSuccess(false);
  };
  const handleCloseFailure = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setToastStateFailure(false);
  };

  const classes = useStyles();

  return (
    <>
      <CssBaseline />
      <Navbar />
      {/* <pre>
        {(ProductItem && JSON.stringify(ProductItem, null, 2)) || 'Loading...'}
      </pre> */}
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
              Product Page
            </Typography>
          </Container>
        </div>
        <Container className={classes.cardGrid} maxWidth="lg">
          <Grid container spacing={4}>
            {(ProductItem &&
              ProductItem.products.items.map((product) => (
                <Grid item xs={12} md={12} lg={12} key={product.uid}>
                  <Card className={classes.card}>
                    <Hidden xsDown>
                      <CardMedia
                        className={classes.cardMedia}
                        image={
                          (product.image.url && product.image.url) ||
                          'https://source.unsplash.com/random'
                        }
                        title={'random'}
                      />
                    </Hidden>
                    <div>
                      <CardContent>
                        <Typography
                          component="h2"
                          variant="h5"
                          dangerouslySetInnerHTML={{
                            __html: product.name,
                          }}
                        ></Typography>
                        <Typography variant="subtitle1" color="textSecondary">
                          {product.sku}
                        </Typography>
                        <Typography
                          variant="subtitle1"
                          paragraph
                          dangerouslySetInnerHTML={{
                            __html: product.description.html,
                          }}
                        ></Typography>
                        <Button
                          variant="contained"
                          color="secondary"
                          onClick={() => {
                            if (Quantity - 1 != 0) {
                              setQuantity(Quantity - 1);
                            }
                          }}
                        >
                          -
                        </Button>{' '}
                        <Button color="default" disabled>
                          {Quantity}
                        </Button>{' '}
                        <Button
                          variant="contained"
                          color="secondary"
                          onClick={() => {
                            setQuantity(Quantity + 1);
                          }}
                        >
                          +
                        </Button>{' '}
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => AddToCartButtonHandler(product.sku)}
                        >
                          Add To Cart
                        </Button>
                      </CardContent>
                    </div>
                  </Card>
                </Grid>
              ))) || <CircularProgress />}
          </Grid>
        </Container>
        <Snackbar
          open={toastStateSuccess}
          autoHideDuration={6000}
          onClose={handleCloseSuccess}
        >
          <Alert onClose={handleCloseSuccess} severity="success">
            Product berhasil ditambahkan kedalam keranjang!
          </Alert>
        </Snackbar>
        <Snackbar
          open={toastStateFailure}
          autoHideDuration={6000}
          onClose={handleCloseSuccess}
        >
          <Alert onClose={handleCloseFailure} severity="error">
            Product gagal ditambahkan kedalam keranjang.
          </Alert>
        </Snackbar>
      </main>
    </>
  );
};

export default UrlKey;
