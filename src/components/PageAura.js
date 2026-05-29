import React from 'react';
import { FaOm } from 'react-icons/fa';
import { GiLanternFlame, GiLotus } from 'react-icons/gi';

const PageAura = () => (
  <div className="page-aura" aria-hidden="true">
    <div className="page-aura-mark page-aura-om">
      <FaOm />
    </div>
    <div className="page-aura-mark page-aura-lotus">
      <GiLotus />
    </div>
    <div className="page-aura-mark page-aura-lamp">
      <GiLanternFlame />
    </div>
  </div>
);

export default PageAura;
