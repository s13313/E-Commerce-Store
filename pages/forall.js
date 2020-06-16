import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import nextCookies from 'next-cookies';
import Cookies from 'js-cookie';
import Header from '../components/Header.tsx';
import Header_2 from '../components/Header_2';
import Footer from '../components/Footer';
import CartButton from '../components/CartButton';

export default function uniSex(props) {
  const [cart, setCart] = useState(props.cartList ?? []);
  const uniSexItems = props.products;
  return (
    <div className="container">
      <Header list={cart.length} />
      <main>
        <div className="title">
          <div className="row">
            <p>hey there, I'm</p>
            <h2>unisex</h2>
            <h1 style={{ fontSize: '4em' }}>COUNT SHIRTY</h1>
          </div>

          <div className="row_2">
            <h4 style={{ marginRight: '2em' }}>
              from the moment you put me on,
            </h4>
            <h3 style={{ marginLeft: '2em' }}> you'll feel light and cool!</h3>
          </div>
        </div>
        ;
        <img className="coverImage" src="/TSHIRTS.jpeg" />
        <Header_2 />
        <h1 className="title">T-Shirt for uniSex</h1>
        <section className="section">
          <div className="products">
            {uniSexItems
              .filter((type) => type.type === 'uniSex')
              .map((items, id) => {
                return (
                  <div value={items} key={id}>
                    <Link href="/products/[items]" as={'/products/' + items.id}>
                      <a>
                        <div>
                          <img className="image" src={items.image} />
                        </div>
                      </a>
                    </Link>

                    <div className=" productInfos">
                      <div className="row_2">
                        <div>My name is: {items.name}</div>
                        <div>
                          I am availabe in{' '}
                          {/* {items.size.map((size) => {
                            return size + '.';
                          })} */}
                        </div>
                        <div>I am {items.color}</div>
                        <div>My price is: €{items.price}</div>
                      </div>
                      <div className="buttonSection">
                        {/* <button
                          type="button"
                          className="orderButton"
                          onClick={() => {
                            addToCart(items);
                          }}
                        >
                          Add to Cart
                        </button> */}
                        <CartButton items={items} />
                        <Link
                          href="/products/[items]"
                          as={'/products/' + items.id}
                        >
                          <a>
                            <button className="orderButton" onClick={() => {}}>
                              Product Details
                            </button>
                          </a>
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </section>
      </main>
      <Footer />

      <style jsx>{`
        .container {
          margin: 0;
        }
        .title {
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .row {
          display: flex;
          flex-direction: column;
          justify-content: center;
          width: 50%;
          text-align: center;
          margin: 40px 0;
        }
        .row_2 {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 100%;
        }

        .coverImage {
          margin: 20px 0;
          width: 100%;
        }
        .section {
          max-width: 100%;
          overflow: hidden;
          margin: 40px;
          display: flex;
          flex-direction: column;
          align-content: center;

          height: 100%;
        }
        .products {
          display: flex;
          flex-wrap: wrap;
          height: 100%;
          justify-content: space-around;
        }
        .productInfos {
          display: flex;
          flex-direction: column;
          justify-content: center;
          text-align: center;
        }

        .image {
          width: 400px;
          height: auto;
          position: relative;
          z-index: 1;
          margin-bottom: 1em;
          margin-top: 2em;
          overflow: hidden;
        }
        .image :hover {
          transition: 300ms;
          transform: scale(1.05);
        }
        .image_2 {
          margin: 10px 40px 0 0;
          width: 300px;
          height: auto;
          z-index: 2;
        }
        .buttonSection {
          display: flex;
          flex-direction: row;
          justify-content: space-evenly;
        }
        .buttonSection * + * {
          margin: 10px;
        }
        .orderButton {
          margin-top: 30px;
          background: none;
          color: black;
          border: none;
          text-transform: uppercase;
          text-decoration: none;
          letter-spacing: 0.15em;
          text-align: center;
          display: inline-block;
          position: relative;
          width: 170px;
          height: 70px;
          border: 1px solid #c8d8d4cd;
        }
        .orderButton :hover {
          transition: 400ms;
          color: #fff;
          cursor: pointer;
          background-color: rgb(77, 141, 198);
        }
        a {
          color: black;
          text-decoration: none;
          letter-spacing: 0.15em;
          padding: 10px 0;
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          display: block;
          max-width: 100%;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Oxygen,
            Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
        }
        h1 {
          margin: 0;
          letter-spacing: 3px;
          padding: 0;
          font-size: 2em;
          font-weight: 300;
          text-transform: uppercase;
        }
        h2 {
          margin: 0;
          padding: 0;
          font-size: 1.7em;
          font-weight: 300;
          letter-spacing: 2px;
        }
        h3 {
          margin: 0;
          padding: 0;
          font-size: 1.4em;
          font-weight: 300;
          letter-spacing: 2px;
        }
        h4 {
          margin: 0;
          padding: 0;
          font-size: 1.2em;
          font-weight: 300;
          letter-spacing: 2px;
        }
        p {
          margin: 4px;
          padding: 0;
          font-size: 1em;
          font-weight: 300;
          letter-spacing: 2px;
        }
      `}</style>
    </div>
  );
}

/************** ServerSide  ***********/
export async function getServerSideProps(context) {
  const { cartList } = nextCookies(context);

  const { getProducts } = await import('../db.js');

  const products = await getProducts();

  return {
    props: {
      ...(cartList ? { cartList: cartList } : undefined),
      products,
    },
  };
}
