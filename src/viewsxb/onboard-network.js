//main
import ContentFormatXX from "../content/webc/content-format-xx";

import WebbDividerSmall from "../content/webb/webb-divider-sm";

import OnboardUserNetworkModule from "../content/onboard/user-network";

export default function OnboardNetwork() {

  return (
  <>
    <ContentFormatXX 
      head='New Account'
      link={`/account/next`}
      form= 'small'
      data= {
        <>
          <WebbDividerSmall /> 
          <OnboardUserNetworkModule />
        </>
      } 
    />
  </>
  )
}