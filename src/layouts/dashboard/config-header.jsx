import SvgColor from '../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const headerConfig = [
  {
    title: 'shop',
    path: '/',
    icon: icon('ic_analytics'),
  },

  {
    title: 'product',
    path: '/product',
    icon: icon('ic_flower'),
    iconRight: icon('ic_arrdown'),
    children: [
      {
        title: 'fresh flower',
        path: '/product',
        icon: icon('ic_flower'),
      },
      {
        title: 'dried flower',
        path: '/',
        icon: icon('ic_flower'),
      },
      {
        title: 'handmade flower',
        path: '/product',
        icon: icon('ic_flower'),
      },
    ],
  },
  {
    title: 'event',
    path: '/product',
    icon: icon('ic_flower'),
  },
  {
    title: 'blog',
    path: '/product',
    icon: icon('ic_flower'),
  },
];

export default headerConfig;
