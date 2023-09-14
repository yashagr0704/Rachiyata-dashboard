import React from 'react'

import { BodyContainer, MainContainer, RootContainer } from '../common/styles'

import BannerSection from '../Section/BannerSection'
import InfoSection from '../Section/InfoSection'
import ProfileTabs from '../Section/ProfileTabs'

const UserProfilePage = () => {
  return (
    <RootContainer>
      <MainContainer>
        <BannerSection />
        <BodyContainer>
          <InfoSection />
          <ProfileTabs />
        </BodyContainer>
      </MainContainer>
    </RootContainer>
  )
}

export default UserProfilePage
