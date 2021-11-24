import { gql } from '@apollo/client';

export const GET_EMPTY_CART_ID = gql`
  mutation GetEmptyCartId {
    createEmptyCart
  }
`;

export const ADD_PRODUCT_TO_CART = gql`
  mutation AddProductToCart(
    $cartId: String!
    $sku: String!
    $quantity: Float!
  ) {
    addSimpleProductsToCart(
      input: {
        cart_id: $cartId
        cart_items: { data: { sku: $sku, quantity: $quantity } }
      }
    ) {
      cart {
        id
      }
    }
  }
`;
