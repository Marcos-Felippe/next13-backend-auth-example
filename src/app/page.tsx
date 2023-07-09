import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-gray-900">

      <div className="rounded-2xl relative isolate overflow-hidden bg-white py-16 sm:py-20 ">
        <div className="max-w-7xl px-6 lg:px-8">
          <div className="text-center max-w-2xl lg:mx-0">
              <h2 className="text-4xl font-bold tracking-tight text-gray-800 sm:text-6xl">Work with us</h2>
              <p className="mt-6 text-lg leading-8 text-gray-700">
                Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt amet
                fugiat veniam occaecat fugiat aliqua.
              </p>
              <div className="mt-20 mx-auto max-w-xs px-8">
                <Link href="/login">
                  <button className="mt-10 block w-full rounded-md bg-slate-800 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-slate-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:bg-slate-800">
                    Login
                  </button>
                </Link>
                <p className="mt-3 text-lg leading-8 text-gray-700">OR</p>
                <Link href="/">
                  <button className="mt-3 block w-full rounded-md bg-slate-800 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-slate-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:bg-slate-800">
                    Register
                  </button>
                </Link>
              </div>
              
          </div>
        </div>
      </div>
    </main>
  )
}
