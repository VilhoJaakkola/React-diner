import { useRef } from 'react';
import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';

const SideDrawer = (props: { show: boolean; onClick: () => void; children: React.ReactNode }) => {
  const nodeRef = useRef<HTMLDivElement | null>(null);
  const content = (
    <CSSTransition
      in={props.show}
      timeout={200}
      classNames="slide-in-left"
      mountOnEnter
      unmountOnExit
      nodeRef={nodeRef}
    >
      <aside
        className="fixed left-0 top-0 z-100 h-screen w-[70%] bg-white shadow-[0_2px_8px_rgba(0,0,0,0.26)]"
        onClick={props.onClick}
      >
        {props.children}
      </aside>
    </CSSTransition>
  );
  return ReactDOM.createPortal(content, document.getElementById('drawer-hook')!);
};

export default SideDrawer;
