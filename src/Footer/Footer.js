import React from 'react'
import { Footer } from 'flowbite-react';


export default function FooterSection() {
  return (

    <Footer container>
    <Footer.Copyright
      by="Neologify"
      href="#"
      year={2022}
    />
    <Footer.LinkGroup>
      <Footer.Link href="#">
        About
      </Footer.Link>
      <Footer.Link href="#">
        Privacy Policy
      </Footer.Link>
      <Footer.Link href="#">
        Licensing
      </Footer.Link>
      <Footer.Link href="#">
        Contact
      </Footer.Link>
    </Footer.LinkGroup>
  </Footer>
  )
}
