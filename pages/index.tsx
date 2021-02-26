import Link from 'next/link';

function HomePage() {
  return (
    <>
      <div>
        <ul>
          <li>
            <Link href="/us/washington-wa/county/king_county">
              King County, WA
            </Link>
          </li>
        </ul>
      </div>
      <main>{/* Content */}</main>
      <footer>
        {/* Embed */}
        {/* Footer */}
      </footer>
    </>
  );
}

export default HomePage;
