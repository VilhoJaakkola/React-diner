import ReactDOM from 'react-dom';

const Backdrop = (props: { onClick?: () => void }) => {
  return ReactDOM.createPortal(
    <div
      className="fixed top-0 left-0 w-full h-screen bg-[rgba(0,0,0,0.75)] z-10"
      onClick={props.onClick}
    />,
    document.getElementById('backdrop-hook')!,
  );
};

export default Backdrop;
