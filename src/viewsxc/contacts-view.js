//main
import ContentFormatXX from "../content/webc/content-format-xx";

import WebbDividerSmall from "../content/webb/webb-divider-sm";
import WebbDividerMedium from "../content/webb/webb-divider-md";

import { UserForm } from "../services/srvc-utilities";

import ContactsViewModule from "../content/contacts/contacts-view";


export default function ContactsView() {

  return (
  <>
    <ContentFormatXX 
      head='Network'
      link={`/${UserForm()}/network`}
      form= 'medium'
      data= {
        <>
          <WebbDividerSmall />
          <ContactsViewModule />

          <WebbDividerMedium/>
          <WebbDividerMedium/>
        </>
      } 
    />
  </>
  )
}