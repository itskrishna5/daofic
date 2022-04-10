//main
import ContentFormatXC from "../content/webc/content-format-xc";

import WebbDividerSmall from "../content/webb/webb-divider-sm";
import WebbDividerMedium from "../content/webb/webb-divider-md";
import HeaderSectionDark from "../content/webb/head-section-dark";

import UserInfoModule from "../content/home/user-infocard";
import UserTasksModule from "../content/home/user-tasks";


import { UserForm } from "../services/srvc-utilities";

export default function HomeUser() {

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

          <WebbDividerSmall />
          <UserTasksModule />


        </>
      } 
    />
  </>
  )
}