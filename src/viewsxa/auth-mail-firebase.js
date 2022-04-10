import ContentFormatXX from '../content/webc/content-format-xx';

import AuthMailFirebaseModule from '../content/auth/auth-mail-firebase';

export default function AuthMailFirebase() {
  
  return (
    <ContentFormatXX 
      head={'Account Access'}
      link={'/'}
      form={'mini'}
      data={
        <>
          <AuthMailFirebaseModule />
        </>
        
      }  
    /> 
  )
}