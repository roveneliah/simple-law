import Head from 'next/head'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
      <Head>
        <title>Casual & Colorful Design System</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto px-4 py-12">
        <h1 className="mb-8 text-5xl font-bold text-white">
          Welcome, Small Business Owners!
        </h1>

        <section className="mb-16">
          <h2 className="mb-4 text-3xl font-semibold text-white">Typography</h2>
          <p className="mb-2 text-xl text-white">
            This is a paragraph for our casual and fun design.
          </p>
          <p className="text-lg text-purple-100">
            This is a smaller paragraph for secondary content.
          </p>
        </section>

        <section className="mb-16">
          <h2 className="mb-4 text-3xl font-semibold text-white">Buttons</h2>
          <button className="rounded-full bg-white px-4 py-2 font-bold text-pink-500 shadow-lg transition duration-300 ease-in-out hover:bg-purple-100">
            Click me!
          </button>
        </section>

        <section>
          <h2 className="mb-4 text-3xl font-semibold text-white">
            Card Molecule
          </h2>
          <div className="rounded-2xl bg-white p-6 shadow-xl">
            <h3 className="mb-2 text-2xl font-semibold text-purple-500">
              Fun Card Title
            </h3>
            <p className="mb-4 text-pink-500">
              This is a fun card for our colorful design system. It's perfect
              for small business owners who appreciate casual and engaging
              content.
            </p>
            <button className="rounded-full bg-red-500 px-4 py-2 font-bold text-white transition duration-300 ease-in-out hover:bg-red-600">
              Learn More
            </button>
          </div>
        </section>
      </main>
    </div>
  )
}
