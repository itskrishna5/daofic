//main
import ContentFormatXC from "../content/webc/content-format-xc";

import WebbDividerSmall from "../content/webb/webb-divider-sm";
import WebbDividerMedium from "../content/webb/webb-divider-md";

import { UserForm } from "../services/srvc-utilities";

import ContactsListModule from "../content/contacts/contacts-list";

export default function Contacts() {

  return (
  <>
    <ContentFormatXC 
      head='Contacts'
      link={`/${UserForm()}/home`}
      form= 'medium'
      data= {
        <>
          <WebbDividerSmall />
          <ContactsListModule />

          <WebbDividerMedium/>
          <WebbDividerMedium/>
        </>
      } 
    />
  </>
  )
}