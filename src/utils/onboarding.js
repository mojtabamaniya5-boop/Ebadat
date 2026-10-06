export const hasSeenOnboarding = () => {
  return localStorage.getItem('ebadat-onboarding-done') === 'true'
}

export const markOnboardingSeen = () => {
  localStorage.setItem('ebadat-onboarding-done', 'true')
}

export const resetOnboarding = () => {
  localStorage.removeItem('ebadat-onboarding-done')
}

export const openOnboardingAgain = () => {
  resetOnboarding()
  window.location.reload()
}
