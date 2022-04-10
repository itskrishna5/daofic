//main
import ContentFormatXC from "../content/webc/content-format-xc";

import WebbDividerSmall from "../content/webb/webb-divider-sm";
import WebbDividerMedium from "../content/webb/webb-divider-md";
import HeaderSectionDark from "../content/webb/head-section-dark";

import { UserForm } from "../services/srvc-utilities";

import UserInfoModule from "../content/home/user-infocard";
import UserTasksModule from "../content/home/user-tasks";


export default function HomeBusiness() {

  return (
  <>
    <ContentFormatXC 
      head='Home'
      link={`/${UserForm()}/home`}
      form= 'small'
      data= {
        <>
          <WebbDividerSmall />
          <UserInfoModule />

          <UserTasksModule />




          
          <WebbDividerMedium />
          <WebbDividerMedium />
          <WebbDividerMedium />
        </>
      } 
    />
  </>
  )
}