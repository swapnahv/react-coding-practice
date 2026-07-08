import React, {useState} from "react";

function Folder({handleInsertNode = () =>{}, explorer}){
    const [expand, setExpand] = useState(false);
    const [showInput, setShowInput] = useState({
        visible: false,
        isFolder: false
    });

    const handleNewFolder = (e, isFolder) =>{
        e.stopPropagation();
        setExpand(true);
        setShowInput({visible:true, isFolder});
    }

    const addNewItem = (e, id) => {
        console.log(e, id);
        if(e.keyCode === 13 && e.target.value){
            alert('id');
            handleInsertNode(id, e.target.value, showInput.isFolder);
            setShowInput({visible:false, isFolder:false});
        }
        
    }
    
    if(explorer.isFolder){
        return(<div >
            <div onClick={()=>{setExpand(!expand)}} style={{width:'500px'}}>
                <span style={{width:'50%', float:'left'}}>📁{explorer.name}</span>
                <div style={{width:'50%', float:'right'}}>
                    <button onClick={(e)=>{handleNewFolder(e, true)}}>Add Folder</button>
                    <button onClick={(e)=>{handleNewFolder(e, false)}}>Add file</button>
                </div>
            </div>
            <div style={{display : expand ? 'block': 'none'}}>
                
                {showInput.visible && (<span>
                    {showInput.isFolder ? '📁' : '📄'}<input onKeyDown={(e)=>{addNewItem(e, explorer.id)}} onBlur={()=>{setShowInput({...showInput, visible:false})}} type='text' autoFocus />
                    </span>)}
                
                {explorer?.items?.length>0 && explorer.items.map((exp)=>{
                    return (<Folder handleInsertNode = {handleInsertNode} explorer={exp} key={exp.id}/>);
                })}
            </div>
        </div>);
    }else{
        return <div>📄 {explorer.name}</div>
    }

}

export default Folder;