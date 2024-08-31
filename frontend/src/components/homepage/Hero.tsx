import Link from "next/link"
import Blob from "./Blob"

export default ()=>{
    return (
        <section className="bg-white dark:bg-gray-900">
        <div
            className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12"
        >
            <div className="mr-auto place-self-center lg:col-span-7">
                <Blob />
                <h1
                    className="z-10 relative max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white"
                >
                </h1>
                <h1
                    className="z-10 relative max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400"
                >
                    Votre allié de confiance pour l'assistance d'urgence à
                    Fianarantsoa. Découvrez nos services et obtenez l'aide dont
                    vous avez besoin, quand vous en avez le plus besoin.
                </h1>
                <Link
                    href="#"
                    className="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-white rounded-lg bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 dark:focus:ring-green-900"
                >
                    Naviguez
                    <svg
                        className="w-5 h-5 ml-2 -mr-1"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fillRule="evenodd"
                            d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                            clipRule="evenodd"
                        ></path>
                    </svg>
                </Link>
                <Link
                    href="#"
                    className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
                >
                    Consultez
                </Link>
            </div>
            <div className="relative lg:mt-0 lg:col-span-5 lg:flex">
            </div>
        </div>
    </section>
    )
}