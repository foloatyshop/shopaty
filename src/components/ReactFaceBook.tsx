"use client"
import { FacebookProvider, CustomChat } from 'react-facebook';

const ReactFaceBook = () => {
  return (
    <FacebookProvider appId="1414092229314524" chatSupport>
        <CustomChat pageId="135661592973990" minimized={true}/>
      </FacebookProvider> 
  )
}

export default ReactFaceBook
