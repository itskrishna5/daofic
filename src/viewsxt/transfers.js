//main
import ContentFormatXC from "../content/webc/content-format-xc";

import WebbDividerSmall from "../content/webb/webb-divider-sm";
import WebbDividerMedium from "../content/webb/webb-divider-md";

import { UserForm } from "../services/srvc-utilities";

import TransfersListModule from "../content/transfers/transfers-list";


export default function Transfers() {

  return (
  <>
    <ContentFormatXC 
      head='New Transfer'
      link={`/${UserForm()}/home`}
      form= 'medium'
      data= {
        <>
          <WebbDividerSmall />
          <TransfersListModule />

          <WebbDividerMedium/>
          <WebbDividerMedium/>
        </>
      } 
    />
  </>
  )
}