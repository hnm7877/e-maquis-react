export const SIDEBAR_DATA = [
  {
    img: 'img/paresseux_sous_officiel.png',
    title: 'E-maquis',
    link: '/dashboard',
    subMenu: [
      {
        title: 'bilan',
        link: '/bilan',
        beta: true,
      },
    ],
  },
  {
    img: 'img/menu-icon/icone_employee.png',
    title: 'Employé',
    link: '/utilisateur',
    subMenu: [
      {
        title: 'Liste des employés',
        link: '/utilisateur',
      },
      {
        title: 'ajouter',
        link: '/ajouteruser',
      },
    ],
  },
  {
    img: 'img/menu-icon/icone_ventes.png',
    title: 'Vente',
    link: '/data_table',
    subMenu: [
      {
        title: 'Liste des ventes',
        link: '/data_table',
      },
    ],
  },
  {
    img: 'img/menu-icon/icone_produits.png',
    title: 'Produit',
    link: '/listeproduit',
    subMenu: [
      {
        title: 'voir mes produits',
        link: '/listeproduit',
      },
      {
        title: 'Enregistrer un produit',
        link: '/ajouterproduit',
      },
      {
        title: 'Enregistrer un produit global',
        link: '/ajouter-produit-global',
      },
    ],
  },
  {
    img: 'img/menu-icon/categorie.svg',
    title: 'Catégories',
    link: '/listcategorie',
    subMenu: [
      {
        title: 'Mes catégories',
        link: '/listcategorie',
      },
    ],
  },
  {
    img: 'img/menu-icon/icone_fournisseur.png',
    title: 'Fournisseur',
    link: '/listefournisseur',
    subMenu: [
      {
        title: 'Mes fournisseurs',
        link: '/listefournisseur',
      },
      {
        title: 'Ajouter un fournisseur',
        link: '/ajouterfournisseur',
      },
    ],
  },
];
