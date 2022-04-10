import ContentFormatXX from '../content/webc/content-format-xx';

import AuthMobileFirebaseModule from '../content/auth/auth-mobile-firebase';

export default function AuthMobileFirebase() {
  
  return (
    <ContentFormatXX 
      head={'Account Access'}
      link={'/'}
      form={'mini'}
      data={
        <>
          <AuthMobileFirebaseModule />
        </>
        
      }  
    /> 
  )
}