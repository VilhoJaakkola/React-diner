import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';
import { useRef } from 'react';

import Backdrop from '../Backdrop/Backdrop';

type ModalOverlayProps = {
  className?: string;
  style?: React.CSSProperties;
  headerClass?: string;
  contentClass?: string;
  footerClass?: string;
  header: string;
  footer: React.ReactNode;
  onSubmit?: (event: React.FormEvent) => void;
  children: React.ReactNode;
};

const ModalOverlay = (props: ModalOverlayProps) => {
  const content = (
    <div
      className={`z-100 fixed top-[22vh] left-[10%] w-[80%] bg-white shadow-[0_2px_8px_rgba(0,0,0,0.26)] rounded-lg md:left-[calc(50%-20rem)] md:w-160 ${props.className ?? ''}`}
      style={props.style}
    >
      <header className={`w-full py-4 px-2 bg-[steelblue] text-white ${props.headerClass ?? ''}`}>
        <h2 className="m-2">{props.header}</h2>
      </header>
      <form onSubmit={props.onSubmit ?? ((e) => e.preventDefault())}>
        <div className={`p-4 ${props.contentClass ?? ''}`}>{props.children}</div>
      </form>
      <footer className={`p-4 ${props.footerClass ?? ''}`}>{props.footer}</footer>
    </div>
  );

  return ReactDOM.createPortal(content, document.getElementById('modal-hook')!);
};

type ModalProps = ModalOverlayProps & {
  show: boolean;
  onCancel?: () => void;
};

const Modal = (props: ModalProps) => {
  const nodeRef = useRef<HTMLDivElement>(null);
  return (
    <>
      {props.show && <Backdrop onClick={props.onCancel} />}
      <CSSTransition
        in={props.show}
        mountOnEnter
        unmountOnExit
        timeout={200}
        classNames="modal"
        nodeRef={nodeRef}
      >
        <ModalOverlay {...props} />
      </CSSTransition>
    </>
  );
};

export default Modal;
