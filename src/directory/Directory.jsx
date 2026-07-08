import { useState } from 'react';
import explorer from '../assets/folder-data';
import Folder from './Folder';
import useTraverseTree from '../hooks/use-traverse-tree';

function Directory(){
      const [folders, setFolders] = useState(explorer);
      
    
      const { insertNode } = useTraverseTree();
    
      const handleInsertNode = (folderId, item, isFolder) =>{
        const latestTree = insertNode(explorer, folderId, item, isFolder);
        setFolders(latestTree);
      }
      
      return(
        <div>
            <Folder explorer={folders} handleInsertNode = {handleInsertNode}/>
     </div>
      )
}

export default Directory;