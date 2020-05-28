import Head from 'next/head';
import Link from 'next/link';

export default function Footer() {
  return (
    <div>
      <header className="footer">
        <Link href="/">
          <a>Facebook</a>
        </Link>
        <Link href="/">
          <a>Instagram</a>
        </Link>
        <Link href="/about">
          <a>Twitter</a>
        </Link>
      </header>
      <style jsx>{`
        .footer {
          position: static;
          border-top: 1px solid #000000;
          display: flex;
          flex-direction: row;
          margin: 40px;
          justify-content: space-around;
          height: 20px;
        }

        a {
          margin-top: 10px;
          color: black;
          text-transform: uppercase;
          text-decoration: none;
          letter-spacing: 0.15em;
        }
        a:hover {
          transition: 200ms;
          font-size: 1.1em;
          color: #ed1212;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}
