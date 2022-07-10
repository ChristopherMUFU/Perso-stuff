import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import HeaderPage from '../HeaderPage';
import SubMenu from '../SubMenu';

import { getSubMenuBySlug } from '../../../utilities/app/menu';
import { getSubSubMenu } from '../../../utilities/app/menu';

import './styles.css';

// This page will display the header and the subMenu for each website page (except for the home page) if they are required.
// Then it will display the specific component : {children} for each page.

const Page = ({ children, menuLink, slug }) => {
  const subMenu = getSubMenuBySlug(menuLink, slug);

   // domLoaded : when the image is Loaded, we can display, the rest of the text
   const [domLoaded, setDomLoaded]= useState(false);

  return (
    <main className="page">
      {subMenu !== undefined && (
        <div className="page__content">
        
          {subMenu.header === true && (
              <HeaderPage menu={subMenu} setDomLoaded={setDomLoaded}/>
          )}

          {domLoaded && (
            <div id="page__informations">
              {subMenu.subSubMenu === true && (
                  <SubMenu menu={getSubSubMenu(subMenu)} />
              )}
              <div className="page__children-container">
                { children }
              </div>
            </div>
          )}

        </div>
      )}      
    </main>
  )
};

Page.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Page;