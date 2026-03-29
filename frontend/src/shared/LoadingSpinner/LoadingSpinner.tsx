const LoadingSpinner = (props: { asOverlay?: boolean }) => {
  return (
    <div
      className={
        props.asOverlay
          ? 'h-full w-full absolute top-0 left-0 bg-[rgba(255,255,255,0.9)] flex justify-center items-center'
          : ''
      }
    >
      <div
        className="inline-block w-16 h-16 after:content-[' '] after:block after:w-11.5 after:h-11.5 after:m-px after:rounded-full after:border-[5px] after:border-[#510077] after:border-t-transparent after:border-b-transparent after:animate-[lds-dual-ring_1.2s_linear_infinite]"
        data-testid="loading-spinner"
      />
    </div>
  );
};

export default LoadingSpinner;
