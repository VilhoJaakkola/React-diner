const MainHeader = (props: { children: React.ReactNode }) => {
  return (
    <header className="w-full h-16 flex items-center fixed top-0 left-0 bg-[olivedrab] shadow-[0_2px_6px_rgba(0,0,0,0.26)] px-4 z-5 md:justify-between">
      {props.children}
    </header>
  );
};

export default MainHeader;
