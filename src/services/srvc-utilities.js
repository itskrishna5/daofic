import { useRouteMatch } from "react-router-dom";


export const GetEnvironment = async () => {
  
  let { path } = useRouteMatch();
  console.log (path)
}

export function ActiveLink (){
  let { path } = useRouteMatch();
  if ( path.slice(4).indexOf("/") >-1 ){
    return (path.slice(4).substring(0,path.slice(1).indexOf("/")))
  } else { 
    return (path.slice(4))
  }
}

export function ActiveSiteLink (){
  let { path } = useRouteMatch();
  if ( path.slice(1).indexOf("/") >-1 ){
    return (path.slice(1).substring(0,path.slice(1).indexOf("/")))
  } else { 
    return (path.slice(1))
  }
}

export function UserForm (){
  let { path } = useRouteMatch();
  return path.slice(1).substring(0,2).toLowerCase();
}

export function PageName (){
  let { path } = useRouteMatch();
  return path.slice(1).substring(0,1).toUpperCase() + path.slice(1).substring(1);
}

export function DateDDMMM (item){
  const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  return (new Date(item)).toISOString().substring(8,2)+'-'+ month[parseInt((new Date(item)).toISOString().substring(6,2))]
}

export function TimeHHMM (item){
  return (new Date(item)).toISOString().substring(11,5)
}
