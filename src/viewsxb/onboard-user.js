//main
import ContentFormatXX from "../content/webc/content-format-xx";

import WebbDividerSmall from "../content/webb/webb-divider-sm";

import OnboardUserNameModule from "../content/onboard/user-name";

export default function OnboardUser() {

  return (
  <>
    <ContentFormatXX 
      head='User Account'
      link={`/account/next`}
      form= 'small'
      data= {
        <>
          <WebbDividerSmall /> 
          <OnboardUserNameModule />
        </>
      } 
    />
  </>
  )
}