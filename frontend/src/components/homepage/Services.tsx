import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFireExtinguisher, faGun, faMountainSun, faPlus, faRoad, faUserDoctor } from "@fortawesome/free-solid-svg-icons"

export default () => {
  const services = [
    {
      id: 1,
      title: "Services médicaux",
      description:
        "Accédez rapidement à une assistance médicale en cas d'accident ou de maladie soudaine.",
      icon: faUserDoctor,
    },
    {
      id: 2,
      title: "Protection Policière",
      description:
        "Obtenez une réponse rapide de la police pour garantir votre sécurité et celle de vos proches.",
      icon: faGun,
    },
    {
      id: 3,
      title: "Intervention d'urgence",
      description:
        "Coordination rapide des services de secours en cas de situation d'urgence majeure.",
      icon: faPlus,
    },
    {
      id: 4,
      title: "Services d'incendie",
      description:
        "Réponse rapide et efficace aux incendies pour protéger les vies et les biens.",
      icon: faFireExtinguisher,
    },
    {
      id: 5,
      title: "Services de secours en montagne",
      description:
        "Intervention rapide pour les secours en montagne, y compris les sauvetages en terrain difficile.",
      icon: faMountainSun,
    },
    {
      id: 6,
      title: "Assistance routière",
      description:
        "Aide en cas de panne ou d'accident de véhicule, y compris le remorquage et les réparations d'urgence.",
      icon: faRoad,
    },
  ];
  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
        <div className="max-w-screen-md mb-8 lg:mb-16">
          <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
            Services d'Urgence à Votre Disposition
          </h2>
          <p className="text-gray-500 sm:text-xl dark:text-gray-400">
            Découvrez les services d'urgence disponibles dans le province de
            Fianarantsoa. Notre cartographie avancée vous guide vers les
            ressources essentielles en cas de besoin urgent, assurant un accès
            rapide et efficace pour tous. Profitez d'une couverture complète et
            d'informations à jour pour une meilleure sécurité et tranquillité
            d'esprit.
          </p>
        </div>
        <div className="space-y-8 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-12 md:space-y-0">
          {services.map((service) => (
            <div key={service.id}>
              <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-green-100 lg:h-12 lg:w-12 dark:bg-green-900">
                <i className="service.icon"></i>
                <FontAwesomeIcon icon={service.icon} className="text-green-600 dark:text-green-300"/>
              </div>
              <h3 className="mb-2 text-xl font-bold dark:text-white">
                {service.title}
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
