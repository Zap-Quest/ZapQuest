import React,{useState} from "react";
import "../../static/HelpLegend.css"



const HelpLegend = (props) => {
    const closeHelpLegend= props.closeHelpLegend;
    const [isFrame, setIsFrame] = useState(false);
    const handleResize = () => {
        setIsFrame(window.innerWidth < 768);
      };

    React.useEffect(() => {
      
      handleResize();
  
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <>
          <div 
            className={`show map-modal`}
            id="exampleModal" 
            tabIndex="-1" 
            role="dialog" 
            aria-labelledby="exampleModalLabel" 
            aria-hidden="true" 
            data-mdb-backdrop="false" 
            data-mdb-keyboard="true"
          >
            <div 
              className="modal-dialog modal-side modal-dialog-left  modal-dialog-centered" 
              role="document" 
            >
              <div className="modal-content" style={{ marginTop: '-30px' }}>
                <div className="modal-header" style={{background:"#214042"}}>
                    <h5 className="modal-title" id="exampleModalLabel" style={{color:"white"}}>
                        <i className="fa-solid fa-charging-station" style={{ color: "#EABD00" }}/>
                        <span>{` Legend`}</span>
                    </h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={closeHelpLegend}>
                        <span aria-hidden="true" style={{color:"grey"}}>&times;</span>
                    </button>
                </div>
                <div className="modal-body" style={{ height: '400', overflowY: 'auto' }}>
                    <>
                        <div className="card" style={{ width: '100%',fontSize:"0.8rem" }}>
                            <div className="card-body">
                            <p className="card-title d-flex w-100 justify-content-between">
                                <span>
                                    <i className="fa-solid fa-charging-station" style={{ color: "#EABD00" }}/>
                                    <span>{' card title'}</span>
                                </span>
                            </p>
                                <div className="card-text">
                                    hi
                                </div>
                            </div>
                        </div>
                    </>
                </div>
              </div>
            </div>
          </div>
      </>
    );
  };
  
  export default HelpLegend;
