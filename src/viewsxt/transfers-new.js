//main
import ContentFormatXX from "../content/webc/content-format-xx";

import WebbDividerSmall from "../content/webb/webb-divider-sm";
import WebbDividerMedium from "../content/webb/webb-divider-md";

import { UserForm } from "../services/srvc-utilities";

import TransfersNewModule from "../content/transfers/transfers-new";


export default function TransfersNew() {

  return (
  <>
    <ContentFormatXX 
      head='New Transfer'
      link={`/${UserForm()}/home`}
      form= 'small'
      data= {
        <>
          <WebbDividerSmall />
          <TransfersNewModule />

          <WebbDividerMedium/>
          <WebbDividerMedium/>
        </>
      } 
    />
  </>
  )
}