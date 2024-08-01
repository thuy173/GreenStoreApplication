import { Helmet } from 'react-helmet-async';

import ComboDetail from 'src/sections/combo/view/combo-detail';

// ----------------------------------------------------------------------

const ComboDetailPage = () => (
  <>
    <Helmet>
      <title> Combo detail </title>
    </Helmet>

    <ComboDetail />
  </>
);

export default ComboDetailPage;
