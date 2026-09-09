import { defineAsyncComponent } from 'vue';
import BaseButton from './components/baseButton/BaseButton.vue';
import BaseCheckbox from './components/baseCheckbox/BaseCheckbox.vue';
import BaseInput from './components/baseInput/BaseInput.vue';
import BaseTextarea from './components/baseTextarea/BaseTextarea.vue';
import { ValidationRules } from './formValidation/types';
import { useFormWithValidation } from './formValidation/useFormWithValidation';
import { usePopupStore } from './popupsContainer/composables/popupStore/usePopupStore';
import { ButtonColor, ButtonVariant, ButtonShape, ButtonTag } from './components/baseButton/types';
import { Color, Size, LinkColor, Variant } from './components/types/BaseElementsType';
import BaseLink from './components/BaseLink.vue';
import BaseIcon from './components/baseIcon/BaseIcon.vue';
import BaseArrow from './components/slider/BaseArrow.vue';
import BaseBullets from './components/slider/BaseBullets.vue';
import { IconNames } from './components/baseIcon/iconNames';
import type { IconParams } from './components/baseIcon/types';
import BaseDropdown from './components/dropdown/BaseDropdown.vue';
import BaseDropdownItem from './components/dropdown/BaseDropdownItem.vue';
import { InputType, InputSizeType } from './components/baseInput/types';
import { ScreenSize } from './ScreenSize';
import BasePopup from './components/basePopup/BasePopup.vue';
import BaseNote from './components/baseNote/BaseNote.vue';
import { NoteStyle, NoteType } from './components/baseNote/NoteTypes';
import type { TabItem, TabButtonItem } from './components/tabs/types';
import { TabsVariant, TabsTheme } from './components/tabs/types';
import type { ValidationRule, FieldConfig } from './formValidation/types';
import { useClickOutside } from './useClickOutside';
import { usePerfectScrollbar } from './usePerfectScrollbar';
import { useTheme } from './useTheme';
import BaseSkeleton from './components/baseSkeleton/BaseSkeleton.vue';
import BaseBreadcrumbs from './components/baseBreadcrumbs/BaseBreadcrumbs.vue';
import BasePagination from './components/basePagination/BasePagination.vue';
import BaseMoreButton from './components/BaseMoreButton/BaseMoreButton.vue';
import BaseIndicator from './components/BaseIndicator.vue';
import { useBaseFileInput } from './components/baseFileInput/composables/useBaseFileInput';
import { usePageWithFilter } from './filter/composables/usePageWithFilter';
import FilterMain from './filter/components/FilterMain.vue';
import BaseTooltip from './components/baseTooltip/baseTooltip.vue';
import TabsButtons from './components/tabs/tabsButtons/TabsButtons.vue';
import TabButton from './components/tabs/tabsButtons/TabButton.vue';
import TabFilter from './components/tabs/tabsButtons/TabFilter.vue';
import BaseSwiper from './components/BaseSwiper/BaseSwiper.vue';
import BaseOverlay from './components/baseOverlay/BaseOverlay.vue';
import BaseLoader from './components/basePreloader/BaseLoader.vue';
import { ContentEmpty, ContentEmptyType } from './components/baseContentEmpty';
import BaseBadgeRating from './components/BaseBadge/BaseBadgeRating.vue';
import BaseBadge from './components/BaseBadge/BaseBadge.vue';
import BasePopover from './components/basePopover/BasePopover.vue';
import { AllColors } from './components/BaseBadge/types';
import DefaultPopover from './components/basePopover/DefaultPopover.vue';
import type {
  FilterDataResponse,
  FilterProps,
  NewFilterSectionType,
  FilterGroupResponse,
  SelectedFilters,
} from './filter/types';
import {
  PopupName,
  type PopupParams,
  type SocialRegisterParams,
} from './popupsContainer/composables/popupStore/types';
import BaseTabs from './components/tabs/baseTabs/BaseTabs.vue';
import BaseCounter from './components/counter/BaseCounter.vue';
import { buildEncodedQueryFromRouteQuery, selectedFiltersToQuery } from './filter/utils';
import SortSelector from './sorting/SortSelector.vue';
import { useSorting } from './sorting/useSorting';
import type { SortOption } from './sorting/types';
import Crypto from './encryption/Crypto';
import BaseRadio from './components/baseRadio/BaseRadio.vue';
import BaseSwitcher from './components/baseSwitcher/BaseSwitcher.vue';
import BaseContentEmpty from './components/baseContentEmpty/ContentEmpty.vue';
import SmoothHeightTransition from './components/smoothTransition/SmoothHeightTransition.vue';
import GlobalLoader from './components/GlobalLoader.vue';
import StickyElementsContainer from './stickyElementsContainer/components/StickyElementsContainer.vue';
import { useIsMobile } from './composables/useIsMobile';
import Menu from './components/menu/index.vue';
import RouletteApp from './components/Roulette/RouletteApp.vue';
import { useRouletteActions } from './components/Roulette/Composables/useRouletteActions';
import type { Prize } from './components/Roulette/types';
const BaseEmojiPicker = defineAsyncComponent(
  () => import('./components/baseImojiPicker/BaseEmojiPicker.vue')
);

export type {
  TabItem,
  TabButtonItem,
  IconParams,
  ValidationRule,
  PopupParams,
  SocialRegisterParams,
  FieldConfig,
  FilterDataResponse,
  FilterProps,
  NewFilterSectionType,
  FilterGroupResponse,
  SelectedFilters,
  SortOption,
  Prize,
};

export {
  //composables
  useBaseFileInput,
  useFormWithValidation,
  useClickOutside,
  usePerfectScrollbar,
  useTheme,
  usePopupStore,
  usePageWithFilter,
  useSorting,
  useIsMobile,
  useRouletteActions,
  buildEncodedQueryFromRouteQuery,
  selectedFiltersToQuery,
  //components
  BaseSkeleton,
  ContentEmpty,
  BaseNote,
  ButtonTag,
  BaseTabs,
  BaseButton,
  BaseCheckbox,
  BaseInput,
  BaseTextarea,
  BaseIcon,
  BaseDropdown,
  BaseDropdownItem,
  BaseLink,
  BaseBullets,
  BaseArrow,
  BasePopup,
  BaseBreadcrumbs,
  BaseEmojiPicker,
  BasePagination,
  BaseMoreButton,
  BaseTooltip,
  BaseIndicator,
  FilterMain,
  TabsButtons,
  TabButton,
  TabFilter,
  BaseSwiper,
  BaseOverlay,
  BaseLoader,
  BaseCounter,
  SortSelector,
  Crypto,
  BaseBadge,
  BaseBadgeRating,
  BasePopover,
  DefaultPopover,
  BaseRadio,
  BaseSwitcher,
  BaseContentEmpty,
  SmoothHeightTransition,
  GlobalLoader,
  StickyElementsContainer,
  Menu,
  RouletteApp,
  //types
  ValidationRules,
  ContentEmptyType,
  ButtonVariant,
  InputType,
  InputSizeType,
  Size,
  LinkColor,
  PopupName,
  TabsVariant,
  TabsTheme,
  ButtonColor,
  Color,
  Variant,
  IconNames,
  NoteStyle,
  NoteType,
  ScreenSize,
  ButtonShape,
  AllColors,
};
