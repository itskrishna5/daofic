//main
import ContentFormatXX from "../content/webc/content-format-xx";

import WebbDividerSmall from "../content/webb/webb-divider-sm";

import OnboardBusinessNameModule from "../content/onboard/business-name";

export default function OnboardBusiness() {

  return (
  <>
    <ContentFormatXX 
      head='DAO/Business Account'
      link={`/account/next`}
      form= 'small'
      data= {
        <>
          <WebbDividerSmall /> 
          <OnboardBusinessNameModule />
        </>
      } 
    />
  </>
  )
}