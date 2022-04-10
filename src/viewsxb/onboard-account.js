//main
import ContentFormatXX from "../content/webc/content-format-xx";

import WebbDividerSmall from "../content/webb/webb-divider-sm";

import OnboardUserAccountModule from "../content/onboard/user-account";

export default function OnboardAccount() {

  return (
  <>
    <ContentFormatXX 
      head='New Account'
      link={`/account/next`}
      form= 'small'
      data= {
        <>
          <WebbDividerSmall /> 
          <OnboardUserAccountModule />
        </>
      } 
    />
  </>
  )
}