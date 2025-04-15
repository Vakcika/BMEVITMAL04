export default function Page404() {
  return (
    <>
      <title>{import.meta.env.VITE_BRAND + " | 404 | Page Not Found"}</title>
      <link rel="canonical" href={import.meta.env.VITE_URL + "/404"}></link>
      <meta
        name="description"
        content={
          import.meta.env.VITE_BRAND +
          " | 404 | The requested page cannot be found!"
        }
      />
      <section className="grid place-items-center px-6 py-48 lg:px-8">
        <div className="text-center">
          <h1 className="font-semibold text-p300 text-5xl">404</h1>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-n900 sm:text-5xl">
            Page Not Found
          </h2>
          <p className="mt-6 text-base leading-7 text-n600">
            The requested page cannot be found!
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <a
              href={"/"}
              className="transition ease-in-out hover:-translate-y-1.5 hover:shadow-[rgba(95,_95,_255,_0.6)_0px_50px_90px] duration-300 py-3 px-[30px] bg-p300 text-n0 rounded-xl"
            >
              Back to Homepage
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
