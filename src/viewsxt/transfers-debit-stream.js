//main
import ContentFormatXX from "../content/webc/content-format-xx";

import WebbDividerSmall from "../content/webb/webb-divider-sm";
import WebbDividerMedium from "../content/webb/webb-divider-md";

import { UserForm } from "../services/srvc-utilities";

import TransfersCreateStreamModule from "../content/transfers/transfers-create-stream";


export default function TransfersDebitStream() {

  return (
  <>
    <ContentFormatXX 
      head='New Transfer'
      link={`/${UserForm()}/transfers/new`}
      form= 'small'
      data= {
        <>
          <WebbDividerSmall />
          <TransfersCreateStreamModule />

          <WebbDividerMedium/>
          <WebbDividerMedium/>
        </>
      } 
    />
  </>
  )
}