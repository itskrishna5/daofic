import ContentFormatXX from '../content/webc/content-format-xx';

import AuthMailCheckFirebaseModule from '../content/auth/auth-mail-check';

export default function AuthMailCheckFirebase() {
  
  return (
    <ContentFormatXX 
      head={'Account Access'}
      link={'/'}
      form={'mini'}
      data={
        <>
          <AuthMailCheckFirebaseModule />
        </>
        
      }  
    /> 
  )
}