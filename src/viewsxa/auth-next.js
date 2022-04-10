import ContentFormatXX from '../content/webc/content-format-xx';

import AuthNextModule from '../content/auth/auth-next';

export default function AuthNext() {
    return (
      <ContentFormatXX 
      head={'Account Options'}
      link={'/account/sessionx'}
      form={'mini'}
      data={
        <>
          <AuthNextModule />
        </>
        
        }  
      /> 
    )
  }