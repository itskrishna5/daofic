import ContentFormatXX from '../content/webc/content-format-xx';

import AuthSessionXModule from '../content/auth/auth-session-x';

export default function AuthSessionX() {

  return (
    <ContentFormatXX 
    head={''}
    link={'/'}
    form={'mini'}
    data={
      <>
        <AuthSessionXModule />
      </>
      
      }  
    /> 
  )
}