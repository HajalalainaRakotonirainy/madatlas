export default () => {
  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="gap-16 items-center py-8 px-4 mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 lg:py-16 lg:px-6">
        <div className="font-light text-gray-500 sm:text-lg dark:text-gray-400">
          <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
            A propos
          </h2>
          <p className="mb-4">
            Ce projet, réalisé en partenariat avec Madatlas, vise à améliorer
            l'accès aux services d'urgence pour les populations vulnérables et à
            soutenir le développement urbain durable. En utilisant des solutions
            de cartographie avancées, ce projet identifie et comble les lacunes
            dans la couverture des services d'urgence, assurant ainsi une
            meilleure sécurité et qualité de vie.
          </p>
          <p>
            Rejoignez-nous dans cette mission pour un avenir plus sûr et
            équitable.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-8">
          <img
            className="w-full rounded-lg"
            src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/content/office-long-2.png"
            alt="office content 1"
          />
          <img
            className="mt-4 w-full lg:mt-10 rounded-lg"
            src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/content/office-long-1.png"
            alt="office content 2"
          />
        </div>
      </div>
    </section>
  );
};
