import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import useSWR from 'swr';

// MUI Library
import {
  Avatar,
  CssBaseline,
  Container,
  Typography,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
} from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';

// Query configuration
import * as Q from '@Query';

// Apollo Client
import { useQuery, useMutation } from '@apollo/client';

// UI Components
import Navbar from '@uiComponent/Navbar';

// MUI Styles
import { useStyles } from '@PageStyles/cart';

const Index = () => {
  const cartToken =
    typeof window !== 'undefined' ? localStorage.getItem('cartToken') : null;

  const [CartItemList, setCartItemList] = useState(null);

  const { data: CartItemData } = useQuery(Q.GET_CART_ITEMS, {
    variables: {
      cartId: cartToken,
    },
    fetchPolicy: 'network-only',
    nextFetchPolicy: 'no-cache',
  });
  useEffect(() => {
    setCartItemList(CartItemData);
  }, [CartItemData]);

  const classes = useStyles();

  const CartItemProduct = CartItemList;

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
              Cart Page
            </Typography>
          </Container>
        </div>
        <Container className={classes.cardGrid} maxWidth="lg">
          <Grid container spacing={4}>
            <TableContainer component={Paper}>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Image</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>SKU</TableCell>
                    <TableCell align="right">Price</TableCell>
                    <TableCell align="right">Qty</TableCell>
                    <TableCell align="right">Sum</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {(CartItemProduct &&
                    CartItemProduct.cart.items.map((item) => (
                      <TableRow key={item.product.uid}>
                        <TableCell>
                          <Avatar
                            className={classes.large}
                            alt="Remy Sharp"
                            src={
                              (item.product.image.url &&
                                item.product.image.url) ||
                              'https://pi.tedcdn.com/r/talkstar-photos.s3.amazonaws.com/uploads/72bda89f-9bbf-4685-910a-2f151c4f3a8a/NicolaSturgeon_2019T-embed.jpg?w=512'
                            }
                          />
                        </TableCell>
                        <TableCell>{item.product.name}</TableCell>
                        <TableCell>{item.product.sku}</TableCell>
                        <TableCell align="right">
                          Rp. {item.prices.price.value}
                        </TableCell>
                        <TableCell align="right">{item.quantity}</TableCell>
                        <TableCell align="right">
                          Rp. {item.prices.row_total.value}
                        </TableCell>
                      </TableRow>
                    ))) || (
                    <TableRow>
                      <TableCell>Loading...</TableCell>
                      <TableCell>Loading...</TableCell>
                      <TableCell>Loading...</TableCell>
                      <TableCell>Loading...</TableCell>
                      <TableCell>Loading...</TableCell>
                      <TableCell>Loading...</TableCell>
                    </TableRow>
                  )}
                  <TableRow>
                    <TableCell rowSpan={3} />
                    <TableCell colSpan={4}>Subtotal</TableCell>
                    <TableCell>
                      Rp.{' '}
                      {(CartItemProduct &&
                        CartItemProduct.cart.prices.subtotal_excluding_tax
                          .value) ||
                        'Loading...'}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell colSpan={4}>Diskon</TableCell>
                    <TableCell>
                      {(CartItemProduct &&
                        CartItemProduct.cart.prices.discounts &&
                        'Rp. ' + CartItemProduct.cart.prices.discounts.value) ||
                        'No discount.' ||
                        'Loading...'}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell colSpan={4}>Grand Total</TableCell>
                    <TableCell>
                      Rp.{' '}
                      {(CartItemProduct &&
                        CartItemProduct.cart.prices.grand_total.value) ||
                        'Loading...'}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Container>
      </main>
    </>
  );
};

export default Index;
