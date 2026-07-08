import React, {useState, forwardRef, useImperativeHandle} from "react";



const Details = forwardRef((props,ref)=>{
    const [isOpen, setIsOpen] = useState(false);

    
        
     
    useImperativeHandle(ref, ()=>({
        closeModal() {
            setIsOpen(false);
        },
        showModal(){
            setIsOpen(true);
        }
        
    }));
    
    if(!isOpen) return null;
    

    return (<div className="modal" id='myModal'>
            <div className="modal-content">
                <div className="modal-header">
                    <h4>{props.title}</h4>
                    <img src={props.thumbnail} width="200px" height="200px"/>
                    <span onClick={()=>setIsOpen(false)} id='closeBtn'>close</span>
                </div>
                <div>
                    content
                </div>
            </div>
    </div>)
});

export default Details;