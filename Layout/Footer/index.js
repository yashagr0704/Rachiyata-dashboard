import React from 'react'
import { BsFacebook } from 'react-icons/bs'
import { FaInstagramSquare } from 'react-icons/fa'
import { AiFillTwitterCircle } from 'react-icons/ai'
import { Wrapper, Heading, ImpSection, ImpSectionButton, SocialMediaIconContainer } from './styles'
// import { LogoTitle } from '../Header/HeaderStyle'
// import LogoImage from 'public/logo.svg'
// import Image from 'next/image'
import LogoBox from './components/LogoBox'

const Footer = () => {
  return (
    <>
      <Wrapper>
        <ImpSection>
          <Heading>Discover</Heading>
          <ImpSectionButton>Home</ImpSectionButton>
          <ImpSectionButton>Novels</ImpSectionButton>
          <ImpSectionButton>Authors</ImpSectionButton>
          <ImpSectionButton>Subjects</ImpSectionButton>
          <ImpSectionButton>Collections</ImpSectionButton>
          <ImpSectionButton>Advanced Search</ImpSectionButton>
          <ImpSectionButton>Return to Top</ImpSectionButton>
        </ImpSection>
        <ImpSection>
          <Heading>Resources</Heading>
          <ImpSectionButton>Tags</ImpSectionButton>
          <ImpSectionButton>Download Apps</ImpSectionButton>
          <ImpSectionButton>Be an Author</ImpSectionButton>
          <ImpSectionButton>Help Center</ImpSectionButton>
          <ImpSectionButton>Privacy Policy</ImpSectionButton>
          <ImpSectionButton>Terms of Service</ImpSectionButton>
          <ImpSectionButton>Keywords</ImpSectionButton>
        </ImpSection>
        <ImpSection>
          <Heading>Help</Heading>
          <ImpSectionButton>Help Center</ImpSectionButton>
          <ImpSectionButton>Report a Problem</ImpSectionButton>
          <ImpSectionButton>Suggesting Edits</ImpSectionButton>
        </ImpSection>
        <ImpSection>
          <Heading>Change Website Language</Heading>
          <ImpSectionButton>English</ImpSectionButton>
          <ImpSectionButton>Hindi</ImpSectionButton>
        </ImpSection>
        <ImpSection paddingLeft="20px">
          <Heading>Follow us</Heading>
          <SocialMediaIconContainer>
            <BsFacebook size={35} color="#673CCB" />
            <FaInstagramSquare size={35} color="#673CCB" />
            <AiFillTwitterCircle size={37} color="#673CCB" />
          </SocialMediaIconContainer>
          {/* <LogoSection>
            <Image src={LogoImage} />
            <LogoTitle>E-Read</LogoTitle>
          </LogoSection> */}
          <LogoBox />
        </ImpSection>
      </Wrapper>
    </>
  )
}

export default Footer
