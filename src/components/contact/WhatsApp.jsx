import React from 'react'
import styled, { keyframes } from 'styled-components'
import { FaWhatsapp } from 'react-icons/fa'

// A simple pulse animation for the button
const pulse = keyframes`
  0% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(37, 211, 102, 0.7);
  }
  70% {
    transform: scale(1);
    box-shadow: 0 0 0 15px rgba(37, 211, 102, 0);
  }
  100% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(37, 211, 102, 0);
  }
`

// The main styled component for our floating button
const FloatingButton = styled.a`
  /* Positioning */
  position: fixed;
  bottom: 25px;
  right: 25px;
  z-index: 1003; /* Ensures it's on top of other content */

  /* Appearance */
  width: 60px;
  height: 60px;
  background-color: #25d366; /* WhatsApp Green */
  color: white;
  border-radius: 50%; /* Makes it a circle */
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.2);

  /* Icon Centering */
  display: flex;
  align-items: center;
  justify-content: center;

  /* Animation & Effects */
  text-decoration: none;
  animation: ${pulse} 2s infinite;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: scale(1.1);
    animation: none; /* Stop pulsing on hover for a smoother feel */
  }

  @media (max-width: 768px) {
    width: 50px;
    height: 50px;
    bottom: 6px;
    right: 15px;
  }
`

// Style for the icon itself
const WhatsappIcon = styled(FaWhatsapp)`
  font-size: 36px; /* A good size for the 60px button */
`

/**
 * A reusable floating WhatsApp contact icon component.
 * @param {object} props - The component props.
 * @param {string} props.phoneNumber - The phone number in international format.
 * @param {string} props.message - The default message to pre-fill the chat.
 */
const WhatsApp = ({ phoneNumber, message }) => {
  const encodedMessage = encodeURIComponent(message)
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`

  return (
    <FloatingButton
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      title="Chat with us on WhatsApp" // Important for accessibility!
    >
      <WhatsappIcon />
    </FloatingButton>
  )
}

WhatsApp.defaultProps = {
  message: 'Hello! I saw your website and have a question.',
}

export default WhatsApp
