/* eslint-disable import/prefer-default-export */
import slugify from 'slugify';
import { menuInfos } from '../../data/app/subMenus';
import { subSubMenu } from '../../data/app/subMenus';
import { menuContent } from '../../data/app/menuContent';

const getSlugFromTitle = (title = '') => {
  // we use a regex to transform the title into something that fits the slug norms
  const modifiedTitle = title.replace(/[&]/g, '').replace(/[_]/g, '-');
  const slug = slugify(modifiedTitle, {
      lower: true,
      remove: /[*+~.()'"!:@&]/g,
  });
  return slug;
};

// find the menu that matches the one selected by the user
const getMenuBySlug = (linkMenuSelected) => {
  const menu = menuInfos.find((menuItem) => menuItem.link === getSlugFromTitle(linkMenuSelected));
  return menu;
}

// find the submenu that matches the url slug
export const getSubMenuBySlug = (linkMenuSelected, linkSubMenuSelected) => {
  const menu = getMenuBySlug(linkMenuSelected);
  const subMenuFound = menu.menu.find((menuItem) => {
    return menuItem.link === getSlugFromTitle(linkSubMenuSelected)
  });
  return subMenuFound;
}

export const getSubSubMenu = (subMenu) => {
  if (subMenu.subSubMenu) {
    const found = subSubMenu.find((menu) => menu.id === subMenu.subSubMenu_id);
    return found;    
  }
  else
    return false
};


export const getSubSubMenuPerId = (subSubMenu, subSubMenuId) => {  
  const menuSelected = subSubMenu.menu.find((menu) => menu.id === subSubMenuId);
  return menuSelected;
}

export const getSubSubMenuContent = (subSubMenu, subSubMenuId) => {  
  const menuSelected = subSubMenu.menu.find((menu) => menu.id === subSubMenuId);
  return menuContent.find((content) => content.id === menuSelected.content_id).content;
}