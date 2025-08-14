import { MenuItemType } from './types';
import { LegalEvent } from '../../types/LegalEvents';

export function headerScrollHandler(darkTextTheme: boolean | null) {
  const elementsOverHeader = document.querySelectorAll('.over-header-js');
  const stickyNavContainer = document.querySelector('.navbar__block.navbar__block_mobile');
  const siteHeaderContainer = document.querySelector('.site-header') as HTMLElement;
  const navContainerOffset = stickyNavContainer
    ? stickyNavContainer.getBoundingClientRect().top - siteHeaderContainer.offsetHeight
    : 0;

  const heightAllElementOverHeader = () => {
    let sumHeight = 0;
    elementsOverHeader.forEach((elem) => {
      sumHeight = sumHeight + (elem as HTMLElement).offsetHeight;
    });
    return sumHeight;
  };

  const headerNews = document.querySelector('.header-news') as HTMLElement,
    headerOffset = headerNews ? headerNews.offsetHeight : 0,
    stickClass = 'site-header_scrolls',
    stickNavClass = 'site-header--stick-nav',
    whiteClass = 'menu-desktop-container-white',
    darkBgWhenScrollClass = 'black-fixed';

  if (siteHeaderContainer) {
    siteHeaderContainer.offsetTop > headerOffset + heightAllElementOverHeader()
      ? siteHeaderContainer.classList.add(stickClass)
      : siteHeaderContainer.classList.remove(stickClass);

    siteHeaderContainer.classList.toggle(stickNavClass, window.scrollY > navContainerOffset);

    document.dispatchEvent(
      new CustomEvent(LegalEvent.ScrollNewMenuEvent, {
        bubbles: true,
        composed: true,
        cancelable: true,
        detail: {
          scroll: window.scrollY > navContainerOffset,
          needDarkBgWhenScroll: siteHeaderContainer.classList.contains(darkBgWhenScrollClass),
        },
      })
    );

    if (darkTextTheme) {
      siteHeaderContainer.classList.add(whiteClass);
    }

    if (siteHeaderContainer.classList.contains(stickClass)) {
      siteHeaderContainer.classList.remove(whiteClass);
    }
  }
}

export const isVisibleMenuItem = (menu: MenuItemType, currentGeo: string, isMobile = false): boolean => {
  if (!menu || !currentGeo) return true;
  return !menu.isHidden && !menu.geoAllowedLocales.includes(currentGeo) && (isMobile || !menu.isHiddenDesktop);
};

export const isMenuItemHidden = (menuItems: MenuItemType[] | MenuItemType, currentGeo: string): boolean => {
  if (!menuItems) return false;
  if (Array.isArray(menuItems)) {
    if (menuItems.length === 0) return false;
    return menuItems.some((section) => section.children.some((menu) => isVisibleMenuItem(menu, currentGeo)));
  } else {
    return menuItems.children.some((section) => section.children.some((menu) => isVisibleMenuItem(menu, currentGeo)));
  }
};

export const siteHeaderToTop = (isOpenMenu: boolean) => {
  const siteHeaderContainer = document.querySelector('.site-header') as HTMLElement;
  const stickClass = 'site-header_scrolls';
  const elementsToHidden = ['.traffic-overflow', '.links-slider'];

  if (isOpenMenu && !siteHeaderContainer.classList.contains(stickClass)) {
    siteHeaderContainer.classList.add('site-header-to-top');
  } else {
    siteHeaderContainer.classList.remove('site-header-to-top');
  }

  elementsToHidden.forEach((selector) => {
    const element = document.querySelector(selector) as HTMLElement;
    if (!element) return;
    if (isOpenMenu) {
      element.style.display = 'none';
    } else {
      element.style.display = 'block';
    }
  });
};
