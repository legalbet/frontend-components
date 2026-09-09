<template>
  <Transition name="fade">
    <BaseOverlay v-if="isAnyOpen" />
  </Transition>

  <Transition name="slide">
    <component
      :is="activePopupComponent"
      v-if="activePopupComponent"
      :key="popupStore.getActivePopup.value.popupName"
    />
  </Transition>
</template>

<script setup lang="ts">
import { computed defineAsyncComponent } from 'vue';
import { PopupName } from '@fc/popupsContainer/composables/popupStore/types';
import { usePopupStore } from '@fc/popupsContainer/composables/popupStore/usePopupStore';
import BaseOverlay from '@fc/components/baseOverlay/BaseOverlay.vue';

const popupStore = usePopupStore();

const isAnyOpen = computed(() => !!popupStore.getActivePopup.value?.popupName);

const popupComponents: Partial<Record<PopupName, Component>> = {
  [PopupName.Auth]: defineAsyncComponent(() => import('~/features/auth/components/authPopup/AuthPopup.vue')),
  [PopupName.RecoverPassword]: defineAsyncComponent(
    () => import('~/features/auth/components/recoveryPasswordPopup/RecoveryPasswordPopup.vue')
  ),
  [PopupName.SocialRegister]: defineAsyncComponent(
    () => import('~/features/auth/components/socialAuth/SocialRegisterPopup.vue')
  ),
  [PopupName.SuccessRegistration]: defineAsyncComponent(
    () => import('~/features/auth/components/successRegistration/successRegistrationPopup.vue')
  ),
  [PopupName.CookiesPopupWithChoice]: defineAsyncComponent(
    () => import('@fc/types/external-types/components/cookiesPopupWithChoice/CookiesPopupWithChoice.vue')
  ),
  [PopupName.NotPartners]: defineAsyncComponent(
    () => import('@fc/types/external-types/components/notPartnerPopup/NotPartnerPopup.vue')
  ),
  [PopupName.BookNotSupportedByGeoPopup]: defineAsyncComponent(
    () => import('@fc/types/external-types/components/BookNotSupportedByGeoPopup/BookNotSupportedByGeoPopup.vue')
  ),
  [PopupName.BonusCardPopup]: defineAsyncComponent(
    () => import('@fc/types/external-typescommonComponents/bonusCard/BonusModal.vue')
  ),
  [PopupName.ResettingPasswordPopup]: defineAsyncComponent(
    () => import('~/features/auth/components/recoveryPasswordPopup/ResettingPassword.vue')
  ),
  [PopupName.FilterPopup]: defineAsyncComponent(() => import('@fc/filter/components/FilterPopup.vue')),
  [PopupName.LockedDayPopup]: defineAsyncComponent(
    () => import('@fc/types/external-typescomponents/popups/LockedDayPopup.vue')
  ),
  [PopupName.ActivityInfoPopup]: defineAsyncComponent(
    () => import('@fc/types/external-typescomponents/popups/ActivityInfoPopup.vue')
  ),
  [PopupName.OnboardingPopup]: defineAsyncComponent(
    () => import('@fc/types/external-typescomponents/popups/OnboardingPopup.vue')
  ),
  [PopupName.LegalConsentPopup]: defineAsyncComponent(
    () => import('@fc/types/external-typescomponents/popups/LegalConsentPopup.vue')
  ),
  [PopupName.GameOverPopup]: defineAsyncComponent(
    () => import('@fc/types/external-typescomponents/popups/GameOverPopup.vue')
  ),
  [PopupName.BonusGamePopup]: defineAsyncComponent(
    () => import('@fc/types/external-typescomponents/popups/BonusPopup.vue')
  ),
  [PopupName.SocialMediaSharePopup]: defineAsyncComponent(
    () => import('@fc/types/external-typescomponents/popups/SocialMediaSharePopup.vue')
  ),
  [PopupName.SecretCollectablePopup]: defineAsyncComponent(
    () => import('@fc/types/external-typescomponents/popups/SecretCollectablePopup.vue')
  ),
  [PopupName.PauseGamePopup]: defineAsyncComponent(
    () => import('@fc/types/external-typescomponents/popups/PauseGamePopup.vue')
  ),
  [PopupName.PartnersActivityPopup]: defineAsyncComponent(
    () => import('@fc/types/external-typescomponents/popups/PartnersActivityPopup.vue')
  ),
  [PopupName.InvitePopup]: defineAsyncComponent(
    () => import('@fc/types/external-typescomponents/popups/InvitePopup.vue')
  ),
  [PopupName.BestBonusBtn]: defineAsyncComponent(
    () => import('@fc/types/external-typescommonComponents/BestBonusModal.vue')
  ),
  [PopupName.CommentGallery]: defineAsyncComponent(
    () => import('~/features/comment/components/CommentGalleryPopup.vue')
  ),
  [PopupName.CommentBanForm]: defineAsyncComponent(() => import('~/features/comment/components/CommentBanForm.vue')),
  [PopupName.CommentToComplaint]: defineAsyncComponent(
    () => import('~/features/comment/components/CommentToComplaint.vue')
  ),
  [PopupName.CommentToFeedback]: defineAsyncComponent(
    () => import('~/features/comment/components/CommentFeedbackForm.vue')
  ),
  [PopupName.AgeConfirmModal]: defineAsyncComponent(
    () => import('~/features/termsAndCondition/components/AgeConfirmModal.vue')
  ),
};

const activePopupComponent = computed(() => {
  const active = popupStore.getActivePopup.value?.popupName;
  return active ? popupComponents[active] : null;
});
</script>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  opacity: 1;
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-enter-active,
.slide-leave-active {
  @media (max-width: 743px) {
    transform: translateY(0);
    transition: all 0.3s ease;
  }
}

.slide-enter-from,
.slide-leave-to {
  @media (max-width: 743px) {
    transform: translateY(100%);
  }
}
</style>
