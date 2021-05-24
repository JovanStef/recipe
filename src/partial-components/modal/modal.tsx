import { FC } from "react"
import { IPropsModal } from "../../models/IProps"

export const Modal:FC<IPropsModal> = ({title , body , onOkTxt ,callback }) =>{
return (
<div className="modal" role="dialog">
  <div className="modal-dialog" role="document">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title">{title}</h5>
        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">
        <p>{body}</p>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-primary" onClick={callback}>{onOkTxt}</button>
        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>
)
}