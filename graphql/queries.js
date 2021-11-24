import { gql } from '@apollo/client';

export const GET_URL_RESOLVER = gql`
  query GetUrlResolver($url: String!) {
    urlResolver(url: $url) {
      canonical_url
      entity_uid
      id
      redirectCode
      relative_url
      canonical_url
      type
    }
  }
`;

export const GET_CATEGORIES = gql`
  query GetCategories {
    categoryList(filters: {}) {
      uid
      url_key
      name
      description
      image
      product_count
    }
  }
`;

export const GET_PRODUCT_BY_CATEGORIES = gql`
  query GetProductByCategory($filters: CategoryFilterInput) {
    categoryList(filters: $filters) {
      uid
      name
      url_key
      description
      image
      product_count
      products {
        items {
          uid
          sku
          url_key
          canonical_url
          name
          description {
            html
          }
          only_x_left_in_stock
          qty_available
          image {
            url
          }
          price_range {
            minimum_price {
              final_price {
                currency
                value
              }
            }
          }
        }
        __typename
      }
    }
  }
`;

export const GET_PRODUCT = gql`
  query GetProduct($filter: ProductAttributeFilterInput) {
    products(filter: $filter) {
      items {
        uid
        sku
        url_key
        name
        description {
          html
        }
        only_x_left_in_stock
        qty_available
        image {
          url
        }
        price_range {
          minimum_price {
            final_price {
              currency
              value
            }
          }
        }
      }
    }
  }
`;

export const GET_CART_ITEMS = gql`
  query GetCartItems($cartId: String!) {
    cart(cart_id: $cartId) {
      items {
        product {
          uid
          url_key
          sku
          name
          image {
            url
          }
        }
        quantity
        prices {
          row_total {
            value
            currency
          }
          price {
            value
            currency
          }
        }
      }
      prices {
        subtotal_excluding_tax {
          currency
          value
        }
        discounts {
          amount {
            value
            currency
          }
        }
        grand_total {
          value
          currency
        }
      }
    }
  }
`;
